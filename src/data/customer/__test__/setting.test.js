import { getTokenAsync } from '../../account/Auth';
import { getWhiteLabelAsync } from '../Setting';
import CONFIG from './Config';

test('Test for getting WhiteLabel for customer', async () =>{
    const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.token);
    const token = await result;
    const response = getWhiteLabelAsync(CONFIG.domain, token.accessToken);
    const whiteLabel = await response;
    expect(whiteLabel instanceof Object).toBe(true);
})
//
// test('Test for getting WhiteLabel for customer with invalid domain', async()=>{
//     const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.token);
//     const token = await result;
//     const response = getWhiteLabelAsync(CONFIG.invalidDomain, token.accessToken);
//     const whiteLabel = await response;
//     console.log('WH', whiteLabel);
//     // expect(whiteLabel).rejects.toHaveProperty('Code', 'NotFoundError');
// })
