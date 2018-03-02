import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';

export const resetPasswordRequestAsync = async (email) => {
  try {
    const response = await axios({
      method: 'post',
      url: endpoints.PASSWORD_RESET,
      headers: { 'Content-Type': 'application/json' },
      data: {
        email,
      },
    });

    return toCamelCase(response.data.data);
  } catch (e) {
    return Promise.reject({
      statusCode: e.response.status,
      statusText: e.response.statusText,
    });
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
      headers: { 'Content-Type': 'application/json' },
      data: {
        token,
        email,
        password,
        confirmPassword,
      },
    });
    return camelize(response.data.data);
  } catch (e) {
    return Promise.reject({
      statusCode: e.response.status,
      statusText: e.response.statusText,
    });
  }
};

export const validateResetPasswordTokenAsync = async (token) => {
  try {
    const response = await axios({
      method: 'post',
      url: endpoints.PASSWORD_RESET_TOKEN,
      headers: { 'Content-Type': 'application/json' },
      data: {
        token,
      },
    });

    return toCamelCase(response.data.data);
  } catch (e) {
    return Promise.reject({
      statusCode: e.response.status,
      statusText: e.response.statusText,
    });
  }
};

/* Not Updated yet in README */
export const getDriverJobsAsync = async (id, token, date) => {
  try {
    const response = await axios({
      method: 'get',
      url: endpoints.MY_JOBS.replace('{0}', id).replace('{1}', date),
      headers: { Authorization: token },
    });
    return camelize(response.data.data);
  } catch (e) {
    return Promise.reject({
      statusCode: e.response.status,
      statusText: e.response.statusText,
    });
  }
};

/* Not Updated yet in README */
export const getDriverLegsAsync = async (id, token, date) => {
  try {
    const response = await axios({
      method: 'get',
      url: endpoints.MY_LEGS.replace('{0}', id).replace('{1}', date),
      headers: { Authorization: token },
    });
    return camelize(response.data.data);
  } catch (e) {
    return Promise.reject({
      statusCode: e.response.status,
      statusText: e.response.statusText,
    });
  }
};
