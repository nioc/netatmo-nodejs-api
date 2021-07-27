# netatmo-nodejs-api

[![license: AGPLv3](https://img.shields.io/badge/license-AGPLv3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![GitHub release](https://img.shields.io/github/release/nioc/netatmo-nodejs-api.svg)](https://github.com/nioc/netatmo-nodejs-api/releases/latest)
[![npm](https://img.shields.io/npm/dt/netatmo-nodejs-api)](https://www.npmjs.com/package/netatmo-nodejs-api)
[![npms.io (final)](https://img.shields.io/npms-io/final-score/netatmo-nodejs-api)](https://www.npmjs.com/package/netatmo-nodejs-api)

Node.js API wrapper for Netatmo API.

## Key features
-    Authentication with all Netatmo provided methods:
     -    Authorization code grant type
     -    Client credentials grant type
     -    Refresh token
-    Security API (get homes, get events)
-    Weather API (get public data, get stations data, get measure)

## Installation

``` bash
npm install netatmo-nodejs-api
```

## Usage

### Basic example with refresh token and client credentials grant type
```js
const { NetatmoClient, SCOPE_BASIC_CAMERA } = require('netatmo-nodejs-api')

// you need to set your own information
const clientId = '60...'
const clientSecret = 'abc...'
const username = 'user@domain'
const password = 'pass'
let refreshToken = ''
let accessToken = ''
let expiresInTimestamp = 0

try {
  // create client
  const client = new NetatmoClient(clientId, clientSecret, SCOPE_BASIC_CAMERA, { timeout: 1000 })

  // authenticate
  if (!client.checkAndSetAccesToken(accessToken, expiresInTimestamp)) {
    if (refreshToken) {
      // use previous refresh token
      ({ accessToken, refreshToken, expiresInTimestamp } = await client.authenticateByRefreshToken(refreshToken))
    } else {
      // use user credentials
      ({ accessToken, refreshToken, expiresInTimestamp } = await client.authenticateByClientCredentials(username, password))
    }
    // you should store accessToken, refreshToken, expiresInTimestamp for further request
  }

  // get data
  const homes = await client.getHomes()
} catch (error) {
  console.log(error)
}
```

### Authenticate wrapper (try access token, refresh token or client credentials)

You can use the `authenticate` method which wrap 3 authentication methods.

```js
const { NetatmoClient, SCOPE_BASIC_CAMERA } = require('netatmo-nodejs-api')

// you need to set your own information
const clientId = '60...'
const clientSecret = 'abc...'
const username = 'user@domain'
const password = 'pass'
let refreshToken = ''
let accessToken = ''
let expiresInTimestamp = 0

try {
  // create client
  const client = new NetatmoClient(clientId, clientSecret, SCOPE_BASIC_CAMERA, { timeout: 1000 })

  // authenticate
  ({ accessToken, refreshToken, expiresInTimestamp } = await client.authenticate(accessToken, refreshToken, expiresInTimestamp, username, password))
  // you should store accessToken, refreshToken, expiresInTimestamp for further request

  // get data
  const homes = await client.getHomes()
} catch (error) {
  console.log(error)
}
```

## Versioning

netatmo-nodejs-api is maintained under the [semantic versioning](https://semver.org/) guidelines.

See the [releases](https://github.com/nioc/netatmo-nodejs-api/releases) on this repository for changelog.

## License

This project is licensed under the GNU Affero General Public License v3.0 - see the [LICENSE](LICENSE.md) file for details
