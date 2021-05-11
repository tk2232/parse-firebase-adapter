'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FirebaseUtil = void 0;

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FirebaseUtil =
/*#__PURE__*/
function () {
  function FirebaseUtil() {
    _classCallCheck(this, FirebaseUtil);
  }

  _createClass(FirebaseUtil, null, [{
    key: "createOptionsFromEnvironment",
    value: function createOptionsFromEnvironment() {
      var options = {};
      options = this.requiredOrFromEnvironment(options, 'credential', 'FIREBASE_SERVICE_ACCOUNT_KEY');
      return options;
    }
  }, {
    key: "requiredOrFromEnvironment",
    value: function requiredOrFromEnvironment(options, key, env) {
      options[key] = options[key] || process.env[env];

      if (!options[key]) {
        throw "Firebase auth adater requires an ".concat(key);
      }

      return options;
    }
  }, {
    key: "fromEnvironmentOrDefault",
    value: function fromEnvironmentOrDefault(options, key, env, defaultValue) {
      options[key] = options[key] || process.env[env] || defaultValue;
      return options;
    }
  }]);

  return FirebaseUtil;
}();

exports.FirebaseUtil = FirebaseUtil;