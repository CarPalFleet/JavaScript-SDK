import { getTokenAsync } from '../Auth';

test('test for account nick@carpal.me', async ()=>{    
    const result = getTokenAsync('nick@carpal.me', '123456');
    const token = await result;
    expect(token).not.toBeNull();
})