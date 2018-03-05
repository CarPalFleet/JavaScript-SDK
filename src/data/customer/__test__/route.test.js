import {getRouteAsync, editRouteAsync, removeRouteAsync} from '../Job';
import {getTokenAsync} from '../../account/Auth';
import CONFIG from './Config';

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
