import {getNotificationsAsync, deleteNotificationAsync} from '../Notification';
import {getTokenAsync} from '../../account/Auth';
import CONFIG from './Config';

test('Test for retrieving all notifications', async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  const result = getTokenAsync(
    CONFIG.email,
    CONFIG.password,
    CONFIG.clientId,
    CONFIG.clientSecret
  );
  const token = await result;
  const response = await getNotificationsAsync(
    false,
    CONFIG.userId,
    token.accessToken
  );
  expect('data' in response).toBeTruthy();
});

test('Test for delet ing specific notification', async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  const result = getTokenAsync(
    CONFIG.email,
    CONFIG.password,
    CONFIG.clientId,
    CONFIG.clientSecret
  );
  const token = await result;
  const response = await deleteNotificationAsync(
    1,
    CONFIG.userId,
    token.accessToken
  );
  expect('data' in response.data).toBeTruthy();
  expect(true).toBeTruthy();
});
