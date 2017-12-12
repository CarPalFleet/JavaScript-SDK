import { getOrdersWithFilterAsync, getOrderDetailAsync, createNewDeliveryWindow } from '../Order';
import { getTokenAsync } from '../../account/Auth';
import CONFIG from './Config';

// const ORDER_FILTERS = {
//   withoutMandentoryFields: [
//     { description: 'missing identityId', filters: {identityId: CONFIG.identityId}},
//     { description: 'missing pickupDate', filters: {pickupDate: CONFIG.pickupDate}}
//   ],
//   withMandentoryFields: [
//     { description: 'with mandentory fields', filters: {identityId: CONFIG.identityId, pickupDate: CONFIG.pickupDate}},
//     { description: 'with startPickupDate and endPickupDate', filters: {identityId: CONFIG.identityId, startPickupDate: CONFIG.startPickupDate, endPickupDate: CONFIG.endPickupDate}}
//   ]
// }
//
// describe('Test for customer orders with filters', () => {
//     ORDER_FILTERS.withoutMandentoryFields.forEach((value) => {
//         it(value.description, async () => {
//            const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.token);
//            const token = await result;
//            const response = getOrdersWithFilterAsync(value.filters, token.accessToken);
//            await expect(response).rejects.toHaveProperty('statusCode', 400)
//         })
//     });
//
//     ORDER_FILTERS.withMandentoryFields.forEach((value) => {
//         it(value.description, async () => {
//            const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.token);
//            const token = await result;
//            const response = await getOrdersWithFilterAsync(value.filters, token.accessToken);
//            expect(response instanceof Object).toBe(true);
//         })
//     });
// });

test('Test for customer order detail', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.token);
    const token = await result;
    const response = await getOrderDetailAsync(1, 1, token.accessToken);
    expect('id' in response).toBe(true);
})

test('Test for creating new delivery window with product type 1', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.token);
    const token = await result;
    const response = await createNewDeliveryWindow({customerId: 1,
                                                    identityId: 1,
                                                    productTypeId: 1,
                                                    displayName: makeid(),
                                                    startTime: '9:30',
                                                    endTime: '11:30'}, token.accessToken);
    expect('id' in response).toBe(true);
})


test('Test for creating new delivery window with product type 3 and transaction user account', async () => {
    const result = getTokenAsync(CONFIG.temail, CONFIG.tpassword, CONFIG.clientId, CONFIG.token);
    const token = await result;
    const response = await createNewDeliveryWindow({customerId: 1,
                                                    identityId: 1,
                                                    productTypeId: 3,
                                                    transactionGroupId:1,
                                                    displayName: makeid(),
                                                    startTime: '9:30',
                                                    endTime: '11:30'}, token.accessToken);
    expect('id' in response).toBe(true);
})

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
