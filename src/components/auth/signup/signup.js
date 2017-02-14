import template from './signup.html';

export default {
  template,
  bindings: {
    success: '<',
    cancel: '<'
  },
  controller
};

controller.$inject = ['userService'];
function controller (userService) {
  this.credentials = {
    token: '',
    email: '',
    password: ''
  };

  this.authenticate = () => {
    return userService.signup(this.credentials)
      .then(() => {
        this.error = null;
        this.success();
        return true;
      })
      .catch(err => {
        this.error = err || {message: 'Error Signing Up.'};
        this.cancel();
        return false;
      });
  };
};