import template from './signin.html';

export default {
  template,
  bindings: {
    success: '<',
    cancel: '<'
  },
  controller
};

controller.$inject = ['userService'];
function controller(userService) {
  this.credentials = {
    email: '',
    password: '',
    token: ''
  };

  this.authenticate = () => {
    return userService.signin(this.credentials)
      .then(() => {
        this.error = null;
        this.success();
        return true;
      })
      .catch(err => {
        this.error = err || {message: 'Error Signing In.'};
        this.cancel();
        return false;
      });
  };
};