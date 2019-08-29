import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import { apiResponseErrorHandler } from '../utility/Util';

/**
 * Retrieve Service Provider by id
 * @param {number} serviceProviderId
 * @return {object} Promise resolve/reject
 */
export const getServiceProviderAsync = async (serviceProviderId) => {
  try {
    const response = await axios.get(
      endpoints.API_V3.SERVICE_PROVIDER.replace('{0}', serviceProviderId)
    );
    return camelize(response.data.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};
