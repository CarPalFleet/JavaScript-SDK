/**
 * @fileoverview This file contains all Settings related functions that are triggered by a Customer
 */

import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import {apiResponseErrorHandler} from '../utility/Util';

/** Retrieve Customer's (Logo and Background)
 * Return customer's logo and background image if it exists in database
 * @param {integer} domain # customer's webside domain name
 * @param {string} token
 * @return {object} promise (resolve/reject)
 * @deprecated since version 0.1.77
 */
export const getCustomerPreferenceSettingsAsync = async (domain, token) => {
  try {
    const response = await axios({
      method: 'GET',
      url: endpoints.TRANSACTION_GROUP_SETTING.replace('{1}', domain),
      headers: {Authorization: token},
    });
    return camelize(response.data.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/** Retrieve User's settings
 * There're 3 setting types in the setting table
 * 1. routing, 2. my-order, 3. driver-list
 * In routing type, it includes user time line setting (15 min, 30 min, 45 min etc.)
 * Retrieve table settings from my-order type OR driver-list.
 * @param {integer} userId
 * @param {string} type # routing, my-order, driver-list
 * @param {string} token
 * @return {object} promise (resolve/reject)
 */
 // TODO: this function should be moved to a /User directory
export const getUserSettingsAsync = async (userId, type, token) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${endpoints.USER_SETTINGS.replace(
        '{0}',
        // TODO: change customerId to userId on API wrapper
        userId
      )}?type=${type}`,
      headers: {Authorization: token},
    });

    return camelize(response.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/** Retrieving User Setting for specific setting
 * @param {Object} filterObject {identityId, productTypeId, transactionGroupId}
 * @param {string} token
 * @return {Promise} settingObject
 * @deprecated since version 0.1.77
 */
export const getSettingAsync = async (settingId, filterObject, token) => {
  try {
    let paramString = Object.keys(filterObject).reduce(
      (str, key) => (str += `&${key}=${filterObject[key]}`),
      ''
    );
    const routeSetting = await axios({
      method: 'GET',
      url: `${endpoints.ROUTE_SETTING}/${settingId}`,
      headers: {Authorization: token},
    });

    return camelize(routeSetting.data);
  } catch (e) {
    return Promise.reject({
      statusCode: e.response.status,
      statusText: e.response.statusText,
    });
  }
};

/** Retrieve Customer's Settings
 * @param {string} token
 * @return {Promise} settingObject
 */
export const getCustomerSettingsAsync = async (token) => {
  try {
    const CustomerSettings = await axios({
      method: 'GET',
      url: endpoints.CUSTOMER_SETTINGS,
      headers: {Authorization: token},
    });

    return camelize(CustomerSettings.data);
  } catch (e) {
    return Promise.reject({
      statusCode: e.response.status,
      statusText: e.response.statusText,
    });
  }
};
