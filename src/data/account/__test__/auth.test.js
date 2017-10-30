import { getTokenAsync } from '../Auth';

test('test for account nick@carpal.me', async ()=>{    
    const result1 = getTokenAsync('demo@carpal.me', 'carpaldemo');
    const token1 = await result1;
    expect(token1).not.toBeNull();

    const result2 = getTokenAsync('demo@carpal.me', 'carpaldemo1');
    const token2 = await result2;
    expect(token2).toBeNull();
})