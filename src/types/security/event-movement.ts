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

import { Snapshot } from './snapshot';
import { Vignette } from './vignette';
 /**
 * 
 *
 * @export
 * @interface EventMovement
 */
export interface EventMovement {

    /**
     * id of the event
     *
     * @type {string}
     * @memberof EventMovement
     * @example 5715e3bf2baxxxx00000xxxx00000
     */
    id?: string;

    /**
     * type of the event
     *
     * @type {string}
     * @memberof EventMovement
     * @example movement
     */
    type?: string;

    /**
     * time of occurence of the event
     *
     * @type {number}
     * @memberof EventMovement
     * @example 1461052342
     */
    time?: number;

    /**
     * id of the camera that detected the event
     *
     * @type {string}
     * @memberof EventMovement
     * @example 70:ee:50:xx:xx:xx
     */
    cameraId?: string;

    /**
     * id of the device that detected the event
     *
     * @type {string}
     * @memberof EventMovement
     * @example 70:ee:50:xx:xx:xx
     */
    deviceId?: string;

    /**
     * @type {Snapshot}
     * @memberof EventMovement
     */
    snapshot?: Snapshot;

    /**
     * @type {Vignette}
     * @memberof EventMovement
     */
    vignette?: Vignette;

    /**
     * @type {string}
     * @memberof EventMovement
     * @example fd2b25c5-cba8-4b8b-9188-92a95f9d805e
     */
    videoId?: string;

    /**
     * status of the video (recording, deleted or available)
     *
     * @type {string}
     * @memberof EventMovement
     * @example available
     */
    videoStatus?: string;

    /**
     * @type {string}
     * @memberof EventMovement
     * @example <b>Mouvement</b> détecté
     */
    message?: string;
}
