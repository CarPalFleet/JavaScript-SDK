import {
  getJobDetailAsync,
  getJobSummaryAsync,
} from '../Job';
import { getTokenAsync } from '../../account/Auth';
import CONFIG from './Config';

it('Retrieving single grouping location', async () => {
  const result = getTokenAsync(CONFIG.temail, CONFIG.tpassword, CONFIG.clientId, CONFIG.clientSecret);
  const token = await result;
  const response = await getJobDetailAsync(CONFIG.orderId, token.accessToken);
  expect('data' in response).toBe(true);
})

it('Retrieving single grouping location', async () => {
  const result = getTokenAsync(CONFIG.temail, CONFIG.tpassword, CONFIG.clientId, CONFIG.clientSecret);
  const token = await result;
  const response = await getJobSummaryAsync(CONFIG.orderId, token.accessToken);
  expect('data' in response).toBe(true);
})
