/* tslint:disable */
/* eslint-disable */
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

import { DashboardDataWeatherstation } from './dashboard-data-weatherstation';
import { IndoorModule } from './indoor-module';
import { OutdoorModule } from './outdoor-module';
import { Place } from './place';
import { RainModule } from './rain-module';
import { WindModule } from './wind-module';
 /**
 * 
 *
 * @export
 * @interface StationDataBodyDevices
 */
export interface StationDataBodyDevices {

    /**
     * mac address of the device
     *
     * @type {string}
     * @memberof StationDataBodyDevices
     * @example 70:ee:50:22:a3:00
     */
    id?: string;

    /**
     * date when the weather station was set up
     *
     * @type {number}
     * @memberof StationDataBodyDevices
     * @example 1435834348
     */
    dateSetup?: number;

    /**
     * timestamp of the last installation
     *
     * @type {number}
     * @memberof StationDataBodyDevices
     * @example 1435834348
     */
    lastSetup?: number;

    /**
     * type of the device
     *
     * @type {string}
     * @memberof StationDataBodyDevices
     * @example NAMain
     */
    type?: string;

    /**
     * timestamp of the last status update
     *
     * @type {number}
     * @memberof StationDataBodyDevices
     * @example 1555677748
     */
    lastStatusStore?: number;

    /**
     * name of the module
     *
     * @type {string}
     * @memberof StationDataBodyDevices
     * @example Indoor
     */
    moduleName?: string;

    /**
     * version of the software
     *
     * @type {number}
     * @memberof StationDataBodyDevices
     * @example 137
     */
    firmware?: number;

    /**
     * timestamp of the last upgrade
     *
     * @type {number}
     * @memberof StationDataBodyDevices
     * @example 1512405614
     */
    lastUpgrade?: number;

    /**
     * wifi status per Base station. (86=bad, 56=good)
     *
     * @type {number}
     * @memberof StationDataBodyDevices
     * @example 55
     */
    wifiStatus?: number;

    /**
     * true if the station connected to Netatmo cloud within the last 4 hours
     *
     * @type {boolean}
     * @memberof StationDataBodyDevices
     * @example true
     */
    reachable?: boolean;

    /**
     * true if the station is calibrating
     *
     * @type {boolean}
     * @memberof StationDataBodyDevices
     * @example false
     */
    co2Calibrating?: boolean;

    /**
     * name of the station - DO NOT USE ANYMORE - use home_name and module_name instead
     *
     * @type {string}
     * @memberof StationDataBodyDevices
     * @example Casa
     */
    stationName?: string;

    /**
     * array of data measured by the device (e.g. \"Temperature\",\"Humidity\")
     *
     * @type {Array<string>}
     * @memberof StationDataBodyDevices
     */
    dataType?: Array<string>;

    /**
     * @type {Place}
     * @memberof StationDataBodyDevices
     */
    place?: Place;

    /**
     * true if the user owns the station, false if he is invited to a station
     *
     * @type {boolean}
     * @memberof StationDataBodyDevices
     * @example true
     */
    readOnly?: boolean;

    /**
     * id of the home where the station is placed
     *
     * @type {string}
     * @memberof StationDataBodyDevices
     * @example 594xxxxxxxxxdb
     */
    homeId?: string;

    /**
     * name of the home where the station is placed
     *
     * @type {string}
     * @memberof StationDataBodyDevices
     * @example Home
     */
    homeName?: string;

    /**
     * @type {DashboardDataWeatherstation}
     * @memberof StationDataBodyDevices
     */
    dashboardData?: DashboardDataWeatherstation;

    /**
     * @type {Array<IndoorModule | OutdoorModule | RainModule | WindModule>}
     * @memberof StationDataBodyDevices
     */
    modules?: Array<IndoorModule | OutdoorModule | RainModule | WindModule>;
}
