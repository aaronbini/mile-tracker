export default {
  template: `
      <md-nav-item ng-if="$ctrl.isAdmin()" md-nav-sref="admin" name="new-reading">Admin</md-nav-item>
  `
};