/**
 * @fileoverview This file contains all Settings related functions that are triggered by a Customer
 */

import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import { apiResponseErrorHandler } from '../utility/Util';

/** Retrieve Customer"s Settings
 * @param {string} token
 * @return {Promise} settings object
 */

export const showCustomerSettingsAsync = async (token) => {
  try {
    const CustomerSettingsShow = await axios({
      method: 'GET',
      url: endpoints.API_V3.CUSTOMER_SETTINGS_SHOW,
      headers: { Authorization: token },
    });
    return {
      ...CustomerSettingsShow,
      data: camelize(CustomerSettingsShow.data),
    };
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};
