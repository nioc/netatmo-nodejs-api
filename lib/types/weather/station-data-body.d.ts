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
import { StationDataBodyDevices } from './station-data-body-devices';
import { UserWeather } from './user-weather';
/**
*
*
* @export
* @interface StationDataBody
*/
export interface StationDataBody {
    /**
     * @type {Array<StationDataBodyDevices>}
     * @memberof StationDataBody
     */
    devices?: Array<StationDataBodyDevices>;
    /**
     * @type {UserWeather}
     * @memberof StationDataBody
     */
    user?: UserWeather;
}
