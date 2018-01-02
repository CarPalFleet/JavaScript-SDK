import { fileUploadAsync } from '../FileUpload';
import { getTokenAsync } from '../../account/Auth';
import CONFIG from './Config';

test('Test for customer order detail', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.clientSecret);
    const token = await result;

    var formData = new FormData();
    formData.append('file', file)
    const response = await getOrderDetailAsync({formData, customerId: 1, showProgress: true}, token.accessToken);
    expect('true' in response.data).toBe(true);
})
