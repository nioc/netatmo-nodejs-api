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
 * @interface Place
 */
export interface Place {

    /**
     * Timezone
     *
     * @type {string}
     * @memberof Place
     * @example Africa/Lagos
     */
    timezone?: string;

    /**
     * Country
     *
     * @type {string}
     * @memberof Place
     * @example EG
     */
    country?: string;

    /**
     * Altitude
     *
     * @type {number}
     * @memberof Place
     * @example 144
     */
    altitude?: number;

    /**
     * @type {Array<any>}
     * @memberof Place
     */
    location?: Array<any>;
}