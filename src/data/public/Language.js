import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import {apiResponseErrorHandler} from '../utility/Util';

/**
 * Retrieve all Languages
 * @return {object} Promise resolve/reject
 */
export const getLanguagesAsync = async () => {
  try {
    const response = await axios.get(endpoints.LANGUAGES);
    return camelize(response.data.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};
