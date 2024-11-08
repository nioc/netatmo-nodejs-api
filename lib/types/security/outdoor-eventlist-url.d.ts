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
import { OutdoorEventlistUrlSnapshot } from './outdoor-eventlist-url-snapshot';
import { OutdoorEventlistUrlVignette } from './outdoor-eventlist-url-vignette';
/**
*
*
* @export
* @interface OutdoorEventlistUrl
*/
export interface OutdoorEventlistUrl {
    /**
     * @type {string}
     * @memberof OutdoorEventlistUrl
     */
    type?: OutdoorEventlistUrlTypeEnum;
    /**
     * @type {number}
     * @memberof OutdoorEventlistUrl
     * @example 1562781951
     */
    time?: number;
    /**
     * @type {number}
     * @memberof OutdoorEventlistUrl
     * @example 0
     */
    offset?: number;
    /**
     * @type {string}
     * @memberof OutdoorEventlistUrl
     * @example c81bcf7b-2cfg-4ac9-8455-487ed00c0000
     */
    id?: string;
    /**
     * @type {string}
     * @memberof OutdoorEventlistUrl
     * @example Animal détecté
     */
    message?: string;
    /**
     * @type {OutdoorEventlistUrlSnapshot}
     * @memberof OutdoorEventlistUrl
     */
    snapshot?: OutdoorEventlistUrlSnapshot;
    /**
     * @type {OutdoorEventlistUrlVignette}
     * @memberof OutdoorEventlistUrl
     */
    vignette?: OutdoorEventlistUrlVignette;
}
/**
 * @export
 * @enum {string}
 */
export declare enum OutdoorEventlistUrlTypeEnum {
    Human = "human",
    Animal = "animal",
    Vehicle = "vehicle"
}
