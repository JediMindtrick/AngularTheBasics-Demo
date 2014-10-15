angular.module('NavbarProfile',['Profile'])

.controller('ProfileCtrl', ['$location','$scope','$log', 'identity', function ($location,$scope,$log,identity) {
    $scope.logout = function () {
        $log.log('logging out');
        identity.logout();

        $location.path('/home');
    };
    $scope.login = function () {
        $log.log('logging in');
        identity.login($scope.$parent.profile.whoami);
    };
}])

;