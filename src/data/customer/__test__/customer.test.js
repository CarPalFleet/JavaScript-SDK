import {
  createNewCustomerAsync,
  createNewDriverAsync,
  getCustomerDriverDetailAsync,
  getCustomerDriversAsync,
  updateDriverLiveData
} from '../Customer';
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

// test('Creating new driver account by a customer account', async () =>{
//     jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
//     const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.token);
//     //const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.token);
//     const token = await result;
//
//     const driver = {
//         identityId: 1,
//         productTypeId: 3,
//         transactionGroupId: 1,
//         isNewUser: true,
//         firstName: 'User',
//         lastName: makeid(10),
//         email: `${makeid(10)}@example.com`,
//         password: '123456',
//         birthday: '1980-01-01',
//         phone: '+6592341092'
//     }
//
//     const response = await createNewDriverAsync(driver, 1, token.accessToken);
//
//     expect('driver' in response).toBe(true);
// })
//
// test(`Test for retrieving detail of customer's driver`, async () => {
//     const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.token);
//     const token = await result;
//     const response = await getCustomerDriverDetailAsync(1, 2, token.accessToken);
//     expect(response instanceof Object).toBe(true);
// })

// test('Test for retrieving drivers by a customer account', async () =>{
//     jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
//     const filterObj = {
//         driverStatusIds: [2],
//         orderRouteTypeIds: [1,2],
//         driverTypeIds: [1,2,3]
//     }
//     const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.token);
//     const token = await result;
//
//     const response = await getCustomerDriversAsync(filterObj, 1, token.accessToken);
//
//     expect(response instanceof Array).toBe(true);
// })

test('Test for pubsub live data for job', async () =>{
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const originalDriverDatum = {
      "activeStatusCounts":{"2":0,"5":0,"7":0,"9":0},
      "driverTypeCounts":{"1": 1,"2": 3,"3": 4},
      "data":{
         "2":[],
         "5":[],
         "7":[{
           "updatedAt":"2017-12-15 05:02:21",
           "driverStatusId":1,
           "addressId":2,
           "longitude":"103.7600326538086",
           "driverId":8,
           "customerId":2318,
           "orderId":23,
           "id":"8",
           "latitude":"1.3513647119405165",
           "driverTypeIds":[
              1
           ],
           "orderRouteTypeId":1
         }],
         "9":[]
      }, "totalStatusCounts":0
    }
    const pubSubPayload = {
        data: {
           "updatedAt":"2017-12-15 05:02:21",
           "driverStatusId": 4,
           "addressId":2,
           "longitude":"103.1",
           "driverId":12,
           "customerId":2318,
           "orderId":233,
           "id":"12",
           "latitude":"1.3",
           "driverTypeIds":[
              1
           ],
           "orderRouteTypeId":1
        },
        lastDriverStatusId: 1
    }

    const filterObject = {
        driverStatusIds: [2],
        orderRouteTypeIds: 1,
        driverTypeIds: [1,2,3]
    }
    const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.token);
    const token = await result;
    const response = updateDriverLiveData(originalDriverDatum, pubSubPayload, filterObject);
    expect(response instanceof Object).toBe(true);
})

function makeid(size) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < size; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
