/**
 * @fileoverview This file contains all notification related functions that are triggered by a User
 */

import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';

import {
  apiResponseErrorHandler,
  convertObjectIntoURLString,
} from '../utility/Util';

/**
 * Get Notification
 * @param {boolean} all true/false
 * true mean retrieve all notifications
 * @param {string} userId
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const getNotificationsAsync = async (all = false, userId, token) => {
  try {
    let response = await axios({
      method: 'GET',
      url: `${endpoints.NOTIFICATIONS.replace('{0}', userId)}?all=${all}`,
      headers: { Authorization: token },
    });

    return camelize(response.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Delete Notification
 * @param {int} notificationId
 * @param {string} userId
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const deleteNotificationAsync = async (
  notificationId,
  userId,
  token
) => {
  try {
    let response = await axios({
      method: 'DELETE',
      url: `${endpoints.NOTIFICATIONS.replace(
        '{0}',
        userId
      )}/${notificationId}`,
      headers: { Authorization: token },
    });

    return camelize(response);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Get Notification
 * Example : next_cursor=1556612424880&limit=10&is_read=0
 * @param {object} filters
 * true mean retrieve all notifications
 * @param {string} userId
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const getUserNotificationsAsync = async (filters, userId, token) => {
  try {
    let paramString = convertObjectIntoURLString(filters);

    let response = await axios({
      method: 'GET',
      url: `${endpoints.API_V3.NOTIFICATIONS}?${paramString.replace('&', '?')}`,
      headers: { Authorization: `Bearer ${token}` },
    });

    return camelize(response.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Update requested data
 * Example :
  [
    {
        "id": 1556612424880,
        "is_read": 1
    }
  ]
 * @param {object} reqeustData
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const putUserNotification = async (reqeustData, token) => {
  try {
    const response = await axios({
      method: 'PUT',
      url: endpoints.API_V3.NOTIFICATIONS,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        reqeustData,
      },
    });
    return camelize(response.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Delete Multiple Notifications
 * @param {array} notificationIds
 * @param {string} token
 * @return {object} Promise resolve/reject
 * return {data: true} if deleting is success
 */
export const deleteUserNotificationAsync = async (
  notificationIds = [],
  token
) => {
  try {
    let paramString = notificationIds.join();
    await axios({
      method: 'DELETE',
      url: `${endpoints.API_V3.NOTIFICATIONS}?ids=${paramString}`,
      headers: { Authorization: `Bearer ${token}` },
    });

    return { data: true };
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Get notification counts
 * @param {string} token
 * @return {object} counts for read and unread notificaitons
 */
export const getUserNotificationCountAsync = async (token) => {
  try {
    let response = await axios({
      method: 'GET',
      url: endpoints.API_V3.NOTIFICATIONS_COUNT,
      headers: { Authorization: `Bearer ${token}` },
    });
    return camelize(response.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};
