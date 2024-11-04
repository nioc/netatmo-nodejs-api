/**
 * Netatmo - Weather
 * This is a sample test for describing NETATMO's APIs with the OAS3 standard definition using swagger.
 *
 * OpenAPI spec version: 1.1.2
 * Contact: contact-api@netatmo.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/**
*
*
* @export
* @interface IndoorModuleDashboardData
*/
export interface IndoorModuleDashboardData {
    /**
     * timestamp when data was measured
     *
     * @type {number}
     * @memberof IndoorModuleDashboardData
     * @example 1555677739
     */
    timeUtc?: number;
    /**
     * temperature (in °C)
     *
     * @type {number}
     * @memberof IndoorModuleDashboardData
     * @example 23.7
     */
    temperature?: number;
    /**
     * @type {number}
     * @memberof IndoorModuleDashboardData
     * @example 967
     */
    cO2?: number;
    /**
     * humidity (in %)
     *
     * @type {number}
     * @memberof IndoorModuleDashboardData
     * @example 41
     */
    humidity?: number;
    /**
     * surface pressure in mbar
     *
     * @type {number}
     * @memberof IndoorModuleDashboardData
     * @example 997.6
     */
    pressure?: number;
    /**
     * sea-level pressure in mbar
     *
     * @type {number}
     * @memberof IndoorModuleDashboardData
     * @example 1017.4
     */
    absolutePressure?: number;
    /**
     * @type {number}
     * @memberof IndoorModuleDashboardData
     * @example 21.2
     */
    minTemp?: number;
    /**
     * maximum temperature measured
     *
     * @type {number}
     * @memberof IndoorModuleDashboardData
     * @example 27.4
     */
    maxTemp?: number;
    /**
     * @type {number}
     * @memberof IndoorModuleDashboardData
     * @example 1555631374
     */
    dateMinTemp?: number;
    /**
     * @type {number}
     * @memberof IndoorModuleDashboardData
     * @example 1555662436
     */
    dateMaxTemp?: number;
    /**
     * trend for the last 12h (up, down, stable)
     *
     * @type {string}
     * @memberof IndoorModuleDashboardData
     * @example up
     */
    tempTrend?: string;
}