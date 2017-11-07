import { getTokenAsync } from '../../account/Auth';
import { getCustomerPreferenceSettingsAsync } from '../Setting';
import CONFIG from './Config';
import _ from 'lodash';

test('Test for getting WhiteLabel for customer', async () =>{
    const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.token);
    const token = await result;
    const response = getCustomerPreferenceSettingsAsync(CONFIG.domain, token.accessToken);
    const whiteLabel = await response;
    expect(_.findKey(whiteLabel.data, 'transactionGroupAssets')).toBeTruthy();
})

// test('Test for getting WhiteLabel for customer with invalid domain', async()=>{
//     const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.token);
//     const token = await result;
//     const response = getCustomerPreferenceSettingsAsync(CONFIG.invalidDomain, token.accessToken);
//     const whiteLabel = await response;
//     expect(whiteLabel).rejects.toHaveProperty('Code', 'NotFoundError');
// })
