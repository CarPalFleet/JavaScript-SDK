/**
 * @fileoverview This file contains all Settings related functions that are triggered by a Customer
 */

import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import { apiResponseErrorHandler } from '../utility/Util';
import { camelToSnake } from '../utility/ChangeCase';

/** Retrieve Customer"s Settings
 * @param {string} token
 * @return {Promise} settings object
 */

export const showCustomerSettingsAsync = async (token) => {
  try {
    const CustomerSettingsShow = await axios({
      method: 'GET',
      url: endpoints.API_V3.CUSTOMER_SETTINGS_SHOW,
      headers: { Authorization: `Bearer ${token}` },
    });
    return {
      ...CustomerSettingsShow,
      data: camelize(CustomerSettingsShow.data),
    };
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/** Updates the customer's settings.
 * @param {string} token
 * @param {int} id
 * @param {Object} data
 * @return {Promise} settings object
 */

export const putCustomerSettings = async (token, id, data) => {
  try {
    const response = await axios({
      method: 'PUT',
      url: endpoints.API_V3.CUSTOMER_SETTINGS.replace('{0}', id),
      headers: { Authorization: `Bearer ${token}` },
      data: camelToSnake(data),
    });
    return {
      ...response,
      data: camelize(response.data),
    };
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/** Retrieve Dispatch Mode
 * @return {Promise} settings object
 */
export const getDispatchMode = async () => {
  try {
    const response = await axios({
      method: 'GET',
      url: endpoints.API_V3.DISPATCH_MODE,
    });
    return {
      data: camelize(response.data),
    };
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/** Retrieve Dispatch Type
 * @return {Promise} settings object
 */
export const getDispatchType = async () => {
  try {
    const response = await axios({
      method: 'GET',
      url: endpoints.API_V3.DISPATCH_TYPE,
    });
    return {
      data: camelize(response.data),
    };
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};
