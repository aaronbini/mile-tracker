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
    email: '',
    password: '',
    token: ''
  };

  this.authenticate = () => {
    return userService.signup(this.credentials)
      .then(() => {
        this.error = null;
        this.success();
        return true;
      })
      .catch(err => {
        this.error = err.error || 'Error Signing Up.';
      });
  };
};