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
 /**
 * 
 *
 * @export
 * @interface EventKnownPerson
 */
export interface EventKnownPerson {

    /**
     * id of the event
     *
     * @type {string}
     * @memberof EventKnownPerson
     * @example 5715e3bf2baxxxx00000xxxx00000
     */
    id?: string;

    /**
     * type of the event
     *
     * @type {string}
     * @memberof EventKnownPerson
     * @example person
     */
    type?: string;

    /**
     * time of occurence of the event
     *
     * @type {number}
     * @memberof EventKnownPerson
     * @example 1461052342
     */
    time?: number;

    /**
     * id of the camera that detected the event
     *
     * @type {string}
     * @memberof EventKnownPerson
     * @example 70:ee:50:xx:xx:xx
     */
    cameraId?: string;

    /**
     * id of the device that detected the event
     *
     * @type {string}
     * @memberof EventKnownPerson
     * @example 70:ee:50:xx:xx:xx
     */
    deviceId?: string;

    /**
     * id of the person the event is about
     *
     * @type {string}
     * @memberof EventKnownPerson
     * @example a9552acd-d980-xxxx00000xxxx00000
     */
    personId?: string;

    /**
     * @type {Snapshot}
     * @memberof EventKnownPerson
     */
    snapshot?: Snapshot;

    /**
     * id of the video
     *
     * @type {string}
     * @memberof EventKnownPerson
     */
    videoId?: string;

    /**
     * status of the video (recording, deleted or available)
     *
     * @type {string}
     * @memberof EventKnownPerson
     * @example available
     */
    videoStatus?: string;

    /**
     * if person was considered away before being seen during this event
     *
     * @type {boolean}
     * @memberof EventKnownPerson
     * @example true
     */
    isArrival?: boolean;

    /**
     * event description
     *
     * @type {string}
     * @memberof EventKnownPerson
     * @example <b>Name</b> a été vu(e)
     */
    message?: string;
}
