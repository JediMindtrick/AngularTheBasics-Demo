angular.module('LOBApp')


.config(['$httpProvider', function ($httpProvider) {

    $httpProvider.interceptors.push('myInterceptor');
}])

.factory('myInterceptor', ['$log', '$q', function ($log, $q) {

    return {
        'request': function (config) {
            // do something on success
            $log.log('interceptor: request sent');

            return config;
        },
        // optional method
        'requestError': function (rejection) {
            // do something on error
            debugger;
            $log.log('interceptor: something went wrong');

            return $q.reject(rejection);
        },
        'response': function (response) {
            // do something on success
            $log.log('interceptor: response');
            return response;
        },
        // optional method
        'requestError': function (rejection) {
            // do something on error
            debugger;
            $log.log('interceptor: something went wrong');

            return $q.reject(rejection);
        },
    };
}])