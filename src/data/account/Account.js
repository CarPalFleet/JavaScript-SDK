/**
 * @fileoverview This file contains all account related functions that are triggered by a User
 */

import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import { apiResponseErrorHandler, customError } from '../utility/Util';

/**
 * Request reset password
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
 * Reset password with valid refresh token
 * @param {string} token
 * @param {string} email
 * @param {string} password
 * @param {string} confirmPassword
 * @return {object} Promise resolve/reject
 */
export const resetPasswordAsync = async (
  token,
  email,
  password,
  confirmPassword
) => {
  try {
    if (token === undefined) {
      throw customError({
        statusCode: 401,
        statusText: 'Unauthorized',
      });
    }
    const response = await axios({
      method: 'PUT',
      url: endpoints.API_V3.PASSWORD_RESET_WITH_TOKEN,
      headers: { 'Content-Type': 'application/json' },
      data: {
        token,
        email,
        password,
        confirmPassword,
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
      url: endpoints.API_V3.VALIDATE_PASSWORD_RESET_TOKEN,
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

/**
 * Retrieve Driver"s jobs for driver app
 * Old code for driver app (Should move to carpal driver sdk)
 * @param {int} id
 * @param {string} token
 * @param {string} date
 * @return {object} Promise resolve/reject
 * @deprecated since version 0.1.77
 */
export const getDriverJobsAsync = async (id, token, date) => {
  try {
    const response = await axios({
      method: 'GET',
      url: endpoints.MY_JOBS.replace('{0}', id).replace('{1}', date),
      headers: { Authorization: token },
    });
    return camelize(response.data.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Retrieve Driver"s legs route for driver app
 * Old code for driver app (Should move to carpal driver sdk)
 * @param {string} id
 * @param {string} token
 * @param {string} date
 * @return {object} Promise resolve/reject
 * @deprecated since version 0.1.77
 */
export const getDriverLegsAsync = async (id, token, date) => {
  try {
    const response = await axios({
      method: 'GET',
      url: endpoints.MY_LEGS.replace('{0}', id).replace('{1}', date),
      headers: { Authorization: token },
    });
    return camelize(response.data.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};
