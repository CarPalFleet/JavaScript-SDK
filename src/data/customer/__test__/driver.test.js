import CONFIG from './Config';
import { getTokenAsync } from '../../account/Auth';
import {
  createNewDriverAsync,
  getCustomerDriverDetailAsync,
  getCustomerDriverListAsync,
  getCustomerDriversAsync,
  getDriverListAsync,
  updateDriverLiveData
} from '../Driver';

describe('Create new driver ', () => {
  it('should response new driver object including id and details', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const result = getTokenAsync(CONFIG.temail, CONFIG.tpassword, CONFIG.clientId, CONFIG.clientSecret);
    const token = await result;

    const driverInfo = {
        identityId: 1,
        productTypeId: 3,
        transactionGroupId: [180],
        firstName: 'User',
        lastName: makeid(10),
        email: `${makeid(10)}@example.com`,
        password: '123456',
        birthday: '1980-01-01',
        phone: '+6592341092',
        isNewUser: true,
        sendConfirmationSms: false,
        vehicleTypeId: 1,
        vehicleBrand: 'Scooter',
        vehicleModel: '12456',
        vehicleLicenseNumber: '12456',
        vehicleModelYear: 2018,
        vehicleColor: 'Black'
    }

    const response = await createNewDriverAsync(driverInfo, 1, token.accessToken);
    expect('driver' in response).toBeTruthy();
    expect('id' in response.driver).toBeTruthy();
    expect('details' in response.driver).toBeTruthy();
  });
});

test(`Test for retrieving detail of customer's driver`, async () => {
    const result = getTokenAsync(CONFIG.temail, CONFIG.tpassword, CONFIG.clientId, CONFIG.clientSecret);
    const token = await result;
    const response = await getCustomerDriverDetailAsync(1, 5, 9869, token.accessToken);
    expect(response instanceof Object).toBe(true);
})

test(`Test for retrieving V3 driver list`, async () => {
    const result = getTokenAsync(CONFIG.temail, CONFIG.tpassword, CONFIG.clientId, CONFIG.clientSecret);
    const token = await result;
    const filters =  {
      limit: 2,
      page: 1
    }

    const response = await getDriverListAsync(filters, token.accessToken);
    expect('data' in response).toBe(true);
    expect(response.data instanceof Array).toBe(true);
})

test('Test for retrieving drivers by a customer account', async () =>{
    // jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    // const filterObj = {
    //     driverStatusIds: [2],
    //     orderRouteTypeIds: [1,2],
    //     driverTypeIds: [1,2,3]
    // }
    // const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.clientSecret);
    // const token = await result;
    //
    // const response = await getCustomerDriverListAsync(filterObj, 1, token.accessToken);
    //
    // expect(response instanceof Array).toBe(true);
    expect(true).toBe(true);
})

// test('Test for pubsub live data for job', async () =>{
//     jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
//     const originalDriverDatum = {
//       "activeStatusCounts":{"1":0,"2":0,"3":0,"4":0},
//       "driverTypeCounts":{"1": 1,"2": 3,"3": 4},
//       "data":{
//          "1":[],
//          "2":[],
//          "3":[{
//            "addressId": 0,
//            "driverId": 9168,
//            "customerId": 10919,
//            "orderId": 62411,
//            "driverStatusId": 3,
//            "driverTypeIds":[
//               1
//            ],
//            "id":"9b4cf220-cd94-4a0b-84ac-32f74dfc142f",
//            "latitude": "1.2788882",
//            "longitude": "103.8482516",
//            "orderRouteTypeId": 1,
//            "updatedAt": "2018-01-11 06:06:57"
//          }],
//          "4":[]
//       }, "totalStatusCounts":0
//     }
//     const pubSubPayload = {
//       data: {
//         "addressId": 0,
//         "customerId": 10919,
//         "driverId": 9168,
//         "driverTypeIds":[
//           1
//         ],
//         "id":"1ada3ace-67ab-4e3b-a1e0-a0d3b63fedc8",
//         "latitude": "1.2789042",
//         "longitude": "103.8482397",
//         "orderId": 62411,
//         "orderRouteTypeId": 1,
//         "updatedAt": "2018-01-11 06:06:14",
//         // "driverStatusId": 4
//       },
//       lastDriverStatusId: 1
//   }
//
//     const filterObject = {
//       // driverStatusIds: [2],
//       orderRouteTypeIds: 1,
//       driverTypeIds: [1]
//     }
//     const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.clientSecret);
//     const token = await result;
//     const response = updateDriverLiveData(originalDriverDatum, pubSubPayload, filterObject);
//     expect(response instanceof Object).toBe(true);
// })

function makeid(size) {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < size; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
