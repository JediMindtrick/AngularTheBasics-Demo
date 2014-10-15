angular.module('LOBApp')
/*ignore jslint start*/
// This is the documentation on what we're doing here:
// https://code.angularjs.org/1.2.15/docs/api/ngMockE2E/service/$httpBackend
// And a good blog article as well:
// http://michalostruszka.pl/blog/2013/05/27/easy-stubbing-out-http-in-angularjs-for-backend-less-frontend-development/
/*ignore jslint end*/

.run(['db', function (db) {
    db.config({
        order: [
            {
                id: 1,
                OrderNumber: 1,
                Customer: 'Ricky Bobby',
                Amount: 1000
            },
            {
                id: 2,
                OrderNumber: 2,
                Customer: 'Davey Jones',
                Amount: 2000
            }
        ]
    });
}]);