import { getTokenAsync } from '../Auth';

test('test for account nick@carpal.me', async ()=>{    
    const result = getTokenAsync({email: 'nick@carpal.me', password:'123456'}).next();
    const token = await result.value;
    expect(token).not.toBeNull();
})