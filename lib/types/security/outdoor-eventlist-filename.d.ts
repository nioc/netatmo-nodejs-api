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
import { OutdoorEventlistFilenameSnapshot } from './outdoor-eventlist-filename-snapshot';
import { OutdoorEventlistFilenameVignette } from './outdoor-eventlist-filename-vignette';
/**
*
*
* @export
* @interface OutdoorEventlistFilename
*/
export interface OutdoorEventlistFilename {
    /**
     * @type {string}
     * @memberof OutdoorEventlistFilename
     */
    type?: OutdoorEventlistFilenameTypeEnum;
    /**
     * @type {number}
     * @memberof OutdoorEventlistFilename
     * @example 1562781951
     */
    time?: number;
    /**
     * @type {number}
     * @memberof OutdoorEventlistFilename
     * @example 0
     */
    offset?: number;
    /**
     * @type {string}
     * @memberof OutdoorEventlistFilename
     * @example c81bcf7b-2cfg-4ac9-8455-487ed00c0000
     */
    id?: string;
    /**
     * @type {string}
     * @memberof OutdoorEventlistFilename
     * @example Animal détecté
     */
    message?: string;
    /**
     * @type {OutdoorEventlistFilenameSnapshot}
     * @memberof OutdoorEventlistFilename
     */
    snapshot?: OutdoorEventlistFilenameSnapshot;
    /**
     * @type {OutdoorEventlistFilenameVignette}
     * @memberof OutdoorEventlistFilename
     */
    vignette?: OutdoorEventlistFilenameVignette;
}
/**
 * @export
 * @enum {string}
 */
export declare enum OutdoorEventlistFilenameTypeEnum {
    Human = "human",
    Animal = "animal",
    Vehicle = "vehicle"
}
