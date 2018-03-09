import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import {apiResponseErrorHandler} from '../utility/Util';

export const getTokenAsync = async (email, password, clientId, secret) => {
  try {
    const response = await axios({
      method: 'post',
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

export const refreshTokenAsync = async (refreshToken, clientId, secret) => {
  try {
    const response = await axios({
      method: 'post',
      url: endpoints.OAUTH,
      headers: {'Content-Type': 'application/json'},
      data: {
        refreshToken: refreshToken,
        grantType: 'refresh_token',
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
