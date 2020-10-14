# Parse-server-firebase-auth-adapter
Authenticate to parse server with your Firebase account

## How to use it?
### 1) Install the module
```js
npm i -S parse-firebase-adapter
```

### 2) Add environment variables
* Copy the `firebaseAccountKey.json` from Firebase into your folder, maybe root of your project's folder.
* Add new environment into your `.env` or using export in your terminal.
```js
// firebaseAccountKey.json store in root of project.
FIREBASE_SERVICE_ACCOUNT_KEY = '../../firebaseAccountKey.json'

// URL for connect to Firebase database.
FIREBASE_DATABASE_URL = "https://SOME_ID.firebaseio.com"

// parse server provider
PARSE_SERVER_AUTH_PROVIDERS = "{\"firebase\": {\"module\": \"parse-firebase-adapter\"}}"
```
### 3) Add this module when creating `ParseServer`
```js
import { ParseServer } from 'parse-server'
import firebaseAuthAdapter from 'parse-firebase-adapter'
...
const parserServer = new ParseServer({
  ...
  auth: {
    firebase: firebaseAuthAdapter
  }
})
```
### 4) Using Firebase access token in our project
* Get Parse access token by POST a raw data to `/parse/users`
```sh
curl -X POST \
  {{host}}/parse/users \
  -H 'content-type: application/json' \
  -H 'x-parse-application-id: {{ParseAppId}}' \
  -d '{
    "authData": {
    	"firebase": {
    		"access_token": "{{access_token}}",
    		"id": "{{FirebaseUID}}"
    	}
    }
}'
```

