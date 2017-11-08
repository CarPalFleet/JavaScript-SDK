import { getOrderDetailAsync } from '../Order';
import { getTokenAsync } from '../../account/Auth';
import CONFIG from './Config';
import DUMMY_ORDER_DATA from './dummyOrderData';

describe('Test for customer orders with filters', () => {
    DUMMY_ORDER_DATA.forEach((description, data) => {
        it(description, async () => {
           const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.token);
           const token = await result;
           const response = await getOrdersWithFilterAsync(data.paramObject, token);
           expect(data.expectedResult).toBe(true);
        })
    });
})

test('Test for customer order detail', async () => {
    const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.token);
    const token = await result;
    const response = await getOrderDetailAsync(1, 1, token.accessToken);
    expect('id' in response).toBe(true);
})
