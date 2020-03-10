import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import { apiResponseErrorHandler } from '../utility/Util';

/**
 * Retrieve Service Provider by id
 * @param {number} serviceProviderId
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const getServiceProviderAsync = async (serviceProviderId, token) => {
  try {
    const response = await axios({
      method: 'GET',
      url: endpoints.API_V3.SERVICE_PROVIDER.replace('{0}', serviceProviderId),
      headers: { Authorization: `Bearer ${token}` },
    });
    return camelize(response.data.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Search Service Provider customers
 * @param {object} params
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const searchServiceProviderCustomerAsync = async (params, token) => {
  try {
    const response = await axios({
      method: 'GET',
      url: endpoints.API_V3.SERVICE_PROVIDER_CUSTOMER_SEARCH,
      headers: { Authorization: `Bearer ${token}` },
      params,
    });
    return camelize(response.data.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Get list of drivers services
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const getListOfDriverService = async (token) => {
  try {
    const res = await axios({
      method: 'GET',
      url: endpoints.API_V3.SERVICE_PROVIDER_DRIVER_SERVICES,
      headers: { Authorization: `Bearer ${token}` },
    });
    return camelize(res.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};
