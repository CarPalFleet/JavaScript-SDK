import { getOrderDetailAsync, getOrdersWithFilterAsync } from '../Order';
import { getTokenAsync } from '../../account/Auth';
import CONFIG from './Config';

const ORDER_FILTERS = {
  withoutMandentoryFields: [
    { description: 'missing identityId', filters: {identityId: CONFIG.identityId}},
    { description: 'missing pickupDate', filters: {ipickupDate: CONFIG.pickupDate}}
  ],
  withMandentoryFields: [
    { description: 'with mandentory fields', filters: {identityId: CONFIG.identityId, pickupDate: CONFIG.pickupDate}},
    { description: 'with startPickupDate and endPickupDate', filters: {identityId: CONFIG.identityId, startPickupDate: CONFIG.startPickupDate, endPickupDate: CONFIG.endPickupDate}}
  ]
}

describe('Test for customer orders with filters', () => {
    ORDER_FILTERS.withoutMandentoryFields.forEach((value, key) => {
        it(value.description, async () => {
           const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.token);
           const token = await result;
           const response = getOrdersWithFilterAsync(value.filters, token.accessToken);
           await expect(response).rejects.toHaveProperty('statusCode', 400)
        })
    });

    ORDER_FILTERS.withMandentoryFields.forEach((value, key) => {
        it(value.description, async () => {
           const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.token);
           const token = await result;
           const response = await getOrdersWithFilterAsync(value.filters, token.accessToken);
           expect(response instanceof Array).toBe(true);
        })
    });
});

test('Test for customer order detail', async () => {
    const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.token);
    const token = await result;
    const response = await getOrderDetailAsync(1, 1, token.accessToken);
    expect('id' in response).toBe(true);
})
