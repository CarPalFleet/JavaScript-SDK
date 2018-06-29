/**
 * @fileoverview This file contains all account related functions that are triggered by a User
 */

import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import { apiResponseErrorHandler } from '../utility/Util';

/**
 * Request reset password token
 * @param {string} email
 * @return {object} Promise resolve/reject
 */
export const resetPasswordRequestAsync = async (email) => {
  try {
    const response = await axios({
      method: 'POST',
      url: endpoints.API_V3.REQUEST_PASSWORD_RESET,
      headers: { 'Content-Type': 'application/json' },
      data: {
        email,
      },
    });
    return camelize(response);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Reset password with valid token
 * @param {string} token
 * @param {string} email
 * @param {string} password
 * @param {string} passwordConfirmation
 * @return {object} Promise resolve/reject
 */
export const resetPasswordAsync = async (
  token,
  email,
  password,
  passwordConfirmation
) => {
  try {
    const response = await axios({
      method: 'PUT',
      url: endpoints.API_V3.REQUEST_PASSWORD_RESET,
      headers: { 'Content-Type': 'application/json' },
      data: {
        token,
        email,
        password,
        passwordConfirmation,
      },
    });
    return camelize(response.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Validate Reset Password Token
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const validateResetPasswordTokenAsync = async (token) => {
  try {
    const response = await axios({
      method: 'GET',
      url: endpoints.API_V3.VALIDATE_PASSWORD_RESET_TOKEN.replace(
        '{token}',
        token
      ),
      headers: { 'Content-Type': 'application/json' },
      data: {
        token,
      },
    });
    return camelize(response.data.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};
