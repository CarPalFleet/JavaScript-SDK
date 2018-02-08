import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';

export const getNotificationsAsync = async (all = false, customerId, token) => {
  try {
    let response = await axios({
      method: 'GET',
      url: `${endpoints.NOTIFICATIONS.replace('{0}', customerId)}?all=${all}`,
      headers: {'Authorization': token}
    });

    return camelize(response.data);
  } catch (e) {
    return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
  }
}

export const deleteNotificationAsync = async (notificationId, customerId, token) => {
  try {
    let response = await axios({
      method: 'DELETE',
      url: `${endpoints.NOTIFICATIONS.replace('{0}', customerId)}/${notificationId}`,
      headers: {'Authorization': token}
    });

    return camelize(response);
  } catch (e) {
    return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
  }
}
