import angular from 'angular';

auth.$inject = ['$rootScope', 'userService', '$mdDialog', '$state'];

export default function auth($rootScope, userService, $mdDialog, $state) {

  $rootScope.$on('$stateChangeStart', (event, toState, toParams) => {

    if (!toState.data.public) {
      if (!userService.isAuthenticated()) {
        event.preventDefault();
        $mdDialog.show({
          parent: angular.element(document.body),
          template: '<user-auth success="success" cancel="cancel" password-reset-request-success="passwordResetRequestSuccess"></user-auth>',
          controller: ['$scope', function($scope) {
            $scope.success = function(){
              $mdDialog.hide();
              console.log('toState: ', toState)
              return $state.go(toState.name, toParams);
            };
            $scope.passwordResetRequestSuccess = () => {
              $mdDialog.hide();
              return $state.go('welcome');
            };

            $scope.cancel = () => {
              $mdDialog.hide();
            };
          }],
          clickOutsideToClose: true,
          escapeToClose: true
        });
      }
    }
  });
  
};