import template from './app-header.html';
import styles from './app-header.scss';

export default {
  template,
  transclude: true,
  controller
};

controller.$inject = ['userService', '$state', '$scope'];

function controller(userService, $state, $scope) {
  this.styles = styles;
  this.logout = () => {
    if (this.orgName) {
      this.orgName = null;
    }
    if (this.orgImg) {
      this.orgImg = null;
    }
    userService.logout();
    $state.go('welcome');
  };
  this.isAuthenticated = () => userService.isAuthenticated();
  this.isAdmin = () => userService.isAdmin();
}