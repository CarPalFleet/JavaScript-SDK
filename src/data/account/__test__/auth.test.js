import { getTokenAsync } from '../Auth';

test('test for account nick@carpal.me', async ()=>{    
    const result1 = getTokenAsync('nick@carpal.me', '123456');
    const token1 = await result1;
    expect(token1).not.toBeNull();

    const result2 = getTokenAsync('nick@carpal.me', '1234567');
    const token2 = await result2;
    expect(token2).toBeNull();
})