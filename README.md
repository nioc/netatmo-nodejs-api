# netatmo-nodejs-api

[![license: LGPLv3](https://img.shields.io/badge/license-LGPL--3.0--or--later-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)
[![Build Status](https://img.shields.io/github/actions/workflow/status/nioc/netatmo-nodejs-api/commit.yml?label=github%20build)](https://github.com/nioc/netatmo-nodejs-api/actions/workflows/commit.yml)
[![Coverage Status](https://coveralls.io/repos/github/nioc/netatmo-nodejs-api/badge.svg?branch=master)](https://coveralls.io/github/nioc/netatmo-nodejs-api?branch=master)
[![GitHub release](https://img.shields.io/github/release/nioc/netatmo-nodejs-api.svg)](https://github.com/nioc/netatmo-nodejs-api/releases/latest)
[![npm](https://img.shields.io/npm/dt/netatmo-nodejs-api)](https://www.npmjs.com/package/netatmo-nodejs-api)

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

You need to [create an application](https://dev.netatmo.com/apps/createanapp#form)

### ~~Basic example with Client Credentials grant type~~

This method has been deprecated, see [Natatmo documentation](https://dev.netatmo.com/apidocumentation/oauth#client-credential)

### Basic example with Refresh Token grant type

You need to generate a token on [Netatmo website](https://dev.netatmo.com/apps/):
-    choose scopes
-    click `generate token` button and accept the condition
-    copy both `Access Token` and `Refresh Token` and use it in the following code

```js
const { NetatmoClient, SCOPE_BASIC_CAMERA } = require('netatmo-nodejs-api')

async function main () {
  // you need to set your own information
  const clientId = ''
  const clientSecret = ''
  let accessToken = ''
  let refreshToken = ''
  let expiresInTimestamp = 0

  try {
    // create client
    const client = new NetatmoClient(clientId, clientSecret, SCOPE_BASIC_CAMERA, { timeout: 1000 })

    // authenticate
    if (!client.checkAndSetAccesToken(accessToken, expiresInTimestamp)) {
      if (refreshToken) {
        // use previous refresh token
        ({ accessToken, refreshToken, expiresInTimestamp } = await client.authenticateByRefreshToken(refreshToken))
        // you should store accessToken, refreshToken, expiresInTimestamp for further request
        console.log('update the code with following 3 lines:')
        console.log(`  let accessToken = '${accessToken}'`)
        console.log(`  let refreshToken = '${refreshToken}'`)
        console.log(`  let expiresInTimestamp = ${expiresInTimestamp}`)
      } else {
        throw new Error('Refresh token is missing')
      }
    }

    // get data
    const homes = await client.getHomes()
    console.log(homes)
  } catch (error) {
    console.log(error)
  }
}

main()
```

### Authenticate wrapper (try access token or refresh token)

You can use the `authenticate` method which wrap 2 authentication methods.

```js
const { NetatmoClient, SCOPE_BASIC_CAMERA } = require('netatmo-nodejs-api')

async function main () {
  // you need to set your own information
  const clientId = ''
  const clientSecret = ''
  let refreshToken = ''
  let accessToken = ''
  let expiresInTimestamp = 0

  try {
    // create client
    const client = new NetatmoClient(clientId, clientSecret, SCOPE_BASIC_CAMERA, { timeout: 1000 });

    // authenticate
    ({ accessToken, refreshToken, expiresInTimestamp } = await client.authenticate(accessToken, refreshToken, expiresInTimestamp))
    // you should store accessToken, refreshToken, expiresInTimestamp for further request
    console.log('update the code with following:', refreshToken)
    console.log(`  let accessToken = '${accessToken}'`)
    console.log(`  let refreshToken = '${refreshToken}'`)
    console.log(`  let expiresInTimestamp = ${expiresInTimestamp}`)

    // get data
    const homes = await client.getHomes()
    console.log(homes)
  } catch (error) {
    console.log(error)
  }
}

main()
```

## About types

From version 2.0, this library is written in TypeScript. Response typing comes from the Netatmo Swagger, transformed into a TS interface by SwaggerEditor.
Errors may be present, so don't hesitate to [create an issue](https://github.com/nioc/netatmo-nodejs-api/issues/new) for fix.

## Versioning

netatmo-nodejs-api is maintained under the [semantic versioning](https://semver.org/) guidelines.

See the [releases](https://github.com/nioc/netatmo-nodejs-api/releases) on this repository for changelog.

## License

This project is licensed under the GNU Lesser General Public License v3.0 - see the [LICENSE](LICENSE.md) file for details
