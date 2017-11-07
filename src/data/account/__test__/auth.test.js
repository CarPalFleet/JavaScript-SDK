import { getTokenAsync } from '../Auth';
import { CONFIG } from 'Config';

test('test for account demo@carpal.me', async ()=>{
    const result = getTokenAsync(CONFIG.EMAIL, CONFIG.PASSWORD, CONFIG.CLIENT_ID, CONFIG.TOKEN);
    const token = await result;
    expect(token).not.toBeNull();
})

test('test for account demo@carpal.me with wrong password', async()=>{
    const result = getTokenAsync(CONFIG.EMAIL, CONFIG.PASSWORD, CONFIG.CLIENT_ID, CONFIG.TOKEN);
    await expect(result).rejects.toHaveProperty('statusCode', 401);
})
