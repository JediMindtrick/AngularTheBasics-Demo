angular.module('Data', [])

.service('data',['$q','$log', function ($q, $log) {

    var myFirebaseRef = new Firebase("https://tic-tac-toe-52.firebaseio.com/");
    var _usersRef = myFirebaseRef.child('users');
    var _gamesRef = myFirebaseRef.child('games');
    
    var _logout = function (username) {
        var toReturn = $q.defer();

        var _user = _usersRef.child(username);

        _user.update({
            loggedIn: false
        });        

        toReturn.resolve(username);

        return toReturn.promise;        
    };

    var _login = function (username, userRef, deferred) {
        var _tx = function (currentValue) {
            if (currentValue && currentValue.active && !currentValue.loggedIn) {
                return {
                    active: true,
                    loggedIn: true
                };
            }
            return void (0);
        };

        var _onComplete = function (err, committed, snapshot) {
            if (err) {
                $log.log(err);
                deferred.reject(err);
            }
            if (committed) {
                $log.log('committed');
                deferred.resolve(username);
            } else {
                $log.log('user already registered and logged in, aborting');
                deferred.reject('user already registered and logged in');
            }
        };

        userRef.transaction(_tx, _onComplete);
    };

    var _register = function (username) {

        var toReturn = $q.defer();

        var _user = _usersRef.child(username);

        var _tx = function (currentValue) {
            $log.log('currentValue: ' + JSON.stringify(currentValue));
            if (currentValue === null) {
                return {
                    active: true,
                    loggedIn: true
                };
            }
            return void (0);
        };

        var _onComplete = function (err, committed, snapshot) {
            if (err) {
                $log.log(err);
                toReturn.reject(err);
            }
            if (committed) {
                $log.log('committed');
                toReturn.resolve(username);
            } else {
                $log.log('user already registered, trying login');
                _login(username, _user, toReturn);
            }
        };

        _user.transaction(_tx, _onComplete);

        return toReturn.promise;
    };

    var _updateGame = function (game) {
        var toReturn = $q.defer();

        var _game = _gamesRef.child(game.id);
        var _copy = JSON.parse(JSON.stringify(game));
        delete _copy.whoami;

        _game.set(_copy, function (err) {
            if (err) {
                toReturn.reject(err);
            } else {
                toReturn.resolve(game);
            }
        });

        return toReturn.promise;
    };

    var _registerNewGame = function (game) {
        var toReturn = $q.defer();
        var _id = (new Date()).getTime();

        var _game = _gamesRef.child(_id);

        var _tx = function (currentValue) {
            if (currentValue === null) {
                game.id = _id;

                var _copy = JSON.parse(JSON.stringify(game));
                delete _copy.whoami;

                return _copy;
            }

            return void (0);
        };

        var _onComplete = function (err, committed, snapshot) {
            if (err) {
                toReturn.reject(err);
            }
            if (committed) {
                toReturn.resolve(game);
            } else {
                toReturn.reject('unable to register new game');
            }
        };

        _game.transaction(_tx, _onComplete);

        return toReturn.promise;
    };
    
    var _runScope = function(angularScope, callback) {

        var result = void 0;
        var phase = angularScope.$root.$$phase;

        if (phase == '$apply' || phase == '$digest') {
            result = callback(angularScope);
        } else {
            angularScope.$apply(function () {
                result = callback(angularScope);
            });
        }

        return result;
    }

    var _watchGame = function (game, scope) {
        var _whoami = game.whoami;
        var _game = _gamesRef.child(game.id);
        _game.on('value', function (snapshot) {
            _runScope(scope, function () {
                scope.game = snapshot.val();
                scope.game.whoami = _whoami;
            });
        });
    };
    
    return {
        register: _register,
        logout: _logout,
        registerNewGame: _registerNewGame,
        updateGame: _updateGame,
        watchGame: _watchGame
    };
}])

;