import { createNewCustomerAsync, createNewDriverAsync } from '../Customer';
import { searchAsync } from '../Search';
import { getTokenAsync } from '../../account/Auth';
import CONFIG from './Config';

test('Testing for search function', async () =>{
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.clientSecret);
    const token = await result;
    const response = await searchAsync('mar 1', 'orders,drivers', true, 1, token.accessToken);
    expect(response.orders.total>0).toBe(true);
    expect(response.drivers.total>0).toBe(true);
})
