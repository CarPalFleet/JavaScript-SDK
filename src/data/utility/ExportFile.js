import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import {apiResponseErrorHandler} from '../utility/Util';
import {camelToSnake} from '../utility/ChangeCase';


/** Export File
 * @param {string} type (mandatory) # driver-list or routing
 * @param {string} payload {transactionGroupId, recipientEmail, pickupDate}
 * transactionGroupId (mandatory) (integer)
 * recipientEmail (mandatory) (string)
 * pickupDate (optional) (string) #Pickupdate is need if type is routing
 * @param {string} token
 * @return {object} promist (reject/resolve)
 */
 //TODO: function needs to be tested when API is ready
export const exportFileAsync = async (type, payload, token) => {
  try {
    const response = await axios({
      method: 'GET',
      url: getExportURL(type),
      headers: {Authorization: `Bearer ${token}`},
      data: camelToSnake(payload),
    });

    return camelize(response.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/** Get export endpoint url
 * @param {string} type (mandatory)
 * @return {string} url
 */
export const getExportURL = async (type) => {
  switch (type) {
    case 'driver-list':
      return endpoints.API_V3.EXPORT_DRIVER_LIST;
    case 'routing':
      return endpoints.API_V3.EXPORT_ROUTE;
    default:
      return endpoints.API_V3.EXPORT_ROUTE;
  }
};
