// import { getTokenAsync } from '../../account/Auth';
// import { getCustomerPublicProfileSettingsAsync } from '../Setting';
// import CONFIG from './Config';
// import _ from 'lodash';
//
// test('Test for getting WhiteLabel for public', async () => {
//     const response = getCustomerPublicProfileSettingsAsync(CONFIG.domain);
//     const whiteLabel = await response;
//     expect(_.findKey(whiteLabel.data, 'transactionGroupAssets')).toBeTruthy();
// })
//
// test('Test for getting WhiteLabel for public with invalid domain', async () => {
//     const response = getCustomerPublicProfileSettingsAsync(CONFIG.invalidDomain);
//     await expect(response).rejects.toHaveProperty('statusCode', 404);
// })
//
// test('Test for getting WhiteLabel for public with empty string', async () => {
//     const response = getCustomerPublicProfileSettingsAsync(CONFIG.emptyString);
//     await expect(response).rejects.toHaveProperty('statusCode', 403);
// })
