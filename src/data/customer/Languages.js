import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import { apiResponseErrorHandler } from '../utility/Util';

/**
 * Retrieve Service Provider by id
 * @return {object} Promise resolve/reject
 */
export const getLanguages = async () => {
  try {
    const response = await axios({
      method: 'GET',
      url: endpoints.API_V3.LANGUAGES,
    });
    return camelize(response.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};
