'use strict';

class FirebaseUtil {

    static createOptionsFromEnvironment() {
        let options = {};
        options = this.requiredOrFromEnvironment(options, 'credential', 'FIREBASE_SERVICE_ACCOUNT_KEY');
        return options;
    }

    static requiredOrFromEnvironment(options, key, env) {
        options[key] = options[key] || process.env[env];
        if (!options[key]) {
            throw `Firebase auth adater requires an ${key}`;
        }
        return options;
    }

    static fromEnvironmentOrDefault(options, key, env, defaultValue) {
        options[key] = options[key] || process.env[env] || defaultValue;
        return options;
    }
}

export { FirebaseUtil };
