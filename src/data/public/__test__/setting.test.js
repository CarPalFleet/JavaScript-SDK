import { getTokenAsync } from '../../account/Auth';
import { getWhiteLabelAsync } from '../Setting';
import CONFIG from './Config';

test('Test for getting WhiteLabel for customer', async () =>{
    const response = getWhiteLabelAsync(CONFIG.domain);
    const whiteLabel = await response;
    expect(whiteLabel instanceof Object).toBe(true);
})

// test('Test for getting WhiteLabel for public with invalid domain', async()=>{
//     const response = getWhiteLabelAsync(CONFIG.invalidDomain);
//     const whiteLabel = await response;
//     // expect(whiteLabel).rejects.toHaveProperty('statusCode', 404);
//     // expect(whiteLabel).rejects.toHaveProperty('Code', 'NotFoundError');
// })
