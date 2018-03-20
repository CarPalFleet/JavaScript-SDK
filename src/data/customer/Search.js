import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import {apiResponseErrorHandler} from '../utility/Util';

/** Elastic Search
 * @param {string} keywords
 * @param {object} scope
 * @param {int} fuzzy
 * @param {int} fuzziness
 * @param {string} token
 * @return {object} Promise (resolve/reject)
 */
export const searchAsync = async (
  keywords,
  scope,
  fuzzy = true,
  fuzziness = 1,
  token
) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${
        endpoints.ELASTIC_SEARCH
      }?keyword=${keywords}&fuzzy=${fuzzy}&fuzziness=${fuzziness}&scope=${scope}`,
      headers: {Authorization: token},
    });
    return camelize(response.data.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/** General Search
 * @param {int} customerId
 * @param {boolean} fuzzy
 * @param {int} fuzziness
 * @param {string} keywords
 * @param {object} scopes
 * There are 3 scopes # drivers, jobs, orders.
 * Can search any of these scope
 * Example of scopes object
   scopes = {
       "drivers" : ["driverId","driverName"],
       "jobs" : ["orderId"],
       "orders" : ["groupingLocationId"]
   }
 * @param {string} token
 * @return {object} response
 */
export const generalSearch = async (
  customerId,
  fuzzy = false,
  fuzziness = 1,
  keywords,
  scopes,
  token
) => {
  try {
    const response = await axios({
      method: 'POST',
      url: endpoints.GENERAL_SEARCH,
      headers: {Authorization: token},
      data: {customerId, fuzzy, fuzziness, keywords, scopes},
    });
    return camelize(response.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

export const driverSearch = async (
  keywords,
  scope,
  fuzzy = true,
  fuzziness = 1,
  token
) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${
        endpoints.DRIVER_LIST_ELASTIC_SEARCH
      }?keyword=${keywords}&fuzzy=${fuzzy}&fuzziness=${fuzziness}&scope=${scope}`,
      headers: {Authorization: token},
    });
    return camelize(response.data.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};
