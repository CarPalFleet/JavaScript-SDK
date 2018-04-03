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
    const response = await axios.get(endpoints.COUNTRIES);
    return camelize(response.data.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};
