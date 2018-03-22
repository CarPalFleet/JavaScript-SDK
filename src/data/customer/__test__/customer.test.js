import {createNewCustomerAsync} from '../Driver';

describe('Creating new customer account', () => {
  it('Response should be true if new customer is created', async () => {
    const random = Date.now();
    const customer = {
      email: `vader${random}@carpal.me`,
      password: 'darthvader',
      firstName: 'Chen',
      lastName: 'Cheng',
      phone: '+6589881231',
      identityId: 1,
      birthday: '01-01-1970',
      coName: 'NASA',
      coPhone: '+6564352178',
      coVatNo: 'NASA123456789',
    };
    const response = await createNewCustomerAsync(customer);
    expect(response).toBeTruthy();
  });
});
