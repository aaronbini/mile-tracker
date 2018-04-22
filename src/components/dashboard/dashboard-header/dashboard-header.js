import template from './dashboard-header.html';

export default {
  template,
  bindings: {
    user: '<'
  },
  require: {
    parent: '^appHeader'
  },
  controller
};

controller.$inject = ['$window', 'userService'];
function controller ($window, userService) {
  this.$onInit = () => {
    this.logout = this.parent.logout;
    //set img path for header
    this.parent.orgName = this.user.organization.name;
    this.parent.orgImg = this.user.organization.img;
    this.isAuthenticated = userService.isAuthenticated();
    userService.isAdmin()
      .then(isAdmin => this.isAdmin = isAdmin);
  };

  //hacky solution to md-nav-sref errors for tab navigation
  this.navClick = (location) => {
    $window.location.href = `#!/${location}`;
  };
}
