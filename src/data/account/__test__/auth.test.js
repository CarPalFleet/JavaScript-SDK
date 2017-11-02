import { getTokenAsync } from '../Auth';

test('test for account demo@carpal.me', async ()=>{    
    const result = getTokenAsync('demo@carpal.me', 'carpaldemo', 2, 'jWu9Qz4L3ha4SRgM5J6oBzAljg6f9zDzs2hIIIUh');
    const token = await result;  
    expect(token).not.toBeNull();
})

test('test for account demo@carpal.me with wrong password', async()=>{  
    const result = getTokenAsync('demo@carpal.me', 'carpaldemo1', 2, 'jWu9Qz4L3ha4SRgM5J6oBzAljg6f9zDzs2hIIIUh');
    await expect(result).rejects.toHaveProperty('statusCode', 401);
})