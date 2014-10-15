angular.module('InMemoryDb', [])
.factory('db', function () {

    var _data = {
    };

    var _getNextId = function (collName) {
        var _currMaxValue = _.max(_data[collName], 'id');
        var _currMax = _currMaxValue ? _currMaxValue.id : 0;
        return _currMax + 1;
    };

    return {

        config: function (seed) {
            _data = seed;
        },

        getAll: function (collName) {
            return _data[collName];
        },

        getByIndex: function (collName, index) {
            return _data[collName][index];
        },

        getWhere: function (collName, matcher) {
            var toReturn = _.where(_data[collName], matcher);
            return toReturn;
        },

        addNew: function (collName, newValue) {
            var _id = _getNextId(collName);
            newValue.id = _id;
            _data[collName].push(newValue);
            return newValue;
        },

        updateWhere: function (collName, matcher, newValue) {
            var _newColl = _.map(_data[collName], function (row) {

                if (_.any([row], matcher)) {
                    return newValue;
                } else {
                    return row;
                }
            });
            _data[collName] = _newColl;
            return _data[collName];
        },

        updateById: function (collName, id, newValue) {
            var _newColl = _.map(_data[collName], function (row) {
                if (row.id === id) {
                    return newValue;
                } else {
                    return row;
                }
            });
            _data[collName] = _newColl;
            return _data[collName];
        }
    };
})

;