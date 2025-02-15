/* tslint:disable */
/* eslint-disable */
/**
 * Legrand - Netatmo - BTicino, Home + Security
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
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
 * @interface SmokeDetector
 */
export interface SmokeDetector {

    /**
     * id of the module
     *
     * @type {string}
     * @memberof SmokeDetector
     * @example 70:ee:50:11:xx:xx
     */
    id?: string;

    /**
     * type of the module
     *
     * @type {string}
     * @memberof SmokeDetector
     * @example NSD
     */
    type?: string;

    /**
     * timestamp of the last installation
     *
     * @type {number}
     * @memberof SmokeDetector
     * @example 1549629699
     */
    lastSetup?: number;

    /**
     * name of the module
     *
     * @type {string}
     * @memberof SmokeDetector
     * @example NameSmoke
     */
    name?: string;
}
