import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';

export const getCustomerPublicProfileSettingsAsync = async (domain) => {
  try {
    const response = await axios({
      method: 'get',
      url: endpoints.TRANSACTION_GROUP_SETTING.replace('{1}', domain),
    });
    return camelize(response.data.data);
  } catch (e) {
    let rejectObj = {};
    if (e.response) {
      rejectObj = {
        statusCode: e.response.status,
        statusText: e.response.statusText,
      };
    } else {
      /* Catch error of e.response
          That will be undefined when status code is 403 Forbidden */
      rejectObj = { statusCode: 403, statusText: 'Forbidden' };
    }

    return Promise.reject(rejectObj);
  }
};
