import { createNewCustomer } from '../Customer';
import { getTokenAsync } from '../../account/Auth';

test('Creating new customer account', async () => {
    const result = getTokenAsync('demo@carpal.me', 'carpaldemo');
    const token = await result;
    const random = Date.now();
    const customer = {
        email: `vader${random}@carpal.me`,
        password: "darthvader",
        firstName: "Chen",
        lastName:"Cheng",
        phone: "+6589881231",
        identityId: 1,
        birthday: "01-01-1970",
        coName: "NASA",
        coPhone: "+6564352178",
        coVatNo: "NASA123456789"
    }
    const response = await createNewCustomer(customer, token.access_token)
    expect(response).toBe(true);
})