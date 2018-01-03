import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';

export const getNotificationsAsync = async (all = false, customerId, token) => {
  let response = await axios({
    method: 'GET',
    url: `${endpoints.NOTIFICATIONS.replace('{0}', customerId)}?all=${all}`,
    header: {'Authorization': token}
  });

  return camelize(response);
}

getNotificationsAsync().catch(handleAsyncError);

export const deleteNotificationAsync = async (notificationId, customerId, token) => {
  let response = await axios({
    method: 'DELETE',
    url: `${endpoints.NOTIFICATIONS.replace('{0}', customerId)}/${notificationId}`,
    header: {'Authorization': token}
  });

  return camelize(response);
}

deleteNotificationAsync().catch(handleAsyncError);

function handleAsyncError(e) {
  return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
}
