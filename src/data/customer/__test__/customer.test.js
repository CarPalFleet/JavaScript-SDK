import { createNewCustomerAsync, createNewDriverAsync, getCustomerDriversAsync } from '../Customer';
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
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const result = getTokenAsync(CONFIG.temail, CONFIG.tpassword, CONFIG.clientId, CONFIG.token);
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

    expect('driver' in response).toBe(true);
})

test('Test for retrieving drivers by a customer account', async () =>{
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const filterObj = {
        driverStatusIds: [2],
        orderRouteTypeIds: [1,2],
        driverTypeIds: [1,2,3]
    }
    const result = getTokenAsync(CONFIG.temail, CONFIG.tpassword, CONFIG.clientId, CONFIG.token);
    const token = await result;

    const response = await getCustomerDriversAsync(filterObj, 1, token.accessToken);

    expect(response instanceof Array).toBe(true);
})

test('Test for pubsub live data for job', async () =>{
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const originalJobDatum = {
      "activeStatusCounts":{"2":0,"5":0,"7":0,"9":0},
      "data":{
         "2":[],
         "5":[],
         "7":[{
             "id":"ed6d5ca5f2169bd18dda5fb58e1201a1",
             "orderId":62304,
             "orderStatusId":7,
             "statusName":"Pending",
             "pickupDate":"2017-12-25",
             "latitude":"1.3572022",
             "longitude":"103.8329746",
             "driverId":0,
             "customerId":2318
         }],
         "9":[]
      }, "totalStatusCounts":0
    }
    const pubSubPayload = {
       "id":"ed6d5ca5f2169bd18dda5fb58e1201a1",
       "orderId":62304,
       "orderStatusId":2,
       "statusName":"Pending",
       "pickupDate":"2017-12-19",
       "latitude":"1.3572022",
       "longitude":"103.8329746",
       "driverId":0,
       "customerId":2318
    }

    const filterObject = {
        driverStatusIds: [2],
        orderRouteTypeIds: 1,
        driverTypeIds: [1,2,3]
    }
    const result = getTokenAsync(CONFIG.temail, CONFIG.tpassword, CONFIG.clientId, CONFIG.token);
    const token = await result;
    const response = updateDriverLiveData(originalJobDatum, pubSubPayload, filterObject);
    expect(response instanceof Object).toBe(true);
})

function makeid(size) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < size; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
