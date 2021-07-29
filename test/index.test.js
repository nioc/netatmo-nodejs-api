/* eslint-disable no-unused-vars,node/no-unpublished-require,no-undef,camelcase */
const { describe } = require('mocha')
const assert = require('assert')
const axios = require('axios')
const MockAdapter = require('axios-mock-adapter')
const mock = new MockAdapter(axios)
const { NetatmoClient } = require('../lib/')

const clientId = 'clientId'
const clientSecret = 'clientSecret'
const scope = 'scope'
const requestConfig = { dummy: '1' }
const redirectUrl = 'http://localhost/auth'
const username = 'user'
const password = 'password'
const authResult = {
  access_token: '2YotnFZFEjr1zCsicMWpAA',
  expires_in: 10800,
  refresh_token: 'tGzv3JOkF0XG5Qx2TlKWIA',
}

describe('Create NetatmoClient', function () {
  it('should throw error if no application id is provided', function () {
    assert.throws(() => { const client = new NetatmoClient(null, clientSecret, scope, {}) }, new Error('Client id and client secret must be provided, see https://dev.netatmo.com/apidocumentation'))
    assert.throws(() => { const client = new NetatmoClient(clientId, null, scope, {}) }, new Error('Client id and client secret must be provided, see https://dev.netatmo.com/apidocumentation'))
  })
  it('should return a new instance of NetatmoClient with valid parameters', function () {
    const client = new NetatmoClient(clientId, clientSecret, scope, requestConfig)
    assert.strictEqual(client.clientId, clientId)
    assert.strictEqual(client.clientSecret, clientSecret)
    assert.strictEqual(client.scope, scope)
    assert.strictEqual(client.requestConfig, requestConfig)
  })
  it('should return a new instance of NetatmoClient even without request config provided', function () {
    const client = new NetatmoClient(clientId, clientSecret, scope)
    assert.strictEqual(client instanceof NetatmoClient, true)
  })
})

describe('Request', function () {
  let client
  before(async () => {
    mock
      .onGet('/path', { params: { type: 'params' } }).reply(200, { body: [{ type: 'getpublicdata' }] })
      .onGet('/timeout').timeout()
      .onGet('/authError').reply(400, { error: 'invalid_request', error_description: 'Missing parameters, "username" and "password" are required' })
      .onGet('/appError').reply(400, { error: { code: 1, message: 'Access token is missing' } })
      .onGet('/tokenExpired401').reply(401, { error: { code: 3, message: 'Access token expired' } })
      .onGet('/tokenExpired403').reply(403, { error: { code: 3, message: 'Access token expired' } })
      .onGet('/noMessageError').reply(500, { error: { code: 99 } })
      .onAny().reply(404)
  })
  after(() => {
    mock.reset()
  })
  beforeEach(() => {
    client = new NetatmoClient(clientId, clientSecret, scope, {})
  })
  it('should throw error if access token is not set', async function () {
    await assert.rejects(async () => { await client.request('GET', '/path', { type: 'params' }, { type: 'data' }) }, new Error('Access token must be provided'))
  })
  it('should throw error in case of timeout', async function () {
    await client.authenticate(authResult.access_token, undefined, 3600 + Date.now() / 1000)
    await assert.rejects(async () => { await client.request('GET', '/timeout') }, new Error('HTTP request /timeout failed: timeout of 0ms exceeded'))
  })
  it('should throw error in case of OAuth2 bad request', async function () {
    await client.authenticate(authResult.access_token, undefined, 3600 + Date.now() / 1000)
    await assert.rejects(async () => { await client.request('GET', '/authError') }, new Error('HTTP request /authError failed: Missing parameters, "username" and "password" are required (400)'))
  })
  it('should throw error in case of application bad request', async function () {
    await client.authenticate(authResult.access_token, undefined, 3600 + Date.now() / 1000)
    await assert.rejects(async () => { await client.request('GET', '/appError') }, new Error('HTTP request /appError failed: Access token is missing (400)'))
  })
  it('should throw error in case of application bad request', async function () {
    await client.authenticate(authResult.access_token, undefined, 3600 + Date.now() / 1000)
    await assert.rejects(async () => { await client.request('GET', '/noMessageError') }, new Error('HTTP request /noMessageError failed: {"code":99} (500)'))
  })
})

describe('Authentication', function () {
  before(() => {
    mock
      .onPost('/oauth2/token').reply(200, authResult)
      .onAny().reply(404)
  })
  after(() => {
    mock.reset()
  })

  describe('Authorize code grant type', function () {
    describe('Get URL', function () {
      it('throw error if redirect URL is missing', function () {
        const client = new NetatmoClient(clientId, clientSecret, scope, {})
        assert.throws(() => { client.getAuthorizeUrl() }, new Error('Redirect url must be provided'))
      })
      it('should generate an authorize code grant url', function () {
        const querystring = require('querystring')
        const client = new NetatmoClient(clientId, clientSecret, scope, {})
        assert.strictEqual(client.getAuthorizeUrl(redirectUrl, 'state').startsWith(`https://api.netatmo.com/oauth2/authorize?${querystring.stringify({
          client_id: clientId,
          redirect_uri: redirectUrl,
          scope: scope,
          state: 'state',
        })}`), true)
      })
    })

    describe('Use autorize code', function () {
      it('should throw error if authorization code or redirect are missing', async function () {
        const client = new NetatmoClient(clientId, clientSecret, scope, {})
        await assert.rejects(async () => { await client.authenticateByAuthorizationCode(null, redirectUrl, 'state') }, new Error('Authorization code and redirect url must be provided'))
        await assert.rejects(async () => { await client.authenticateByAuthorizationCode('authCode', undefined, 'state') }, new Error('Authorization code and redirect url must be provided'))
      })
      it('should throw error if state is not the one provided', async function () {
        const client = new NetatmoClient(clientId, clientSecret, scope, {})
        client.getAuthorizeUrl(redirectUrl, 'state')
        await assert.rejects(async () => { await client.authenticateByAuthorizationCode('authCode', redirectUrl, 'another') }, new Error('State is not identical as the one provided during authorize url request'))
      })

      it('should obtain token with autorize code', async function () {
        const client = new NetatmoClient(clientId, clientSecret, scope, {})
        const stateUsed = client.getAuthorizeUrl(redirectUrl, 'state').split('state=')[1]
        const { accessToken, refreshToken, expiresInTimestamp } = await client.authenticateByAuthorizationCode('authCode', redirectUrl, stateUsed)
        assert.strictEqual(accessToken, authResult.access_token)
        assert.strictEqual(refreshToken, authResult.refresh_token)
        assert.strictEqual(expiresInTimestamp > Date.now() / 1000, true)
      })
    })
  })

  describe('User credentials grant type', function () {
    it('should throw error if user credentials are missing', async function () {
      const client = new NetatmoClient(clientId, clientSecret, scope, {})
      await assert.rejects(async () => { await client.authenticateByClientCredentials(null, password) }, new Error('Username and password must be provided'))
      await assert.rejects(async () => { await client.authenticateByClientCredentials(username, undefined) }, new Error('Username and password must be provided'))
    })

    it('should obtain token with client credentials', async function () {
      const client = new NetatmoClient(clientId, clientSecret, scope, {})
      const { accessToken, refreshToken, expiresInTimestamp } = await client.authenticateByClientCredentials(username, password)
      assert.strictEqual(accessToken, authResult.access_token)
      assert.strictEqual(refreshToken, authResult.refresh_token)
      assert.strictEqual(expiresInTimestamp > Date.now() / 1000, true)
    })
  })

  describe('Refresh token', function () {
    it('should throw error if refresh token is missing', async function () {
      const client = new NetatmoClient(clientId, clientSecret, scope, {})
      await assert.rejects(async () => { await client.authenticateByRefreshToken() }, new Error('Refresh token must be provided'))
    })

    it('should obtain token with refresh token', async function () {
      const client = new NetatmoClient(clientId, clientSecret, scope, {})
      const { accessToken, refreshToken, expiresInTimestamp } = await client.authenticateByRefreshToken(authResult.refresh_token)
      assert.strictEqual(accessToken, authResult.access_token)
      assert.strictEqual(refreshToken, authResult.refresh_token)
      assert.strictEqual(expiresInTimestamp > Date.now() / 1000, true)
    })
  })

  describe('Authenticate wrapper', function () {
    it('should use provided valid access token', async function () {
      const client = new NetatmoClient(clientId, clientSecret, scope, {})
      const { accessToken, refreshToken, expiresInTimestamp } = await client.authenticate(authResult.access_token, undefined, 3600 + Date.now() / 1000)
      assert.strictEqual(accessToken, authResult.access_token)
    })
    it('should obtain token with refresh token', async function () {
      const client = new NetatmoClient(clientId, clientSecret, scope, {})
      const { accessToken, refreshToken, expiresInTimestamp } = await client.authenticate(undefined, authResult.refresh_token)
      assert.strictEqual(accessToken, authResult.access_token)
      assert.strictEqual(refreshToken, authResult.refresh_token)
      assert.strictEqual(expiresInTimestamp > Date.now() / 1000, true)
    })
    it('should obtain token with client credentials', async function () {
      const client = new NetatmoClient(clientId, clientSecret, scope, {})
      const { accessToken, refreshToken, expiresInTimestamp } = await client.authenticate(undefined, undefined, 0, username, password)
      assert.strictEqual(accessToken, authResult.access_token)
      assert.strictEqual(refreshToken, authResult.refresh_token)
      assert.strictEqual(expiresInTimestamp > Date.now() / 1000, true)
    })
  })

  describe('Invalid token', function () {
    before(() => {
      mock
        .onPost('/oauth2/token').reply(200, {})
        .onAny().reply(404)
    })
    after(() => {
      mock.reset()
    })
    it('should throw error if received token is invalid', async function () {
      const client = new NetatmoClient(clientId, clientSecret, scope, {})
      await assert.rejects(async () => { await client.authenticateByRefreshToken(authResult.refresh_token) }, new Error('Invalid Netatmo token'))
    })
  })
})

describe('Weather', function () {
  const device_id = '01:02'
  const module_id = '123'
  const scale = 'scale'
  const type = 'type'
  let client
  before(async () => {
    client = new NetatmoClient(clientId, clientSecret, scope, {})
    await client.authenticate(authResult.access_token, undefined, 3600 + Date.now() / 1000)
    mock
      .onGet('/api/getpublicdata', { params: { lat_ne: 1, lon_ne: 1, lat_sw: 1, lon_sw: 1, requiredData: undefined, filter: false } }).reply(200, { body: [{ type: 'getpublicdata' }] })
      .onGet('/api/getstationsdata', { params: { device_id, get_favorites: false } }).reply(200, { body: [{ type: 'getstationsdata' }] })
      .onGet('/api/getmeasure', { params: { device_id, module_id, scale, type, date_begin: 1, date_end: 2, limit: 5, optimize: true, real_time: false } }).reply(200, { body: [{ type: 'getmeasure' }] })
      .onAny().reply(404)
  })
  after(() => {
    mock.reset()
  })

  describe('getPublicData API', function () {
    it('should throw error if area is not provided', async function () {
      await assert.rejects(async () => { await client.getPublicData() }, new Error('Latitude and Longitude must be provided'))
    })
    it('should return public data', async function () {
      const result = await client.getPublicData(1, 1, 1, 1)
      assert.strictEqual(result[0].type, 'getpublicdata')
    })
  })

  describe('getStationsData API', function () {
    it('should return stations data', async function () {
      const result = await client.getStationsData(device_id)
      assert.strictEqual(result[0].type, 'getstationsdata')
    })
  })

  describe('getMeasure API', function () {
    it('should throw error if query is not valid', async function () {
      await assert.rejects(async () => { await client.getMeasure() }, new Error('Device id, scale and type must be provided'))
    })
    it('should return stations data', async function () {
      const result = await client.getMeasure(device_id, module_id, scale, type, 1, 2, 5, true, false)
      assert.strictEqual(result[0].type, 'getmeasure')
    })
  })
})

describe('Security', function () {
  const home_id = '1'
  const event_id = '5'
  const person_id = '7'
  const image_id = '8'
  const key = '9'
  let client
  before(async () => {
    client = new NetatmoClient(clientId, clientSecret, scope, {})
    await client.authenticate(authResult.access_token, undefined, 3600 + Date.now() / 1000)
    mock
      .onGet('/api/gethomedata', { params: { home_id, size: 31 } }).reply(200, { body: [{ type: 'gethomedata' }] })
      .onGet('/api/geteventsuntil', { params: { home_id, event_id } }).reply(200, { body: [{ type: 'geteventsuntil' }] })
      .onGet('/api/getlasteventof', { params: { home_id, person_id, offset: 32 } }).reply(200, { body: [{ type: 'getlasteventof' }] })
      .onGet('/api/getnextevents', { params: { home_id, event_id, size: 33 } }).reply(200, { body: [{ type: 'getnextevents' }] })
      .onGet('/api/getcamerapicture', { params: { image_id, key } }).reply(200, 'picture')
      .onAny().reply(404)
  })
  after(() => {
    mock.reset()
  })

  describe('getHomes API', function () {
    it('should return homes data', async function () {
      const result = await client.getHomes(home_id, 31)
      assert.strictEqual(result[0].type, 'gethomedata')
    })
  })

  describe('getEventsUntil API', function () {
    it('should throw error if home id or event id are not provided', async function () {
      await assert.rejects(async () => { await client.getEventsUntil(null, event_id) }, new Error('Home id and event id must be provided'))
      await assert.rejects(async () => { await client.getEventsUntil(home_id) }, new Error('Home id and event id must be provided'))
    })
    it('should return events', async function () {
      const result = await client.getEventsUntil(home_id, event_id)
      assert.strictEqual(result[0].type, 'geteventsuntil')
    })
  })

  describe('getLastEventOf API', function () {
    it('should throw error if home id or person id are not provided', async function () {
      await assert.rejects(async () => { await client.getLastEventOf(null, person_id) }, new Error('Home id and person id must be provided'))
      await assert.rejects(async () => { await client.getLastEventOf(home_id) }, new Error('Home id and person id must be provided'))
    })
    it('should return person events', async function () {
      const result = await client.getLastEventOf(home_id, person_id, 32)
      assert.strictEqual(result[0].type, 'getlasteventof')
    })
  })

  describe('getNextEvents API', function () {
    it('should throw error if home id or event id are not provided', async function () {
      await assert.rejects(async () => { await client.getNextEvents(null, event_id) }, new Error('Home id and event id must be provided'))
      await assert.rejects(async () => { await client.getNextEvents(home_id) }, new Error('Home id and event id must be provided'))
    })
    it('should return events', async function () {
      const result = await client.getNextEvents(home_id, event_id, 33)
      assert.strictEqual(result[0].type, 'getnextevents')
    })
  })

  describe('getCameraPicture API', function () {
    it('should throw error if image id or key are not provided', async function () {
      await assert.rejects(async () => { await client.getCameraPicture(null, key) }, new Error('Image id and key must be provided'))
      await assert.rejects(async () => { await client.getCameraPicture(image_id) }, new Error('Image id and key must be provided'))
    })
    it('should return picture', async function () {
      const result = await client.getCameraPicture(image_id, key)
      assert.strictEqual(result, 'picture')
    })
  })
})
