angular.module('Playgame', ['GameMechanic', 'Data','Identity'])

.controller('PlaygameCtrl', ['$scope', '$log', 'data', 'mechanics','identity', function ($scope, $log, data, mechanics, identity) {       
    $scope.moduleName = 'Playgame';
    $scope.game = null;

    $scope.startGame = function () {
        if ($scope.profile.loggedIn) {
            var newGame = mechanics.getNewGame($scope.profile.whoami);

            data.registerNewGame(newGame)
            .then(function (newGame) {
                $scope.game = newGame;
                $scope.game.whoami = $scope.profile.whoami;//tricky little shuffle

                data.watchGame($scope.game, $scope);
            })
            .catch(function () {
                alert('failed to register new game.  please try again');
            });            
        }
    };
            
    $scope.selectCell = function (row, idx) {
        var curr = row[idx];

        if (mechanics.myTurn($scope.game) && curr === '?') {
            row[idx] = mechanics.getSigil($scope.game);
            mechanics.endTurn($scope.game);
            data.updateGame($scope.game);
        }
        
    };
}])

;