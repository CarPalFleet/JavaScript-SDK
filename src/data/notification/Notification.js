/**
 * @fileoverview This file contains all notification Customer related functions that are triggered by a User
 */

import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import {apiResponseErrorHandler} from '../utility/Util';

/**
 * Get Notification
 * @param {boolean} all true/false
 * true mean retrieve all notifications
 * @param {string} customerId
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
 //TODO: this notification function should work based on userId not customerId
export const getNotificationsAsync = async (all = false, customerId, token) => {
  try {
    let response = await axios({
      method: 'GET',
      url: `${endpoints.NOTIFICATIONS.replace('{0}', customerId)}?all=${all}`,
      headers: {Authorization: token},
    });

    return camelize(response.data);
  } catch (e) {

    return apiResponseErrorHandler(e);
  }
};

/**
 * Delete Notification
 * @param {int} notificationId
 * @param {string} customerId
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
 //TODO: this notification function should work based on userId not customerId
export const deleteNotificationAsync = async (
  notificationId,
  customerId,
  token
) => {
  try {
    let response = await axios({
      method: 'DELETE',
      url: `${endpoints.NOTIFICATIONS.replace(
        '{0}',
        customerId
      )}/${notificationId}`,
      headers: {Authorization: token},
    });

    return camelize(response);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};
