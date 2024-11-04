import { AxiosRequestConfig } from 'axios';
import querystring from 'querystring';
import type { PublicData, Measure, StationData, Homes, EventsList, CameraImage } from './types/index';
/**
 * Basic scope for weather station
 */
declare const SCOPE_BASIC_WEATHER = "read_station";
/**
 * Basic scope for camera
 */
declare const SCOPE_BASIC_CAMERA = "read_camera write_camera read_presence";
/**
 * Full scope for camera, end user has to provide an explicit consent with autorization code flow
 */
declare const SCOPE_FULL_CAMERA = "read_camera write_camera access_camera read_presence access_presence";
/**
 * Full scope for camera and weather station, end user has to provide an explicit consent with autorization code flow
 */
declare const SCOPE_FULL = "read_station read_camera write_camera access_camera read_presence access_presence";
type NetatmoToken = {
    access_token: string;
    refresh_token: string;
    expires_in: number;
};
declare class Token {
    accessToken: string | null;
    refreshToken: string | null;
    expiresInTimestamp: number;
    /**
     * Create an instance of Token
     *
     * @param {string} accessToken Access token for your user
     * @param {string} refreshToken Refresh token to get a new access token once it has expired
     * @param {number} expiresInTimestamp Validity timelaps as timestamp
     * @return {Token} A new instance of Token
     */
    constructor(accessToken: string | null, refreshToken: string | null, expiresInTimestamp: number);
}
declare class NetatmoClient {
    clientId: string;
    clientSecret: string;
    scope: string;
    requestConfig: {};
    authorizationCode: string | null;
    redirectUrl: string | null;
    state: string | null;
    refreshToken: string | null;
    accessToken: string | null;
    expiresInTimestamp: number;
    /**
     * Create an instance of Netatmo client
     *
     * @param {string} clientId Your app client_id
     * @param {string} clientSecret Your app client_secret
     * @param {string} scope Scopes space separated (example: `'read_station read_camera write_camera read_presence'`)
     * @param {AxiosRequestConfig} requestConfig HTTP request configuration (see https://axios-http.com/docs/req_config)
     * @return {NetatmoClient} A new instance of Netatmo client
     */
    constructor(clientId: string, clientSecret: string, scope: string, requestConfig?: AxiosRequestConfig);
    /**
     * Authenticate with access token or refresh token
     *
     * @param {string} accessToken Access token for your user
     * @param {string} refreshToken Refresh token to get a new access token
     * @param {number} expiresInTimestamp Validity timelaps as timestamp
     * @return {Token} Token `{accessToken, refreshToken, expiresInTimestamp}`
     */
    authenticate(accessToken?: string | null, refreshToken?: string | null, expiresInTimestamp?: number): Promise<Token>;
    /**
     * Return url for authorize code grant
     *
     * @param {string} redirectUrl Callback URL of your application
     * @param {string} statePrefix Arbitrary string added to state
     * @return {string} Url to request as POST method for authorize code grant flow
     */
    getAuthorizeUrl(redirectUrl?: string | null, statePrefix?: string): string;
    /**
     * Authenticate with authorization code
     *
     * @param {string} authorizationCode Authorization code provided after user authorize your app
     * @param {string} redirectUrl Callback URL of your application (must be the same as the one provided in authorize url)
     * @param {string} state Arbitrary string (prevent Cross-site Request Forgery)
     * @return {Token} Token `{accessToken, refreshToken, expiresInTimestamp}`
     */
    authenticateByAuthorizationCode(authorizationCode: string, redirectUrl: string, state: string): Promise<Token>;
    /**
     * Authenticate with an existing refresh token
     *
     * @param {string} refreshToken Refresh token to get a new access token
     * @return {Token} Token `{accessToken, refreshToken, expiresInTimestamp}`
     */
    authenticateByRefreshToken(refreshToken: string): Promise<Token>;
    /**
     * Store access and refresh tokens (you should not have to use this method)
     *
     * @param {NetatmoToken} netatmoAuthentication Netatmo API authentication result (with `access_token`, `refresh_token` and `expires_in` attributes)
     * @return {Token} Token `{accessToken, refreshToken, expiresInTimestamp}`
     */
    setToken(netatmoAuthentication: NetatmoToken): Token;
    /**
     * Check is an access token is valid and use it
     *
     * @param {string} accessToken Access token for your user
     * @param {number} expiresInTimestamp Validity timelaps as timestamp
     * @return {boolean} Access token is valid
     */
    checkAndSetAccesToken(accessToken: string | null, expiresInTimestamp: number): boolean;
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
    request(method: 'GET' | 'POST', path: string, params?: Record<string, any> | null, data?: querystring.ParsedUrlQueryInput | null, isRetry?: boolean): Promise<any>;
    /**
     * Retrieve user's homes and their topology
     *
     * @param {string} homeId Filter by the ID of the home you want
     * @param {number} size Number of events to retrieve. Default is 30
     * @return {Homes} User's homes
     */
    getHomes(homeId?: null, size?: number): Promise<Homes>;
    /**
     * Returns all the events until the one specified in the request. This method is available for Welcome, Presence and the Smart Smoke Alarm
     *
     * @param {string} homeId Id of the home
     * @param {string} eventId Your request will retrieve all the events until this one
     * @return {EventsList} Events
     */
    getEventsUntil(homeId: string, eventId: string): Promise<EventsList>;
    /**
     * Returns most recent events. This method is only available for Welcome.
     *
     * @param {string} homeId Id of the home
     * @param {string} personId Your request will retrieve all events of the given home until the most recent event of the given person
     * @param {number} offset Number of events to retrieve. Default is 30
     * @return {EventsList} Events
     */
    getLastEventOf(homeId: string, personId: string, offset: number): Promise<EventsList>;
    /**
     * Returns previous events. This method is available for Welcome, Presence and the Smart Smoke Alarm
     *
     * @param {string} homeId Id of the home
     * @param {string} eventId Your request will retrieve all the events until this one
     * @param {number} size  Number of events to retrieve. Default is 30
     * @return {EventsList} Events
     */
    getNextEvents(homeId: string, eventId: string, size: number): Promise<EventsList>;
    /**
     * Returns the snapshot associated to an event
     *
     * @param {string} imageId Id of the image (can be retrieved as "id" in "face" in Gethomedata for Welcome, or as "id" in "snapshot" in Getnextevents, Getlasteventof and Geteventsuntil)
     * @param {string} key Security key to access snapshots
     * @return {CameraImage} Picture
     */
    getCameraPicture(imageId: string, key: string): Promise<CameraImage>;
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
    getPublicData(latNE: number, lonNE: number, latSW: number, lonSW: number, requiredData: string, filter?: boolean): Promise<PublicData[]>;
    /**
     * Returns data from a user Weather Stations (measures and device specific data)
     *
     * @param {string} deviceId Weather station mac address
     * @param {boolean} getFavorites To retrieve user's favorite weather stations. Default is false
     * @return {StationData} Devices list (`devices`) and user information (`user`)
     */
    getStationsData(deviceId: string, getFavorites?: boolean): Promise<StationData>;
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
    getMeasure(deviceId: string, moduleId: string, scale: string, type: string, dateBegin: number, dateEnd: number, limit: number, optimize: boolean, realTime: boolean): Promise<Measure[]>;
}
export { NetatmoClient, SCOPE_BASIC_CAMERA, SCOPE_FULL_CAMERA, SCOPE_FULL, SCOPE_BASIC_WEATHER };
