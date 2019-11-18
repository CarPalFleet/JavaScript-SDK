import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import { apiResponseErrorHandler } from '../utility/Util';
import { camelToSnake } from '../utility/ChangeCase';

export const updateUserAsync = async ({
  firstName,
  lastName,
  languageCode,
  token,
}) => {
  try {
    const response = await axios({
      method: 'PUT',
      url: endpoints.API_V3.USER,
      headers: { Authorization: `Bearer ${token}` },
      data: camelToSnake({
        firstName,
        lastName,
        userSettings: {
          default_language_code: languageCode,
        },
      }),
    });
    return camelize(response.data.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};
