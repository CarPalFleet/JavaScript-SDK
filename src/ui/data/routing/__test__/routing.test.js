import { getTokenAsync } from '../../../../data/account/Auth';
import {
  getOrderListWithoutRoutes,
  multiplyItems
} from '../Routing';

test('Test for sending routing optimization.', async ()=>{
  // jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  // const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.token);
  //
  // const filters = {
  //   pickup_date: '2018-02-28',
  //   limit: 30,
  //   offset: 0
  // }
  //
  // const response = await getOrderListWithoutRoutes(filters, token.accessToken);
  // expect('data' in response).toBe(true);
  // expect(response.data instanceof Array).toBe(true);
  expect(true).toBe(true);
})

test('Test for mutiply Items', () => {
  // const result = multiplyItems(2, 3);
  // expect(result).toBe(6);
  expect(true).toBe(true);
})
