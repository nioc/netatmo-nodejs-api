'use strict'

import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import querystring from 'querystring'
import type { PublicData, Measure, StationData, Homes, EventsList, CameraImage } from './types/index'

// private constants
const HTTP_POST = 'POST'
const HTTP_GET = 'GET'
const PATH_AUTH = '/oauth2/token'
const baseURL = 'https://api.netatmo.com'

/**
 * Basic scope for weather station
 */
const SCOPE_BASIC_WEATHER = 'read_station'
/**
 * Basic scope for camera
 */
const SCOPE_BASIC_CAMERA = 'read_camera write_camera read_presence'
/**
 * Full scope for camera, end user has to provide an explicit consent with autorization code flow
 */
const SCOPE_FULL_CAMERA = 'read_camera write_camera access_camera read_presence access_presence'
/**
 * Full scope for camera and weather station, end user has to provide an explicit consent with autorization code flow
 */
const SCOPE_FULL = 'read_station read_camera write_camera access_camera read_presence access_presence'

type NetatmoToken = {
  access_token: string
  refresh_token: string
  expires_in: number
}

class Token {
  accessToken: string | null
  refreshToken: string | null
  expiresInTimestamp: number

  /**
   * Create an instance of Token
   *
   * @param {string} accessToken Access token for your user
   * @param {string} refreshToken Refresh token to get a new access token once it has expired
   * @param {number} expiresInTimestamp Validity timelaps as timestamp
   * @return {Token} A new instance of Token
   */
  constructor(accessToken: string | null, refreshToken: string | null, expiresInTimestamp: number) {
    this.accessToken = accessToken
    this.refreshToken = refreshToken
    this.expiresInTimestamp = expiresInTimestamp
  }
}

class NetatmoClient {
  clientId: string
  clientSecret: string
  scope: string
  requestConfig: {}
  authorizationCode: string | null
  redirectUrl: string | null
  state: string | null
  refreshToken: string | null
  accessToken: string | null
  expiresInTimestamp: number

  /**
   * Create an instance of Netatmo client
   *
   * @param {string} clientId Your app client_id
   * @param {string} clientSecret Your app client_secret
   * @param {string} scope Scopes space separated (example: `'read_station read_camera write_camera read_presence'`)
   * @param {AxiosRequestConfig} requestConfig HTTP request configuration (see https://axios-http.com/docs/req_config)
   * @return {NetatmoClient} A new instance of Netatmo client
   */
  constructor(clientId: string, clientSecret: string, scope: string, requestConfig: AxiosRequestConfig = {}) {
    if (!clientId || !clientSecret) {
      throw new Error('Client id and client secret must be provided, see https://dev.netatmo.com/apidocumentation')
    }
    this.clientId = clientId
    this.clientSecret = clientSecret
    this.scope = scope
    this.requestConfig = requestConfig
    // authorization code
    this.authorizationCode = null
    this.redirectUrl = null
    this.state = null
    // token
    this.refreshToken = null
    this.accessToken = null
    this.expiresInTimestamp = 0
  }

  /**
   * Authenticate with access token or refresh token
   *
   * @param {string} accessToken Access token for your user
   * @param {string} refreshToken Refresh token to get a new access token
   * @param {number} expiresInTimestamp Validity timelaps as timestamp
   * @return {Token} Token `{accessToken, refreshToken, expiresInTimestamp}`
   */
  async authenticate(accessToken: string | null = null, refreshToken: string | null = null, expiresInTimestamp: number = 0): Promise<Token> {
    if (this.checkAndSetAccesToken(accessToken, expiresInTimestamp)) {
      if (refreshToken) {
        this.refreshToken = refreshToken
      }
      return new Token(accessToken, refreshToken, expiresInTimestamp)
    }
    if (refreshToken) {
      return this.authenticateByRefreshToken(refreshToken)
    }
    throw new Error('Refresh token is missing')
  }

  /**
   * Return url for authorize code grant
   *
   * @param {string} redirectUrl Callback URL of your application
   * @param {string} statePrefix Arbitrary string added to state
   * @return {string} Url to request as POST method for authorize code grant flow
   */
  getAuthorizeUrl(redirectUrl: string | null = null, statePrefix: string = 'auth'): string {
    if (redirectUrl) {
      this.redirectUrl = redirectUrl
    }
    if (!this.redirectUrl) {
      throw new Error('Redirect url must be provided')
    }
    this.state = statePrefix + Math.random() * 10000000000000000
    const query = querystring.stringify({
      client_id: this.clientId,
      redirect_uri: this.redirectUrl,
      scope: this.scope,
      state: this.state,
    })
    return `${baseURL}/oauth2/authorize?${query}`
  }

  /**
   * Authenticate with authorization code
   *
   * @param {string} authorizationCode Authorization code provided after user authorize your app
   * @param {string} redirectUrl Callback URL of your application (must be the same as the one provided in authorize url)
   * @param {string} state Arbitrary string (prevent Cross-site Request Forgery)
   * @return {Token} Token `{accessToken, refreshToken, expiresInTimestamp}`
   */
  async authenticateByAuthorizationCode(authorizationCode: string, redirectUrl: string, state: string): Promise<Token> {
    if (!authorizationCode || !redirectUrl) {
      throw new Error('Authorization code and redirect url must be provided')
    }
    if (this.state !== state) {
      throw new Error('State is not identical as the one provided during authorize url request')
    }
    this.authorizationCode = authorizationCode
    this.redirectUrl = redirectUrl
    const authentication = await this.request(HTTP_POST, PATH_AUTH, null, {
      grant_type: 'authorization_code',
      client_id: this.clientId,
      client_secret: this.clientSecret,
      code: this.authorizationCode,
      redirect_uri: this.redirectUrl,
      scope: this.scope,
    })
    return this.setToken(authentication)
  }

  /**
   * Authenticate with an existing refresh token
   *
   * @param {string} refreshToken Refresh token to get a new access token
   * @return {Token} Token `{accessToken, refreshToken, expiresInTimestamp}`
   */
  async authenticateByRefreshToken(refreshToken: string): Promise<Token> {
    if (!refreshToken) {
      throw new Error('Refresh token must be provided')
    }
    this.refreshToken = refreshToken
    const authentication: NetatmoToken = await this.request(HTTP_POST, PATH_AUTH, null, {
      grant_type: 'refresh_token',
      client_id: this.clientId,
      client_secret: this.clientSecret,
      refresh_token: this.refreshToken,
    })
    return this.setToken(authentication)
  }

  /**
   * Store access and refresh tokens (you should not have to use this method)
   *
   * @param {NetatmoToken} netatmoAuthentication Netatmo API authentication result (with `access_token`, `refresh_token` and `expires_in` attributes)
   * @return {Token} Token `{accessToken, refreshToken, expiresInTimestamp}`
   */
  setToken(netatmoAuthentication: NetatmoToken): Token {
    if (!netatmoAuthentication.access_token || !netatmoAuthentication.refresh_token || !netatmoAuthentication.expires_in) {
      throw new Error('Invalid Netatmo token')
    }
    this.accessToken = netatmoAuthentication.access_token
    this.refreshToken = netatmoAuthentication.refresh_token
    this.expiresInTimestamp = Math.floor(Date.now() / 1000) + netatmoAuthentication.expires_in
    return new Token(this.accessToken, this.refreshToken, this.expiresInTimestamp)
  }

  /**
   * Check is an access token is valid and use it
   *
   * @param {string} accessToken Access token for your user
   * @param {number} expiresInTimestamp Validity timelaps as timestamp
   * @return {boolean} Access token is valid
   */
  checkAndSetAccesToken(accessToken: string | null, expiresInTimestamp: number): boolean {
    if (accessToken && expiresInTimestamp > (Date.now() / 1000)) {
      this.accessToken = accessToken
      this.expiresInTimestamp = expiresInTimestamp
      return true
    }
    return false
  }

  /**
   * Request Netatmo API
   *
   * @param {string} method HTTP method (`'GET'`, `'POST'`)
   * @param {string} path API path (example: `'/api/gethomedata'`)
   * @param {object} params Parameters send as query string
   * @param {object} data Data to post
   * @param {boolean} isRetry This is the second try for this request (default false)
   * @return {object|Array} Data in response
   */
  async request(method: 'GET' | 'POST', path: string, params: Record<string, any> | null = null, data: querystring.ParsedUrlQueryInput | null = null, isRetry: boolean = false): Promise<any> {
    const config: AxiosRequestConfig = {
      ...this.requestConfig,
      method,
      baseURL,
      url: path,
      headers: {
      },
    }
    if (data) {
      // as POST method accept only `application/x-www-form-urlencoded` content-type, transform data object into query string
      config.data = querystring.stringify(data)
    }
    if (params) {
      config.params = params
    }

    if (path !== PATH_AUTH) {
      if (!this.accessToken) {
        throw new Error('Access token must be provided')
      }
      config.headers!.Authorization = `Bearer ${this.accessToken}`
    }

    try {
      const result = await axios(config)
      return result.data
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          if (!isRetry && (error.response.status === 403 || error.response.status === 401) && error.response.data.error && error.response.data.error.code && error.response.data.error.code === 3) {
            // expired access token error, remove it and try to get a new one before a retry
            this.accessToken = null
            await this.authenticate(null, this.refreshToken, this.expiresInTimestamp)
            return await this.request(method, path, params, data, true)
          }
          if (error.response.data.error_description) {
            // bad request error
            throw new Error(`HTTP request ${path} failed: ${error.response.data.error_description} (${error.response.status})`)
          }
          if (error.response.data.error && error.response.data.error.message) {
            // standard error
            throw new Error(`HTTP request ${path} failed: ${error.response.data.error.message} (${error.response.status})`)
          }
          if (error.response.data.error) {
            // other error
            throw new Error(`HTTP request ${path} failed: ${JSON.stringify(error.response.data.error)} (${error.response.status})`)
          }
        }
      }
      if (error instanceof Error) {
        throw new Error(`HTTP request ${path} failed: ${error.message}`)
      }
      throw new Error(`HTTP request ${path} failed: ${error}`)
    }
  }

  /**
   * Retrieve user's homes and their topology
   *
   * @param {string} homeId Filter by the ID of the home you want
   * @param {number} size Number of events to retrieve. Default is 30
   * @return {Homes} User's homes
   */
  async getHomes(homeId = null, size = 30): Promise<Homes> {
    const params = {
      home_id: homeId,
      size,
    }
    return (await this.request(HTTP_GET, '/api/gethomedata', params, null)).body
  }

  /**
   * Returns all the events until the one specified in the request. This method is available for Welcome, Presence and the Smart Smoke Alarm
   *
   * @param {string} homeId Id of the home
   * @param {string} eventId Your request will retrieve all the events until this one
   * @return {EventsList} Events
   */
  async getEventsUntil(homeId: string, eventId: string): Promise<EventsList> {
    if (!homeId || !eventId) {
      throw new Error('Home id and event id must be provided')
    }
    const params = {
      home_id: homeId,
      event_id: eventId,
    }
    return (await this.request(HTTP_GET, '/api/geteventsuntil', params, null)).body
  }

  /**
   * Returns most recent events. This method is only available for Welcome.
   *
   * @param {string} homeId Id of the home
   * @param {string} personId Your request will retrieve all events of the given home until the most recent event of the given person
   * @param {number} offset Number of events to retrieve. Default is 30
   * @return {EventsList} Events
   */
  async getLastEventOf(homeId: string, personId: string, offset: number): Promise<EventsList> {
    if (!homeId || !personId) {
      throw new Error('Home id and person id must be provided')
    }
    const params = {
      home_id: homeId,
      person_id: personId,
      offset,
    }
    return (await this.request(HTTP_GET, '/api/getlasteventof', params, null)).body
  }

  /**
   * Returns previous events. This method is available for Welcome, Presence and the Smart Smoke Alarm
   *
   * @param {string} homeId Id of the home
   * @param {string} eventId Your request will retrieve all the events until this one
   * @param {number} size  Number of events to retrieve. Default is 30
   * @return {EventsList} Events
   */
  async getNextEvents(homeId: string, eventId: string, size: number): Promise<EventsList> {
    if (!homeId || !eventId) {
      throw new Error('Home id and event id must be provided')
    }
    const params = {
      home_id: homeId,
      event_id: eventId,
      size,
    }
    return (await this.request(HTTP_GET, '/api/getnextevents', params, null)).body
  }

  /**
   * Returns the snapshot associated to an event
   *
   * @param {string} imageId Id of the image (can be retrieved as "id" in "face" in Gethomedata for Welcome, or as "id" in "snapshot" in Getnextevents, Getlasteventof and Geteventsuntil)
   * @param {string} key Security key to access snapshots
   * @return {CameraImage} Picture
   */
  async getCameraPicture(imageId: string, key: string): Promise<CameraImage> {
    if (!imageId || !key) {
      throw new Error('Image id and key must be provided')
    }
    const params = {
      image_id: imageId,
      key,
    }
    return (await this.request(HTTP_GET, '/api/getcamerapicture', params, null))
  }

  /**
   * Retrieves publicly shared weather data from Outdoor Modules within a predefined area
   *
   * @param {number} latNE Latitude of the north east corner of the requested area. -85 <= lat_ne <= 85 and lat_ne>lat_sw
   * @param {number} lonNE Longitude of the north east corner of the requested area. -180 <= lon_ne <= 180 and lon_ne>lon_sw
   * @param {number} latSW Latitude of the south west corner of the requested area. -85 <= lat_sw <= 85
   * @param {number} lonSW Longitude of the south west corner of the requested area. -180 <= lon_sw <= 180
   * @param {string} requiredData To filter stations based on relevant measurements you want (e.g. rain will only return stations with rain gauges). Available data are {temperature, pressure, humidity, rain, wind}. Default is no filter
   * @param {boolean} filter True to exclude station with abnormal temperature measures. Default is false
   * @return {PublicData[]} Weather data
   */
  async getPublicData(latNE: number, lonNE: number, latSW: number, lonSW: number, requiredData: string, filter = false): Promise<PublicData[]> {
    if (!latNE || !lonNE || !latSW || !lonSW) {
      throw new Error('Latitude and Longitude must be provided')
    }
    const params = {
      lat_ne: latNE,
      lon_ne: lonNE,
      lat_sw: latSW,
      lon_sw: lonSW,
      requiredData,
      filter,
    }
    return (await this.request(HTTP_GET, '/api/getpublicdata', params, null)).body
  }

  /**
   * Returns data from a user Weather Stations (measures and device specific data)
   *
   * @param {string} deviceId Weather station mac address
   * @param {boolean} getFavorites To retrieve user's favorite weather stations. Default is false
   * @return {StationData} Devices list (`devices`) and user information (`user`)
   */
  async getStationsData(deviceId: string, getFavorites = false): Promise<StationData> {
    const params = {
      device_id: deviceId,
      get_favorites: getFavorites,
    }
    return (await this.request(HTTP_GET, '/api/getstationsdata', params, null)).body
  }

  /**
   * Retrieve data from a device or module
   *
   * @param {string} deviceId Weather station mac address
   * @param {string} moduleId module mac address
   * @param {string} scale Timelapse between two measurements (example: `max`, `30min`, `1hour`, `3hours`, `1day`, `1week`, `1month`)
   * @param {string} type type of measurements you wanna retrieve, comma separated (example: `Temperature,CO2`, `Temperature`, `CO2`, `Humidity`, `min_temp`, `max_temp`, `min_hum`, `max_hum`, ...)
   * @param {number} dateBegin Timestamp of the first measure to retrieve. Default is null
   * @param {number} dateEnd Timestamp of the last measure to retrieve. Default is null
   * @param {number} limit Maximum number of measurements (default and max are 1024)
   * @param {boolean} optimize Determines the format of the answer. Default is true. For mobile apps we recommend True and False if bandwidth isn't an issue as it is easier to parse
   * @param {boolean} realTime If scale different than max, timestamps are by default offset + scale/2. To get exact timestamps, use true. Default is false
   * @return {Measure[]} Device measure
   */
  async getMeasure(deviceId: string, moduleId: string, scale: string, type: string, dateBegin: number, dateEnd: number, limit: number, optimize: boolean, realTime: boolean): Promise<Measure[]> {
    if (!deviceId || !scale || !type) {
      throw new Error('Device id, scale and type must be provided')
    }
    const params = {
      device_id: deviceId,
      module_id: moduleId,
      scale,
      type,
      date_begin: dateBegin,
      date_end: dateEnd,
      limit,
      optimize,
      real_time: realTime,
    }
    return (await this.request(HTTP_GET, '/api/getmeasure', params, null)).body
  }
}

export { NetatmoClient, SCOPE_BASIC_CAMERA, SCOPE_FULL_CAMERA, SCOPE_FULL, SCOPE_BASIC_WEATHER }
