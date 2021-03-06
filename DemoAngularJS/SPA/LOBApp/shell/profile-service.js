﻿angular.module('Profile', ['Dependency0'])

.service('identity', ['$q', '$log', 'dependency0', function ($q, $log, dep0) {

    $log.log(dep0.foo);

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
}]);