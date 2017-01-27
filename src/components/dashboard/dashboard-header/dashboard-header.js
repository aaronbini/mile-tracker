import template from './dashboard-header.html';

export default {
  template,
  require: {
    parent: '^appHeader'
  },
  controller
};

controller.$inject = ['$window', 'userService'];
function controller ($window, userService) {
  this.$onInit = () => {
    this.logout = this.parent.logout;
    this.isAuthenticated = userService.isAuthenticated();
    userService.isAdmin()
      .then(isAdmin => this.isAdmin = isAdmin);
  };

  //hacky solution to md-nav-sref errors for tab navigation
  this.navClick = (location) => {
    $window.location.href = `#!/${location}`;
  };
}
