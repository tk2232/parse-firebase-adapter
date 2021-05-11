"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FirebaseAuth = void 0;

var admin = _interopRequireWildcard(require("firebase-admin"));

var _util = require("./util");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var options = _util.FirebaseUtil.createOptionsFromEnvironment();

admin.initializeApp({
  credential: admin.credential.cert(require(options.credential)),
  databaseURL: options.databaseURL
});

var FirebaseAuth =
/*#__PURE__*/
function () {
  function FirebaseAuth() {
    _classCallCheck(this, FirebaseAuth);
  }

  _createClass(FirebaseAuth, [{
    key: "validateAuthData",
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
    key: "validateAppId",
    value: function validateAppId() {
      return Promise.resolve();
    }
  }]);

  return FirebaseAuth;
}();

exports.FirebaseAuth = FirebaseAuth;
var _default = FirebaseAuth;
exports.default = _default;
module.exports = FirebaseAuth;