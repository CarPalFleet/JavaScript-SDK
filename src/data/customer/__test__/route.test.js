import {getRouteAsync, editRouteAsync, removeRouteAsync} from '../Job';
import {deleteDriverScheduleAsync, createDriverScheduleAsync, updateRouteLocationAsync} from '../Route';
import {getTokenAsync} from '../../account/Auth';
import CONFIG from './Config.js';

it('Retrieving single grouping location', async () => {
  const result = getTokenAsync(
    CONFIG.temail,
    CONFIG.tpassword,
    CONFIG.clientId,
    CONFIG.clientSecret
  );
  const token = await result;
  const response = await getRouteAsync(token.accessToken);
  expect('data' in response).toBe(true);
});

it('Retrieving single grouping location', async () => {
  const result = getTokenAsync(
    CONFIG.temail,
    CONFIG.tpassword,
    CONFIG.clientId,
    CONFIG.clientSecret
  );
  const token = await result;
  const response = await editRouteAsync(token.accessToken);
  expect('data' in response).toBe(true);
});

it('Retrieving single grouping location', async () => {
  const result = getTokenAsync(
    CONFIG.temail,
    CONFIG.tpassword,
    CONFIG.clientId,
    CONFIG.clientSecret
  );
  const token = await result;
  const response = await removeRouteAsync(CONFIG.routeId, token.accessToken);
  expect('data' in response).toBe(true);
});

test(`Test for update driver schedule`, async () => {
  const result = getTokenAsync(
    CONFIG.temail,
    CONFIG.tpassword,
    CONFIG.clientId,
    CONFIG.clientSecret
  );
  const token = await result;
  const playload = {
    driver_id: 25148,
    transaction_group_id: 180,
    start_time: '10:01',
    end_time: '13:02',
    start_at: '2018-03-01',
  }
  const scheduleId = CONFIG.scheduleId;
  const response = await updateRouteLocationAsync(scheduleId, playload, token.accessToken);
  expect(response.status).toBe(200);
});

test(`Test for delete driver schedule`, async () => {
  const result = getTokenAsync(
    CONFIG.temail,
    CONFIG.tpassword,
    CONFIG.clientId,
    CONFIG.clientSecret
  );
  const token = await result;
  const scheduleId = CONFIG.scheduleId;
  const response = await deleteDriverScheduleAsync(scheduleId, token.accessToken);
  expect(response.status).toBe(204);
});

test(`Test for create driver schedule`, async () => {
  const result = getTokenAsync(
    CONFIG.temail,
    CONFIG.tpassword,
    CONFIG.clientId,
    CONFIG.clientSecret
  );
  const token = await result;
  const playload = {
    driver_id: 25148,
    transaction_group_id: 180,
    start_time: '10:01',
    end_time: '13:02',
    start_at: '2018-03-01',
  }
  const response = await createDriverScheduleAsync(playload, token.accessToken);
  expect(response.status).toBe(200);
});
