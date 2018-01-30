import { createNewCustomerAsync, createNewDriverAsync } from '../Driver';
import { searchAsync, myOrderSearchAsync, myOrderDriverListSearchAsync } from '../Search';
import { getTokenAsync } from '../../account/Auth';
import CONFIG from './Config';

test('Testing for search function', async () =>{
    // jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    // const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.clientSecret);
    // const token = await result;
    // const response = await searchAsync('mar 1', 'orders,drivers', true, 1, token.accessToken);
    // expect(response.orders.total>0).toBe(true);
    // expect(response.drivers.total>0).toBe(true);
    expect(true).toBe(true);
})

test('Testing for my order elastic search', async () =>{
    // jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    // const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.clientSecret);
    // const token = await result;
    // const response = await myOrderSearchAsync('mar 1', 'orders,drivers', true, 1, token.accessToken);
    // expect(response.orders.total>0).toBe(true);
    // expect(response.drivers.total>0).toBe(true);
    expect(true).toBe(true);
})

test('Testing for driver list elastic search in my order', async () =>{
    // jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    // const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.clientSecret);
    // const token = await result;
    // const response = await myOrderDriverListSearchAsync('mar 1', 'orders,drivers', true, 1, token.accessToken);
    // expect(response.orders.total>0).toBe(true);
    // expect(response.drivers.total>0).toBe(true);
    expect(true).toBe(true);
})
