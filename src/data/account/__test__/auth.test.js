import { getTokenAsync, refreshTokenAsync } from '../Auth';
import CONFIG from './Config';

test('test for account alpha.test@carpal.me', async ()=>{
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const result = getTokenAsync(CONFIG.temail, CONFIG.tpassword, CONFIG.clientId, CONFIG.token);
    const token = await result;
    expect(token).not.toBeNull();
})

test('test for account alpha.test@carpal.me with wrong tpassword', async()=>{
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const result = getTokenAsync(CONFIG.temail, 'carpaldemo2', CONFIG.clientId, CONFIG.token);
    await expect(result).rejects.toHaveProperty('statusCode', 401);
})

test('test for refresh token', async()=>{
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    let result = getTokenAsync(CONFIG.temail, CONFIG.tpassword, CONFIG.clientId, CONFIG.token);
    let token = await result;
    result = refreshTokenAsync(token.refreshToken, CONFIG.clientId, CONFIG.token);
    token = await result;
    expect(token).toBeTruthy();
})
