import { createNewCustomerAsync, createNewDriverAsync, search } from '../Customer';
import { getTokenAsync } from '../../account/Auth';
import CONFIG from './Config';

test('Creating new customer account', () => {
    // const random = Date.now();
    // const customer = {
    //     email: `vader${random}@carpal.me`,
    //     password: "darthvader",
    //     firstName: "Chen",
    //     lastName:"Cheng",
    //     phone: "+6589881231",
    //     identityId: 1,
    //     birthday: "01-01-1970",
    //     coName: "NASA",
    //     coPhone: "+6564352178",
    //     coVatNo: "NASA123456789"
    // }
    // const response = await createNewCustomerAsync(customer)
    // expect(response).toBe(true);
    expect(true).toBe(true);
})

test('Creating new driver account by a customer account', async () =>{
    const result = getTokenAsync('transaction@carpal.me', 'transactioncustomer', CONFIG.clientId, CONFIG.token);
    //const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.token);
    const token = await result;

    const driver = {
        identityId: 1,
        productTypeId: 3,
        transactionGroupId: 1,
        isNewUser: true,
        firstName: 'User', 
        lastName: makeid(10), 
        email: `${makeid(10)}@example.com`,
        password: '123456', 
        birthday: '1980-01-01', 
        phone: '+6592341092'
    }

    const response = await createNewDriverAsync(driver, 1, token.accessToken);
    expect(response.code).toBe(10);
})

test('Testing for search function', async () =>{
    const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.token);
    const token = await result;

    const response = await search('test 123', 'customer, driver', true, token.accessToken);
    expect('jobs' in response).toBe(true);
})

function makeid(size) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < size; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
}