import { getTokenAsync } from '../../account/Auth';
import { getCustomerPublicProfileSettingsAsync } from '../Setting';
import CONFIG from './Config';
import _ from 'lodash';

test('Test for getting WhiteLabel for customer', async () =>{
    const response = getCustomerPublicProfileSettingsAsync(CONFIG.domain);
    const whiteLabel = await response;
    expect(_.findKey(whiteLabel.data, 'transactionGroupAssets')).toBeTruthy();
})

// test('Test for getting WhiteLabel for public with invalid domain', async()=>{
//     const response = getCustomerPublicProfileSettingsAsync(CONFIG.invalidDomain);
//     const whiteLabel = await response;
//     expect(whiteLabel).rejects.toHaveProperty('statusCode', 404);
//     // const aa = expect(whiteLabel).rejects;
//     // console.log("REJECT", aa);
//     // expect(whiteLabel).rejects.toHaveProperty('statusCode', 404);
//     // expect(whiteLabel).rejects.toHaveProperty('Code', 'NotFoundError');
// })
