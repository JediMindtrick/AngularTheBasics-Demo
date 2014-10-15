angular.module('Leaderboard', [])

.controller('LeaderboardCtrl', ['$scope', '$http', '$log', function ($scope, $http, $log) {
    $log.log('hello leaderboard!');
    $scope.moduleName = 'LeaderboardCtrl';
}])

;