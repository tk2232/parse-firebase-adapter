'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FirebaseAuth = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _firebaseAdmin = require('firebase-admin');

var admin = _interopRequireWildcard(_firebaseAdmin);

var _util = require('./util');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var options = _util.FirebaseUtil.createOptionsFromEnvironment();

admin.initializeApp({
    credential: admin.credential.cert(require(options.credential)),
    databaseURL: options.databaseURL
});

var FirebaseAuth = exports.FirebaseAuth = function () {
    function FirebaseAuth() {
        _classCallCheck(this, FirebaseAuth);
    }

    _createClass(FirebaseAuth, [{
        key: 'validateAuthData',
        value: function validateAuthData(authData, options) {
            return admin.auth().verifyIdToken(authData.access_token).then(function (decodedToken) {
                if (decodedToken && decodedToken.uid === authData.id) {
                    return admin.auth().getUser(authData.id).then(function (user) {
                        if (!authData.email) {
                            authData.email = user.email;
                            authData.photoURL = user.photoURL;
                            authData.username = user.displayName;
                            authData.emailVerified = user.emailVerified;
                        }
                    });
                }

                throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, 'Firebase auth not found for this user.');
            }).catch(function (error) {
                throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, 'Firebase auth is invalid for this user.');
            });
        }
    }, {
        key: 'validateAppId',
        value: function validateAppId() {
            return Promise.resolve();
        }
    }]);

    return FirebaseAuth;
}();

exports.default = FirebaseAuth;

module.exports = FirebaseAuth;