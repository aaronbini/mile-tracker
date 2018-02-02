import template from './reset.html';

export default {
  template,
  bindings: {
    validRequest: '<',
  },
  controller
};

controller.$inject = ['$state', 'userService'];
function controller ($state, userService) {
  this.reset = {
    email: '',
    newPass: ''
  };
  this.$onInit = () => {
    if (this.validRequest.success) {
      this.canReset = true;
    }
  }

  this.resetPassword = () => {
    userService.resetPassword(this.reset)
      .then(() => {
        $state.go('dashboard');
      })
      .catch(err => console.log(err));
  };
}