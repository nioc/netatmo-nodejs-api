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
* @interface OutdoorEventlistUrlVignette
*/
export interface OutdoorEventlistUrlVignette {
    /**
     * @type {string}
     * @memberof OutdoorEventlistUrlVignette
     * @example 5715e16849c75xxxx00000000xxxxx
     */
    id?: string;
    /**
     * @type {number}
     * @memberof OutdoorEventlistUrlVignette
     * @example 1
     */
    version?: number;
    /**
     * @type {string}
     * @memberof OutdoorEventlistUrlVignette
     * @example 7ac578d05030d0e170643a787ee0a29663dxxx00000xxxxx00000
     */
    key?: string;
    /**
     * @type {string}
     * @memberof OutdoorEventlistUrlVignette
     * @example https://netatmocameraimage.blob.core.windows.net/production/1aa00000
     */
    url?: string;
}
