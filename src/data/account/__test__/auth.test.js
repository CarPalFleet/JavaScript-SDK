import { getTokenAsync } from '../Auth';

test('test for account demo@carpal.me', async ()=>{    
    const result = getTokenAsync('demo@carpal.me', 'carpaldemo');
    const token = await result;
    expect(token).not.toBeNull();
})

test('test for account demo@carpal.me with wrong password', async()=>{  
    const result = getTokenAsync('demo@carpal.me', 'carpaldemo1');
    await expect(result).rejects.toHaveProperty('statusCode', 401);
})