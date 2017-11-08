import { getTokenAsync } from '../Auth';
import CONFIG from './Config';

test('test for account demo@carpal.me', async ()=>{
    const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.token);
    const token = await result;
    console.log(token);
    expect(token).not.toBeNull();
})

test('test for account demo@carpal.me with wrong password', async()=>{
    const result = getTokenAsync(CONFIG.email, 'carpaldemo2', CONFIG.clientId, CONFIG.token);
    await expect(result).rejects.toHaveProperty('statusCode', 401);
})
