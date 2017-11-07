import { getLanguagesAsync } from '../Language';

test('test for languages', async ()=>{
    const result = await getLanguagesAsync();
    console.log("RESULT", result);
    expect(result.length).toBeTruthy();
})
