import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import {apiResponseErrorHandler} from '../../utility/Util';

export const getCustomerPublicProfileSettingsAsync = async (domain) => {
  try {
    const response = await axios({
      method: 'get',
      url: endpoints.TRANSACTION_GROUP_SETTING.replace('{1}', domain),
    });
    return camelize(response.data.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};
