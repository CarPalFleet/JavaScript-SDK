/**
 * @fileoverview This file contains all Country related functions that are triggered by a (public) User
 */

import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import { apiResponseErrorHandler } from '../utility/Util';

/**
 * Retrieve all Order Status
 * @return {object} Promise resolve/reject
 */
export const getListOfOrderStatus = async () => {
  try {
    const response = await axios.get(endpoints.API_V3.ORDER_STATUS);
    return camelize(response.data.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};
