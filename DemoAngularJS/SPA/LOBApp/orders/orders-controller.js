angular.module('Orders', [])

.controller('OrdersCtrl', ['$scope', '$log', '$http', function ($scope, $log, $http){

    $scope.moduleName = 'Orders';

    $scope.orders = [];
    
    $http.get('/api/order')
    .then(function (res) {
        $scope.orders = res.data;
    });
    
    $scope.newOrder = {
        Customer: '',
        Amount: ''
    };

    $scope.newIsDirty = false;

    $scope.$watch('newOrder', function () {
        $scope.newIsDirty = !_.isEmpty($scope.newOrder.Customer) || !_.isEmpty($scope.newOrder.Amount);
    }, true);

    $scope.cancelNew = function () {
        $scope.newOrder.Customer = '';
        $scope.newOrder.Amount = '';
    };

    $scope.resetNew = $scope.cancelNew;

    $scope.saveNew = function () {
        $http.post('/api/order', $scope.newOrder)
        .then(function (res) {
            $scope.orders.unshift(res.data);
            $scope.resetNew();
        })
        .catch(function () {
            $log.log('something went wrong');
        });
        
    };

}])

;