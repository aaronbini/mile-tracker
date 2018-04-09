export default {
  template: `
  <div ng-if="$ctrl.showDialogOptions">
    <label>
      <input type="radio" ng-model="$ctrl.action" value="signin">
      Sign In
    </label>
    <label>
      <input type="radio" ng-model="$ctrl.action" value="signup">
      Sign Up
    </label>
  </div>
  <signin display="min-width: 500px;" ng-if="$ctrl.action==='signin'" success="$ctrl.success" cancel="$ctrl.cancel" password-reset-request-success="$ctrl.passwordResetRequestSuccess" show-dialog-options="showDialogOptions"></signin>
  <signup ng-if="$ctrl.action==='signup'" success="$ctrl.success" cancel="$ctrl.cancel"></signup>
  `,
  bindings: { 
    success: '<',
    cancel: '<',
    passwordResetRequestSuccess: '<'
  },
  controller
};

function controller() {
  this.action = 'signin';
  this.showDialogOptions = false;
  console.log('user auth this: ', this);
}