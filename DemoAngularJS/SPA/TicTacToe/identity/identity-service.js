angular.module('Identity', ['Data'])

.service('identity', ['$q','$log', 'data', function ($q, $log, data) {
    
    var profile = {
        whoami: '',
        loggedIn: false
    };

    return {
        register: function (username) {
            var toReturn = data.register(username);

            toReturn.then(function () {
                profile.whoami = username;
                profile.loggedIn = true;
            });

            return toReturn;
        },
        logout: function () {
            var toReturn = data.logout(profile.whoami);

            toReturn.then(function () {
                profile.loggedIn = false;
            });

            return toReturn;
        },
        whoami: function () {
            return profile.whoami;
        },
        getProfile: function () {
            return profile;
        }
    };
}])

;