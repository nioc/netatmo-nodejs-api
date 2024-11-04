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
* @interface RainModuleDashboardData
*/
export interface RainModuleDashboardData {
    /**
     * timestamp when data was measured
     *
     * @type {number}
     * @memberof RainModuleDashboardData
     * @example 1555677734
     */
    timeUtc?: number;
    /**
     * rain in mm
     *
     * @type {number}
     * @memberof RainModuleDashboardData
     * @example 0
     */
    rain?: number;
    /**
     * rain measured for past 24h(mm)
     *
     * @type {number}
     * @memberof RainModuleDashboardData
     * @example 0
     */
    sumRain24?: number;
    /**
     * rain measured for the last hour (mm)
     *
     * @type {number}
     * @memberof RainModuleDashboardData
     * @example 0
     */
    sumRain1?: number;
}
