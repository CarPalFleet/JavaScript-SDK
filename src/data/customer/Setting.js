/**
 * @fileoverview This file contains all Settings related functions that are triggered by a Customer
 */

import axios from "axios";
import endpoints from "../Endpoint";
import camelize from "camelize";
import {
  apiResponseErrorHandler,
  convertObjectIntoURLString,
} from "../utility/Util";

/** Retrieve Customer"s (Logo and Background)
 * Return customer"s logo and background image if it exists in database
 * @param {integer} domain # customer"s webside domain name
 * @param {string} token
 * @return {object} promise (resolve/reject)
 * @deprecated since version 0.1.77
 */
export const getCustomerPreferenceSettingsAsync = async (domain, token) => {
  try {
    const response = await axios({
      method: "GET",
      url: endpoints.TRANSACTION_GROUP_SETTING.replace("{1}", domain),
      headers: {Authorization: token},
    });
    return camelize(response.data.data);
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
      ""
    );
    const routeSetting = await axios({
      method: "GET",
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

/** Retrieve Customer"s Settings
 * @param {string} token
 * @return {Promise} settingObject
 */
export const getCustomerSettingsAsync = async (token) => {
  try {
    const CustomerSettings = await axios({
      method: "GET",
      url: endpoints.CUSTOMER_SETTINGS,
      headers: {Authorization: token},
    });

    return camelize(CustomerSettings.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

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
    const query = paramsString ? `/?${paramsString}` : "";
    const CustomerSettingsShow = await axios({
      method: "GET",
      url: `${endpoints.CUSTOMER_SETTINGS_SHOW.replace(
        "{0}",
        customerId
      )}${query}`,
      headers: {Authorization: token},
    });
    return {
      ...CustomerSettingsShow,
      data: camelize(CustomerSettingsShow.data),
    };
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};
