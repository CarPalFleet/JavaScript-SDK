import { getWhiteLabelAsync } from '../Setting';
import { CONFIG } from '../Configuration';

test('Test for getting WhiteLabel', async ()=>{
    const result = getTokenAsync(CONFIG.EMAIL, CONFIG.PASSWORD, CONFIG.CLIENT_ID, CONFIG.TOKEN);
    const token = await result;
    const response = getWhiteLabelAsync(CONFIG.DOMAIN, token.access_token);
    const whiteLabel = await response;
    expect(whiteLabel instanceof Object).toBe(true);
})
