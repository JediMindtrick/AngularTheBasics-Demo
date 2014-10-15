angular.module('OrderDetail', [])

.controller('OrderDetailCtrl', ['$scope', '$log', '$http', '$stateParams', '$location', function ($scope, $log, $http, $stateParams, $location) {

    $log.log('looking up order number ' + $stateParams.OrderNumber);
    $scope.moduleName = 'OrderDetail';

    $http.get('/api/order/' + $stateParams.OrderNumber)
    .then(function (res) {
        $scope.order = res.data;
    })
    .catch(function (res) {
        $log.log('something went wrong');
    });

    $scope.save = function (order) {
        $http.put('/api/order/' + $stateParams.OrderNumber, order)
        .then(function (res) {
            $scope.orderDetail.$setPristine();
            $location.path('/order');
        })
        .catch(function () {
            $log.log('something went wrong');
        });
    };
}])

;