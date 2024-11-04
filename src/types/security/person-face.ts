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

import { PersonFaceFace } from './person-face-face';
 /**
 * 
 *
 * @export
 * @interface PersonFace
 */
export interface PersonFace {

    /**
     * @type {string}
     * @memberof PersonFace
     * @example 6c7916c7-76c3-4e4a-b401-bd5dce69b9a9
     */
    id?: string;

    /**
     * timestamp of the time the person was last seen
     *
     * @type {number}
     * @memberof PersonFace
     * @example 1563888997
     */
    lastSeen?: number;

    /**
     * true if the person is considered away from home
     *
     * @type {boolean}
     * @memberof PersonFace
     * @example false
     */
    outOfSight?: boolean;

    /**
     * @type {PersonFaceFace}
     * @memberof PersonFace
     */
    face?: PersonFaceFace;

    /**
     * if pseudo is missing, the person is unknown
     *
     * @type {string}
     * @memberof PersonFace
     * @example Surname
     */
    pseudo?: string;
}
