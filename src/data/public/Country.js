/**
 * @fileoverview This file contains all Country related functions that are triggered by a (public) User
 */

import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import {apiResponseErrorHandler} from '../utility/Util';

/**
 * Retrieve all countries
 * @return {object} Promise resolve/reject
 */
export const getCountriesAsync = async () => {
  try {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const response = await axios.get(endpoints.COUNTRIES);
    return camelize(response.data.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};
