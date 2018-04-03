import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import {apiResponseErrorHandler} from '../utility/Util';

/** Retriving whiteLabel (Logo and Background)
 * Return transaction customer's logo and Background if it is existed in database
 * @param {integer} domain # customer's webside domain name
 * @param {string} token
 * @return {object} promise (resolve/reject)
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

/** Retriving Customer's settings
 * There're 3 setting types in the setting table
 * 1. routing, 2. my-order, 3. driver-list
 * In routing type, it includes customer time line setting (15 min, 30 min, 45 min etc.)
 * Retrieve table settings from my-order type OR driver-list.
 * @param {integer} customerId
 * @param {string} type # routing, my-order, driver-list
 * @param {string} token
 * @return {object} promise (resolve/reject)
 */
export const getCustomerSettingsAsync = async (customerId, type, token) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${endpoints.CUSTOMER_SETTINGS.replace(
        '{0}',
        customerId
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

/** Retrieving User Settings
 * @param {string} token
 * @return {Promise} settingObject
 */
export const getSettingsAsync = async (token) => {
  try {
    const routeSettings = await axios({
      method: 'GET',
      url: endpoints.ROUTE_SETTING,
      headers: {Authorization: token},
    });

    return camelize(routeSettings.data);
  } catch (e) {
    return Promise.reject({
      statusCode: e.response.status,
      statusText: e.response.statusText,
    });
  }
};
