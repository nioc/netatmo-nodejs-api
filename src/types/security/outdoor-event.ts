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

import { OutdoorEventlistFilename } from './outdoor-eventlist-filename';
import { OutdoorEventlistUrl } from './outdoor-eventlist-url';
 /**
 * first event from list (offset:0) has picture by url, nexts are filename.
 *
 * @export
 * @interface OutdoorEvent
 */
export interface OutdoorEvent {

    /**
     * @type {string}
     * @memberof OutdoorEvent
     * @example 5715e3bf2baxxxx00000xxxx00000
     */
    id?: string;

    /**
     * @type {string}
     * @memberof OutdoorEvent
     * @example outdoor
     */
    type?: string;

    /**
     * @type {number}
     * @memberof OutdoorEvent
     * @example 1461052342
     */
    time?: number;

    /**
     * @type {string}
     * @memberof OutdoorEvent
     * @example 70:ee:50:xx:xx:xx
     */
    moduleId?: string;

    /**
     * @type {string}
     * @memberof OutdoorEvent
     */
    videoId?: string;

    /**
     * status of the video (recording, deleted or available)
     *
     * @type {string}
     * @memberof OutdoorEvent
     * @example available
     */
    videoStatus?: string;

    /**
     * @type {Array<OutdoorEventlistUrl | OutdoorEventlistFilename>}
     * @memberof OutdoorEvent
     */
    subevents?: Array<OutdoorEventlistUrl | OutdoorEventlistFilename>;
}