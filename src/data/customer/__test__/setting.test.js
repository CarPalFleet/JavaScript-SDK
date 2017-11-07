import { getWhiteLabelAsync } from '../Setting';
import { CONFIG } from 'Config';

test('Test for getting WhiteLabel for customer', async () =>{
    const result = getTokenAsync(CONFIG.EMAIL, CONFIG.PASSWORD, CONFIG.CLIENT_ID, CONFIG.TOKEN);
    const token = await result;
    const response = getWhiteLabelAsync(CONFIG.DOMAIN, token.access_token);
    const whiteLabel = await response;
    expect(whiteLabel instanceof Object).toBe(true);
})
