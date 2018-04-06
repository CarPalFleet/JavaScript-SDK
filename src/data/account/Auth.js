import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import {apiResponseErrorHandler} from '../utility/Util';

/**
 * Get Token
 * @param {string} email
 * @param {string} password
 * @param {string} clientId
 * @param {string} secret
 * @return {object} Promise resolve/reject
 */
export const getTokenAsync = async (email, password, clientId, secret) => {
  try {
    const response = await axios({
      method: 'POST',
      url: endpoints.OAUTH,
      headers: {'Content-Type': 'application/json'},
      data: {
        username: email,
        password,
        grantType: 'password',
        clientId,
        clientSecret: secret,
        scope: 'full-access',
      },
    });
    return camelize(response.data.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Refresh token
 * @param {string} refreshToken
 * @param {string} clientId
 * @param {string} secret
 * @return {object} Promise resolve/reject
 */
export const refreshTokenAsync = async (refreshToken, clientId, secret) => {
  try {
    const response = await axios({
      method: 'POST',
      url: endpoints.OAUTH,
      headers: {'Content-Type': 'application/json'},
      data: {
        refreshToken,
        grantType: 'refresh_token',
        clientId,
        clientSecret: secret,
        scope: '',
      },
    });

    return camelize(response.data.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};
