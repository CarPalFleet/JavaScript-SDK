import {
  getNotificationsAsync,
  deleteNotificationAsync,
  getUserNotificationsAsync,
  putUserNotification,
  deleteUserNotificationAsync,
  getUserNotificationCountAsync,
} from '../Notification';
import { getTokenAsync } from '../../account/Auth';
import CONFIG from './Config';

describe('Test for retrieving all notifications', () => {
  let token;
  beforeAll(async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    token = await getTokenAsync(
      CONFIG.email,
      CONFIG.password,
      CONFIG.clientId,
      CONFIG.clientSecret
    );
  });

  it('should return all notifications', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    try {
      const response = getNotificationsAsync(false, 1, token.accessToken);
      const notifications = await response;
      expect('data' in notifications).toBeTruthy();
      expect(notifications.data).toMatchSnapshot();
    } catch (error) {
      const expected = {
        statusCode: 404,
        statusText: 'Not Found',
        errorMessage: [{ key: null, messages: ['Not Found'] }],
      };
      expect(error).toEqual(expected);
    }
  });

  it('should delete notification of user', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    const deleteResponse = { data: true };
    try {
      const response = await deleteNotificationAsync(
        1,
        12121212,
        token.accessToken
      );
      expect('data' in response.data).toBeTruthy();
      expect(response.data).toEqual(deleteResponse);
      expect(true).toBeTruthy();
    } catch (error) {
      const expected = {
        statusCode: 404,
        statusText: 'Not Found',
        errorMessage: [{ key: null, messages: ['Not Found'] }],
      };
      expect(error).toEqual(expected);
    }
  });

  it('should return all users notifications', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    let filters = {
      limit: 10,
    };

    try {
      const response = getUserNotificationsAsync(filters, 1, token.accessToken);
      const notifications = await response;
      expect('data' in notifications).toBeTruthy();
      expect(notifications.data).toMatchSnapshot();
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 400);
    }
  });

  it('Update notifications', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    try {
      await putUserNotification([], token.accessToken);
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 400);
    }
  });

  it('Delete Multiple notifications', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    const notificationIds = [];

    try {
      const response = await deleteUserNotificationAsync(
        notificationIds,
        token.accessToken
      );
      expect(response.data).toBeTruthy();
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 400);
    }
  });

  it('should return all counts for notifications', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    try {
      await getUserNotificationCountAsync(token.accessToken);
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 400);
    }
  });
});
