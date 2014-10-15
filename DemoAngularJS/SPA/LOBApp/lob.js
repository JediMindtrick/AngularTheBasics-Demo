angular.module('LOBApp', ['ui.router', 'ngMockE2E', 'InMemoryDb', 'Orders', 'OrderDetail', 'NavbarProfile', 'Profile'])

.controller('LOBCtrl', ['$scope','identity', function ($scope,identity) {
    $scope.moduleName = 'LOBCtrl';
    $scope.profile = identity.getProfile();
}])
        
.controller('HomeCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.moduleName = 'HomeCtrl';
}])

;