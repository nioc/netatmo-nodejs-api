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
import { OutdoorModuleDashboardData } from './outdoor-module-dashboard-data';
/**
* Weather - Weather module outdoor - getstationsdata
*
* @export
* @interface OutdoorModule
*/
export interface OutdoorModule {
    /**
     * @type {string}
     * @memberof OutdoorModule
     * @example 06:00:00:02:47:00
     */
    id?: string;
    /**
     * @type {string}
     * @memberof OutdoorModule
     * @example NAModule1
     */
    type?: string;
    /**
     * @type {string}
     * @memberof OutdoorModule
     * @example Outdoor Module
     */
    moduleName?: string;
    /**
     * Array of data measured by the device (e.g. \"Temperature\",\"Humidity\")
     *
     * @type {Array<string>}
     * @memberof OutdoorModule
     */
    dataType?: Array<string>;
    /**
     * timestamp of the last installation
     *
     * @type {number}
     * @memberof OutdoorModule
     * @example 1435834348
     */
    lastSetup?: number;
    /**
     * true if the station connected to Netatmo cloud within the last 4 hours
     *
     * @type {boolean}
     * @memberof OutdoorModule
     * @example true
     */
    reachable?: boolean;
    /**
     * @type {OutdoorModuleDashboardData}
     * @memberof OutdoorModule
     */
    dashboardData?: OutdoorModuleDashboardData;
    /**
     * version of the software
     *
     * @type {number}
     * @memberof OutdoorModule
     * @example 19
     */
    firmware?: number;
    /**
     * timestamp of the last measure update
     *
     * @type {number}
     * @memberof OutdoorModule
     * @example 1555677746
     */
    lastMessage?: number;
    /**
     * timestamp of the last status update
     *
     * @type {number}
     * @memberof OutdoorModule
     * @example 1555677746
     */
    lastSeen?: number;
    /**
     * Current radio status per module. (90=low, 60=highest)
     *
     * @type {number}
     * @memberof OutdoorModule
     * @example 31
     */
    rfStatus?: number;
    /**
     * current battery status per module
     *
     * @type {number}
     * @memberof OutdoorModule
     * @example 5148
     */
    batteryVp?: number;
    /**
     * Percentage of battery remaining (10=low)
     *
     * @type {number}
     * @memberof OutdoorModule
     * @example 58
     */
    batteryPercent?: number;
}
