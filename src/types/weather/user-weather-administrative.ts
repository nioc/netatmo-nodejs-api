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

 /**
 * 
 *
 * @export
 * @interface UserWeatherAdministrative
 */
export interface UserWeatherAdministrative {

    /**
     * user regional preferences (used for displaying date)
     *
     * @type {string}
     * @memberof UserWeatherAdministrative
     * @example fr-FR
     */
    regLocale?: string;

    /**
     * user locale
     *
     * @type {string}
     * @memberof UserWeatherAdministrative
     * @example fr-FR
     */
    lang?: string;

    /**
     * country
     *
     * @type {string}
     * @memberof UserWeatherAdministrative
     * @example FR
     */
    country?: string;

    /**
     * 0 -> metric system, 1 -> imperial system
     *
     * @type {number}
     * @memberof UserWeatherAdministrative
     * @example 0
     */
    unit?: number;

    /**
     * 0 -> kph, 1 -> mph, 2 -> ms, 3 -> beaufort, 4 -> knot
     *
     * @type {number}
     * @memberof UserWeatherAdministrative
     * @example 0
     */
    windunit?: number;

    /**
     * 0 -> mbar, 1 -> inHg, 2 -> mmHg
     *
     * @type {number}
     * @memberof UserWeatherAdministrative
     * @example 0
     */
    pressureunit?: number;

    /**
     * algorithm used to compute feel like temperature, 0 -> humidex, 1 -> heat-index
     *
     * @type {number}
     * @memberof UserWeatherAdministrative
     * @example 0
     */
    feelLikeAlgo?: number;
}