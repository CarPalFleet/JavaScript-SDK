import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';

export const getCustomerPreferenceSettingsAsync = async (domain, token) => {
  try {
    const response = await axios({
      method: 'get',
      url: endpoints.TRANSACTION_GROUP_SETTING.replace('{1}', domain),
      headers: {Authorization: token},
    });
    return camelize(response.data.data);
  } catch (e) {
    handleAsyncError(e);
  }
};

export const fetchMyOrderColumNames = async (type, customerId, token) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${endpoints.MY_ORDER_COLUMN_NAMES.replace(
        '{0}',
        customerId
      )}?type=${type}`,
      headers: {Authorization: token},
    });

    return camelize(response.data);
  } catch (e) {
    handleAsyncError(e);
  }
};

function handleAsyncError(e) {
  let rejectObj = {};
  if (e.response) {
    rejectObj = {
      statusCode: e.response.status,
      statusText: e.response.statusText,
    };
  } else {
    /* Catch error of e.response
    That will be undefined when status code is 403 Forbidden */
    rejectObj = {statusCode: 403, statusText: 'Forbidden'};
  }
  return Promise.reject(rejectObj);
}
