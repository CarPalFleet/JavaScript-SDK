import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import {apiResponseErrorHandler} from '../utility/Util';

export const resetPasswordRequestAsync = async (email) => {
  try {
    const response = await axios({
      method: 'post',
      url: endpoints.PASSWORD_RESET,
      headers: {'Content-Type': 'application/json'},
      data: {
        email,
      },
    });

    return camelize(response.data.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

export const resetPasswordAsync = async (
  token,
  email,
  password,
  confirmPassword
) => {
  try {
    const response = await axios({
      method: 'put',
      url: endpoints.PASSWORD_RESET,
      headers: {'Content-Type': 'application/json'},
      data: {
        token,
        email,
        password,
        confirmPassword,
      },
    });
    return camelize(response.data.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

export const validateResetPasswordTokenAsync = async (token) => {
  try {
    const response = await axios({
      method: 'post',
      url: endpoints.PASSWORD_RESET_TOKEN,
      headers: {'Content-Type': 'application/json'},
      data: {
        token,
      },
    });

    return camelize(response.data.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/* Not Updated yet in README */
export const getDriverJobsAsync = async (id, token, date) => {
  try {
    const response = await axios({
      method: 'get',
      url: endpoints.MY_JOBS.replace('{0}', id).replace('{1}', date),
      headers: {Authorization: token},
    });
    return camelize(response.data.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/* Not Updated yet in README */
export const getDriverLegsAsync = async (id, token, date) => {
  try {
    const response = await axios({
      method: 'get',
      url: endpoints.MY_LEGS.replace('{0}', id).replace('{1}', date),
      headers: {Authorization: token},
    });
    return camelize(response.data.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};
