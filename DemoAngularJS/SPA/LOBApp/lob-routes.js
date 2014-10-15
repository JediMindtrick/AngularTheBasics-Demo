angular.module('LOBApp')

.config(['$stateProvider', function ($stateProvider) {
    $stateProvider

        .state('default', {
            url: '',
            templateUrl: '/SPA/LOBApp/home/home.html',
            controller: 'HomeCtrl'
        })

        .state('home', {
            url: '/home',
            templateUrl: '/SPA/LOBApp/home/home.html',
            controller: 'HomeCtrl'
        })

        .state('orders', {
            url: '/order',
            templateUrl: '/SPA/LOBApp/orders/orders.html',
            controller: 'OrdersCtrl'
        })

        .state('orderDetail', {
//            url: '/orderDetail/:OrderNumber',
            url: '/order/:OrderNumber',
            templateUrl: '/SPA/LOBApp/orders/orderDetail/orderDetail.html',
            controller: 'OrderDetailCtrl'
        })
    ;

}])

;