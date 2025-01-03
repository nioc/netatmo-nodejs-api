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

import { UserWeatherAdministrative } from './user-weather-administrative';
 /**
 * 
 *
 * @export
 * @interface UserWeather
 */
export interface UserWeather {

    /**
     * @type {string}
     * @memberof UserWeather
     * @example name@mail.com
     */
    mail?: string;

    /**
     * @type {UserWeatherAdministrative}
     * @memberof UserWeather
     */
    administrative?: UserWeatherAdministrative;
}
