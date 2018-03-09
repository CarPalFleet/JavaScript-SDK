import {createNewCustomerAsync} from '../Driver';

test('Creating new customer account', async () => {
  // REVIEW you could mock Date.now() to make sure it always sends back the same date if necessary (I don't think it is needed here)
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
  expect(response).toBe(true);
  expect(true).toBe(true);
});
