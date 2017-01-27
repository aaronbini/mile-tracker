import template from './app-header.html';
import styles from './app-header.scss';

export default {
  template,
  transclude: true,
  controller
};

controller.$inject = ['userService', '$state'];

function controller(userService, $state) {
  this.styles = styles;
  this.logout = () => {
    //could remove airports here, but might prefer to leave it since
    //this get request is extremely slow
    // $window.localStorage.removeItem('airports');
    userService.logout();
    $state.go('welcome');
  };
  this.isAuthenticated = () => userService.isAuthenticated();
  this.isAdmin = () => userService.isAdmin();
}