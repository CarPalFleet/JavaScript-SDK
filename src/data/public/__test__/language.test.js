import { getLanguagesAsync } from '../Language';

test('test for languages', async ()=>{    
    const result = await getLanguagesAsync();
    expect(result.length).toBeTruthy();
})