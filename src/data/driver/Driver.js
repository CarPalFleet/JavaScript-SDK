/**
 * @fileoverview This file contains all general Driver related functions that are triggered by a Driver
 */

import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import {apiResponseErrorHandler} from '../utility/Util';

/**
 * Update Driver Details by Driver
 * @param {object} filterObject
 * @param {string} token
 * @return {promise} reject/resolve
*/
export const updateDriverAsync = async (filterObject = {}, token) => {
  try {
    let paramString = convertObjectIntoURLString(filterObject);

    const response = await axios({
      method: 'POST',
      //TODO: endpoint called is incorrect
      url: `${endpoints.API_V3.DRIVER}/${paramString.replace('&', '?')}`,
      headers: {Authorization: `Bearer ${token}`},
    });

    return camelize(response.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};
