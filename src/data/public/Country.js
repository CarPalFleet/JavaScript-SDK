/**
 * @fileoverview This file contains all Country related functions that are triggered by a (public) User
 */

import axios from 'axios';
import adapter from 'axios/lib/adapters/http';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import {
  apiResponseErrorHandler,
  convertObjectIntoURLString,
} from '../utility/Util';

/**
 * Retrieve all countries
 * @param {object} filterObject # {sort}
 * Available sorts:
 * - country_name
 * - country_code
 * - dialing_code
 * Available orders:
 * - asc
 * - desc
 * Example: dialing_code,desc
 * @return {object} Promise resolve/reject
 */

export const getCountriesAsync = async (filterObject = {}) => {
  let paramString = convertObjectIntoURLString(filterObject);
  try {
    const response = await axios.get(
      endpoints.API_V3.COUNTRIES.replace('{0}', paramString.replace('&', '?')),
      { adapter }
    );
    return camelize(response.data.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};
