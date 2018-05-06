import {getNotificationsAsync, deleteNotificationAsync} from '../Notification';
import {getTokenAsync} from '../../account/Auth';
import CONFIG from './Config';

describe('Test for retrieving all notifications', () => {
  it('should return all notifications', async () => {
    jest.setTimeout(20000);
    const result = getTokenAsync(
      CONFIG.email,
      CONFIG.password,
      CONFIG.clientId,
      CONFIG.clientSecret
    );
    const token = await result;
    const response = getNotificationsAsync(false, 1, token.accessToken);
    const notifications = await response;
    expect('data' in notifications).toBeTruthy();
    expect(notifications.data).toMatchSnapshot();
  });
});

describe('Test for deleting specific notification', () => {
  it('should delete notification of user', async () => {
    jest.setTimeout(20000);
    const deleteResponse = {data: true};
    const result = getTokenAsync(
      CONFIG.email,
      CONFIG.password,
      CONFIG.clientId,
      CONFIG.clientSecret
    );
    const token = await result;
    const response = await deleteNotificationAsync(
      1,
      12121212,
      token.accessToken
    );
    expect('data' in response.data).toBeTruthy();
    expect(response.data).toEqual(deleteResponse);
    expect(true).toBeTruthy();
  });
});
