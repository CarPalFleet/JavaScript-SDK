import { createNewCustomerAsync, createNewDriverAsync } from '../Customer';
import { searchAsync } from '../Search';
import { getTokenAsync } from '../../account/Auth';
import CONFIG from './Config';

test('Testing for search function', async () =>{
    const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.token);
    const token = await result;
    
    const response = await searchAsync('test 123', 'customer, driver', true, token.accessToken);
    expect('jobs' in response).toBe(true);
})