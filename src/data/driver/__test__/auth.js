import axios from 'axios';
import CONFIG from './endpoints';
import camelize from 'camelize';
import {apiResponseErrorHandler} from '../utility/Util';

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
    return apiResponseErrorHandler(e);
  }
};
