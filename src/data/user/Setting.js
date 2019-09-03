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

export const getUserSettingMyOrdersColumnAsync = async (token) => {
  try {
    const res = await axios({
      method: 'GET',
      url: endpoints.API_V3.USER_SETTING_MY_ORDERS_COLUMN,
      headers: { Authorization: `Bearer ${token}` },
    });
    return {
      ...res,
      data: camelize(res.data.data),
    };
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/** Updates the customer's settings.
 * @param {Object} data
 * @param {string} token
 * @return {Promise} settings object
 */

export const putUserSettingMyOrdersColumn = async (data, token) => {
  try {
    const response = await axios({
      method: 'PUT',
      url: endpoints.API_V3.USER_SETTING_MY_ORDERS_COLUMN,
      headers: { Authorization: `Bearer ${token}` },
      data: camelToSnake(data),
    });
    return {
      ...response,
      data: camelize(response.data.data),
    };
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};
