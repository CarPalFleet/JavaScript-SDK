import axios from 'axios';

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

function handleAsyncError(e) {
  return Promise.reject({
    statusCode: e.response.status,
    statusText: e.response.statusText,
  });
}
