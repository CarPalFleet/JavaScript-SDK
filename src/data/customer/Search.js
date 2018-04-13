/**
 * @fileoverview This file contains all Search related functions that are triggered by a Customer
 */

import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import {
  apiResponseErrorHandler,
  convertObjectIntoURLString,
} from '../utility/Util';

/** Elastic Search
 * @param {string} keyword
 * @param {object} scope
 * @param {int} fuzzy
 * @param {int} fuzziness
 * @param {string} token
 * @return {object} Promise (resolve/reject)
 */
export const searchAsync = async (
  keyword,
  scope,
  fuzzy = true,
  fuzziness = 1,
  token
) => {
  try {
    const paramString = convertObjectIntoURLString({
      keyword,
      fuzzy,
      fuzziness,
      scope,
    });
    const response = await axios({
      method: 'GET',
      url: `${endpoints.ELASTIC_SEARCH}${paramString.replace('&', '?')}`,
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
 * @param {string} pickupDate (optional) # yyyy-mm-dd
 * @param {string} token
 * @return {object} response
 */
export const generalSearch = async (
  customerId,
  fuzzy = false,
  fuzziness = 1,
  keywords,
  scopes,
  pickupDate = '',
  token
) => {
  try {
    const response = await axios({
      method: 'POST',
      url: endpoints.GENERAL_SEARCH,
      headers: {Authorization: token},
      data: {
        customerId,
        fuzzy,
        fuzziness,
        keywords,
        scopes,
        pickupDate,
      },
    });
    return camelize(response.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};
