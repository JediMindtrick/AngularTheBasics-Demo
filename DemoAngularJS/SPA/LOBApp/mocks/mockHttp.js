angular.module('LOBApp')
/*ignore jslint start*/
// This is the documentation on what we're doing here:
// https://code.angularjs.org/1.2.15/docs/api/ngMockE2E/service/$httpBackend
// And a good blog article as well:
// http://michalostruszka.pl/blog/2013/05/27/easy-stubbing-out-http-in-angularjs-for-backend-less-frontend-development/
/*ignore jslint end*/

.run(['$httpBackend','$log', 'db', function ($httpBackend, $log, db) {

    //This is an example route that actually goes ahead and makes the real ajax request
    $httpBackend.whenGET(/^\/SPA\/.*/).passThrough();
    $httpBackend.whenGET(/^\/.*template\.html$/).passThrough();
    //The opposite condition is encapsulated by this regex var _not = /^(?!\/SPA)/;

    //db.getAll('order')
    $httpBackend.whenGET(/^\/api\/order$/).respond(
        function (method, url, data) {
            return [200, JSON.stringify(db.getAll('order')), {}];
        });
    
    var getUrlSegments = function (url) {
        var cleaned = url.replace(/^\/api\//, '');
        return cleaned.split('/');
    };

    $httpBackend.whenGET(/^\/api\/order\/[0-9]/).respond(
        function (method, url, data) {
            var segments = getUrlSegments(url);

            var toReturn = _.first(db.getWhere('order', { OrderNumber: parseInt(segments[1]) }));

            if (toReturn) {
                return [202, toReturn, {}];
            }           

            return [404, "", {}];//code - number, data - string, headers - object
        });
    
    $httpBackend.whenPUT(/^\/api\/order\/./).respond(
    function (method, url, data) {
        var segments = getUrlSegments(url);
        
        db.updateWhere('order', { OrderNumber: parseInt(segments[1]) }, JSON.parse(data));

        return [202, '{}', {}];
    });

    $httpBackend.whenPOST(/^\/api\/order$/).respond(
    function (method, url, data) {

        var order = JSON.parse(data);
        
        var _new = db.addNew('order', order);
        _new.OrderNumber = _new.id;

        return [202, JSON.stringify(_new), {}];
    });

    /*    
    //This is an example route that sends back a very basic JSON object
    $httpBackend.whenGET('someregex').respond({
        somedatafield1: 'foo',
        field2: 3
    });

    //This is a more complex route that sends back a specific error-code and data (on purpose)
    $httpBackend.whenPUT(/^\/api\/./).respond(
        function (method, url, data) {
            return [403, "error", {}];//code - number, data - string, headers - object
        });
    
    $httpBackend.whenGET('/dbTest').respond(db.getAll('collection1'));

    $httpBackend.whenGET('/GetAllConnections').respond(db.getAll('connections'));

    $httpBackend.whenGET('/GetAllConnectionTypes').respond(db.getAll('types'));

    $httpBackend.whenGET('/GetAllProtocols').respond(db.getAll('protocols'));

    $httpBackend.whenGET('/GetAllEncryptions').respond(db.getAll('encryptions'));

    $httpBackend.whenGET('/api/Client').respond([
            { name: 'WalMart', id: 0 },
            { name: 'BestBuy', id: 1 }
    ]);

    $httpBackend.whenGET('/api/Client/0').respond({
        name: 'WalMart',
        id: 0,
        projects: [
            { name: 'Galaxy S5', id: 0 },
            { name: 'iPhone 5', id: 1 }
        ]
    });

    $httpBackend.whenGET('/api/Client/0').respond({ name: 'BestBuy', id: 1, projects: [] });

    $httpBackend.whenGET('/api/Client/0/Project/0').respond({ name: 'Galaxy S5' });

    $httpBackend.whenGET('/api/Client/0/Project/0/DataFlow').respond(function () {
        var toReturn = _.first(db.getWhere('dataflows', { id: 0 }));
        return [202, toReturn, {}];
    });

    $httpBackend.whenGET('/api/Client/0/Project/0/ToolBox').respond(_.first(db.getWhere('toolboxes', { id: 0 })).value);

    $httpBackend.whenPUT('/api/Client/0/Project/0/DataFlow').respond(
        function (method, url, data) {
            var _parsed = JSON.parse(data);
            _parsed.id = 0;

            db.updateById('dataflows', 0, _parsed);

            return [202, data, {}];//code - number, data - string, headers - object
        });

    */
}])

;