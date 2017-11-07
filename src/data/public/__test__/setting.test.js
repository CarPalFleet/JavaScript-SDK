import { getTokenAsync } from '../../account/Auth';
import { getWhiteLabelAsync } from '../Setting';
import CONFIG from './Config';
import _ from 'lodash';

test('Test for getting WhiteLabel for customer', async () =>{
    const response = getWhiteLabelAsync(CONFIG.domain);
    const whiteLabel = await response;
    expect(_.findKey(whiteLabel.data, 'transactionGroupAssets')).toBeTruthy();
})

// test('Test for getting WhiteLabel for public with invalid domain', async()=>{
//     const response = getWhiteLabelAsync(CONFIG.invalidDomain);
//     const whiteLabel = await response;
//     console.log("REJECT", whiteLabel);
//     expect(whiteLabel).rejects.toHaveProperty('statusCode', 404);
//     // expect(whiteLabel).rejects.toHaveProperty('Code', 'NotFoundError');
// })
