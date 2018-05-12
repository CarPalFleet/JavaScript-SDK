/**
 * @fileoverview This file contains all notification related functions that are triggered by a User
 */

import axios from "axios";
import endpoints from "../Endpoint";
import camelize from "camelize";
import {apiResponseErrorHandler} from "../utility/Util";

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
      method: "GET",
      url: `${endpoints.NOTIFICATIONS.replace("{0}", userId)}?all=${all}`,
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
      method: "DELETE",
      url: `${endpoints.NOTIFICATIONS.replace(
        "{0}",
        userId
      )}/${notificationId}`,
      headers: {Authorization: token},
    });

    return camelize(response);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};
