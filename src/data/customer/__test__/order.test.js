import { getOrderDetailAsync } from '../Order';
import { getTokenAsync } from '../../account/Auth';
import CONFIG from './Config';

test('Test for customer order detail', async () => {
    const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.token);
    const token = await result;
    const response = await getOrderDetailAsync(1, 1, token.accessToken);
    expect('id' in response).toBe(true);
})
