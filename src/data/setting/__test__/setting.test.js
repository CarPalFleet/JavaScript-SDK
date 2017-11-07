import { getWhiteLabelAsync } from '../Setting';

test('Test for getting WhiteLabel', async ()=>{
    const result = getTokenAsync('demo@carpal.me', 'carpaldemo', 2, 'jWu9Qz4L3ha4SRgM5J6oBzAljg6f9zDzs2hIIIUh');
    const token = await result;
    const response = getWhiteLabelAsync('carpal.me', token.access_token);
    const whiteLabel = await response;
    expect(whiteLabel instanceof Array).toBe(true);
})
