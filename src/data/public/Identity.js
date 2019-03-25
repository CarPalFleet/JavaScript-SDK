/**
 * @fileoverview This file contains all Identity related functions that are triggered by a (public) User
 */

import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import { apiResponseErrorHandler } from '../utility/Util';

/**
 * Retrieve all Identities
 * @return {object} Promise resolve/reject
 */
export const getIdentitiesAsync = async () => {
  try {
    const response = await axios.get(endpoints.API_V3.IDENTITIES);
    return camelize(response.data.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Retrieve Identity by id
 * @param {number} identityId
 * @return {object} Promise resolve/reject
 */
export const getIdentityAsync = async (identityId) => {
  try {
    const response = await axios.get(
      endpoints.API_V3.IDENTITY.replace('{0}', identityId)
    );
    return camelize(response.data.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};
