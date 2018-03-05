import axios from 'axios';
import CONFIG from './endpoints';
import camelize from 'camelize';

export const getDriverTokenAsync = async (email, password) => {
  try {
    const response = await axios({
      url: `${CONFIG.baseURL}/v2/authenticate`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {email, password},
    });

    return camelize(response.data);
  } catch (e) {
    handleAsyncError(e);
  }
};

/**
 * Handle Error
 * @param {object} e
 * @return {object} Promise reject with statusCode and statusText
 */
function handleAsyncError(e) {
  return Promise.reject({
    statusCode: e.response.status,
    statusText: e.response.statusText,
  });
}
