/**
 * @fileoverview This file contains all Settings related functions that are triggered by a Customer
 */

import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import {
  apiResponseErrorHandler,
  convertObjectIntoURLString,
} from '../utility/Util';

/** Retrieve Customer"s Settings (reduced)
 * @param {string} token
 * @param {int} customerId
 * @param {Object} payload {identityId, transactionGroupId}
 * @return {Promise} settings object
 */
export const showCustomerSettingsAsync = async (
  token,
  customerId,
  payload = {}
) => {
  try {
    const paramsString = convertObjectIntoURLString(payload);
    const query = paramsString ? `/?${paramsString}` : '';
    const CustomerSettingsShow = await axios({
      method: 'GET',
      url: `${endpoints.CUSTOMER_SETTINGS_SHOW.replace(
        '{0}',
        customerId
      )}${query}`,
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
