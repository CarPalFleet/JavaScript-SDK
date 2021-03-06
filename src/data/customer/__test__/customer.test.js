import { createNewCustomerAsync } from '../Customer';

describe('Creating new customer account', () => {
  it('Response should be true if new customer is created', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    const random = Date.now();
    const customer = {
      email: `vader${random}@carpal.me`,
      password: 'darthvader',
      firstName: 'Chen',
      lastName: 'Cheng',
      phone: `+6592${Math.floor(Math.random() * 1000000)}`,
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
