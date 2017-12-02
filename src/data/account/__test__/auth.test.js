import { getTokenAsync } from '../Auth';
import CONFIG from './Config';

test('test for account demo@carpal.me', async ()=>{
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.token);
    const token = await result;
    expect(token).not.toBeNull();
})

test('test for account demo@carpal.me with wrong password', async()=>{
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const result = getTokenAsync(CONFIG.email, 'carpaldemo2', CONFIG.clientId, CONFIG.token);
    await expect(result).rejects.toHaveProperty('statusCode', 401);
})

