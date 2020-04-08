import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';

import { apiResponseErrorHandler } from '../utility/Util';

/**
 * Retrieve Order Analytic Metrics
 * @param {object} params
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const getOrderAnalyticsMetrics = async (params, token) => {
  try {
    const response = await axios({
      method: 'GET',
      url: endpoints.API_V3.ORDER_ANALYTICS_METRIC,
      headers: { Authorization: `Bearer ${token}` },
      params,
    });
    return camelize(response.data.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Retrieve Order Analytic Chart
 * @param {object} params
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const getOrderAnalyticsChart = async (params, token) => {
  try {
    const response = await axios({
      method: 'GET',
      url: endpoints.API_V3.ORDER_ANALYTICS_CHART,
      headers: { Authorization: `Bearer ${token}` },
      params,
    });
    return camelize(response.data.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};
