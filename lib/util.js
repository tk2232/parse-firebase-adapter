'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FirebaseUtil = function () {
    function FirebaseUtil() {
        _classCallCheck(this, FirebaseUtil);
    }

    _createClass(FirebaseUtil, null, [{
        key: 'createOptionsFromEnvironment',
        value: function createOptionsFromEnvironment() {
            var options = {};
            options = this.requiredOrFromEnvironment(options, 'credential', 'FIREBASE_SERVICE_ACCOUNT_KEY');
            options = this.requiredOrFromEnvironment(options, 'databaseURL', 'FIREBASE_DATABASE_URL');
            return options;
        }
    }, {
        key: 'requiredOrFromEnvironment',
        value: function requiredOrFromEnvironment(options, key, env) {
            options[key] = options[key] || process.env[env];
            if (!options[key]) {
                throw 'Firebase auth adater requires an ' + key;
            }
            return options;
        }
    }, {
        key: 'fromEnvironmentOrDefault',
        value: function fromEnvironmentOrDefault(options, key, env, defaultValue) {
            options[key] = options[key] || process.env[env] || defaultValue;
            return options;
        }
    }]);

    return FirebaseUtil;
}();

exports.FirebaseUtil = FirebaseUtil;