angular.module('Dependency0', [])

.service('dependency0', ['$q', '$log', function ($q, $log) {

/*
    var profile = {
        whoami: '',
        loggedIn: false
    };

    return {
        login: function (username) {

            profile.whoami = username;
            profile.loggedIn = true;

            return profile;
        },
        logout: function () {
            profile.whoami = '';
            profile.loggedIn = false;

            return profile;
        },
        whoami: function () {
            return profile.whoami;
        },
        getProfile: function () {
            return profile;
        }
    };
    */

    return {
        foo: 'bar'
    };
}]);