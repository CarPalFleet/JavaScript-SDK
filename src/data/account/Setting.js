/**
 * @fileoverview This file contains all Settings related functions that are triggered by a User
 */

import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import {apiResponseErrorHandler} from '../utility/Util';

/** Retrieve User's settings
 * There are 3 setting types in the setting table
 * 1. routing, 2. my-order, 3. driver-list
 * In routing type, it includes user time line setting (15 min, 30 min, 45 min etc.)
 * Retrieve table settings from my-order type OR driver-list.
 * @param {integer} userId
 * @param {string} type # routing, my-order, driver-list
 * @param {string} token
 * @return {object} promise (resolve/reject)
 */
export const getUserSettingsAsync = async (userId, type, token) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${endpoints.USER_SETTINGS.replace(
        '{0}',
        userId
      )}?type=${type}`,
      headers: {Authorization: token},
    });
    return camelize(response.data);
  } catch (e) {

    return apiResponseErrorHandler(e);
  }
};
