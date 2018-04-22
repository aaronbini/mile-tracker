import template from './signin.html';

export default {
  template,
  bindings: {
    success: '<',
    cancel: '<',
    passwordResetRequestSuccess: '<'
  },
  controller
};

controller.$inject = ['userService'];
function controller(userService) {
  this.credentials = {
    email: '',
    password: ''
  };
  this.passwordRequestSuccess = false;

  this.authenticate = () => {
    return userService.signin(this.credentials)
      .then(() => {
        this.error = null;
        this.success();
        return true;
      })
      .catch(err => {
        this.error = err.error || 'Error Signing In.';
      });
  };

  this.requestPasswordReset = () => {
    userService.requestPasswordReset({ email: this.credentials.email })
      .then(() => {
        this.error = null;
        this.passwordRequestSuccess = true;
        this.showDialogOptions = false;
        setTimeout(() => this.passwordResetRequestSuccess(), 7000);
      })
      .catch(() => this.error = 'Error with the request. Be sure you have entered the correct email above.');
  };
};