/**
 * @fileoverview This file contains all Settings related functions that are triggered by a (public) User
 */

import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import {apiResponseErrorHandler} from '../utility/Util';

/**
 * Retrieve Customer's public profile settings
 * @param {string} domain
 * @return {object} Promise resolve/reject
 */
export const getCustomerPublicProfileSettingsAsync = async (domain) => {
  try {
    const response = await axios({
      method: 'GET',
      url: endpoints.TRANSACTION_GROUP_SETTING.replace('{1}', domain),
    });
    return camelize(response.data.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};
