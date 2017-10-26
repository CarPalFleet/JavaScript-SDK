import { getIdentitiesAsync } from '../Identity';

test('test for identities', async ()=>{    
    const result = await getIdentitiesAsync();
    expect(result.length).toBeTruthy();
})