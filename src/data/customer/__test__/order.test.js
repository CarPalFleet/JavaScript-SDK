import {
  getOrdersWithFilterAsync,
  getOrderDetailAsync,
  createNewDeliveryWindow,
  updateJobLiveData,
  getBatchOrderProgressAsync,
  getBatchLocationsAsync,
  fetchBatchLocationsErrorAsync,
  fetchBatchOrderCreateErrorMockUp
} from '../Order';
import { getTokenAsync } from '../../account/Auth';
import CONFIG from './Config';

// const ORDER_FILTERS = {
//   withoutMandentoryFields: [
//     { description: 'missing identityId', filters: {identityId: CONFIG.identityId}},
//     { description: 'missing pickupDate', filters: {pickupDate: CONFIG.pickupDate}}
//   ],
//   withMandentoryFields: [
//     { description: 'with mandentory fields', filters: {identityId: CONFIG.identityId, pickupDate: CONFIG.pickupDate}},
//     { description: 'with startPickupDate and endPickupDate', filters: {identityId: CONFIG.identityId, startPickupDate: CONFIG.startPickupDate, endPickupDate: CONFIG.endPickupDate}}
//   ]
// }
//
// describe('Test for customer orders with filters', () => {
//     ORDER_FILTERS.withoutMandentoryFields.forEach((value) => {
//         it(value.description, async () => {
//            const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.clientSecret);
//            const token = await result;
//            const response = getOrdersWithFilterAsync(value.filters, token.accessToken);
//            await expect(response).rejects.toHaveProperty('statusCode', 400)
//         })
//     });
//
//     ORDER_FILTERS.withMandentoryFields.forEach((value) => {
//         it(value.description, async () => {
//            const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.clientSecret);
//            const token = await result;
//            const response = await getOrdersWithFilterAsync(value.filters, token.accessToken);
//            expect(response instanceof Object).toBe(true);
//         })
//     });
// });

// const ORDER_FILTERS = {
//   withoutMandentoryFields: [
//     //{ description: 'missing identityId', filters: {identityId: CONFIG.identityId}},
//     { description: 'missing pickupDate', filters: {pickupDate: CONFIG.pickupDate}}
//   ],
//   withMandentoryFields: [
//     { description: 'with mandentory fields', filters: {pickupDate: CONFIG.pickupDate, orderStatusIds: CONFIG.statusIds}},
//     { description: 'with startPickupDate and endPickupDate', filters: {pickupDate: CONFIG.pickupDate, orderStatusIds: CONFIG.statusIds}}
//   ]
// }

// describe('Test for customer orders with filters', () => {
//     beforeAll(function() {
//         jasmine.DEFAULT_TIMEOUT_INTERVAL = 999999;
//     });

//     ORDER_FILTERS.withoutMandentoryFields.forEach((value) => {
//         it(value.description, async () => {
//            const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.clientSecret);
//            const token = await result;
//            const response = await getOrdersWithFilterAsync(value.filters, 1, token.accessToken);

//             //expect(response instanceof Object).fail("Lack of mandentory fields");
//             expect(response instanceof Object).to.be.a('function');
//         })
//     });

//     ORDER_FILTERS.withMandentoryFields.forEach((value) => {
//         it(value.description, async () => {
//            const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.clientSecret);
//            const token = await result;
//            const response = await getOrdersWithFilterAsync(value.filters, 1, token.accessToken);

//              expect(response instanceof Array).toBeTruthy();
//         })
//     });
// });

// test('test for get order with filter', async ()=>{
//     const filterObj = {
//         pickupDate: 2017-10-30,
//         orderStatusIds: [1,2,3]
//     }
//
//     const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.clientSecret);
//     const token = await result;
//     const response = await getOrdersWithFilterAsync(filterObj, 1, token.accessToken);
//
//     expect(response instanceof Object).toBeTruthy();
// })

test('Test for customer order detail', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.clientSecret);
    const token = await result;
    const response = await getOrderDetailAsync(1, 1, token.accessToken);
    expect('data' in response).toBe(true);
})

test('Test for creating new delivery window with product type 1', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.clientSecret);
    const token = await result;
    const response = await createNewDeliveryWindow({customerId: 1,
                                                    identityId: 1,
                                                    productTypeId: 1,
                                                    displayName: makeid(),
                                                    startTime: '9:30',
                                                    endTime: '11:30'}, token.accessToken);
    expect('id' in response).toBe(true);
})


// test('Test for creating new delivery window with product type 3 and transaction user account', async () => {
//     const result = getTokenAsync(CONFIG.temail, CONFIG.tpassword, CONFIG.clientId, CONFIG.clientSecret);
//     const token = await result;
//     const response = await createNewDeliveryWindow({customerId: 1,
//                                                     identityId: 1,
//                                                     productTypeId: 3,
//                                                     transactionGroupId:1,
//                                                     displayName: makeid(),
//                                                     startTime: '9:30',
//                                                     endTime: '11:30'}, token.accessToken);
//     expect('id' in response).toBe(true);
// })

// test('Test for uploading batch order progression', async () => {
//     jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
//     const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.clientSecret);
//     const token = await result;
//     const response = await getBatchOrderProgressAsync(1, '2018-01-13', token.accessToken);
//
//     expect('batchStatusId' in response).toBe(true);
//     // expect('batchStatusId' in response).toBe(true);
// })

// test('Test for Batch Order Data', async () => {
//     jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
//     const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.clientSecret);
//     const token = await result;
//     const response = await getBatchLocationsAsync(1, '2018-01-13', token.accessToken);
//
//     expect(response.data instanceof Object).toBe(true);
//     // expect('batchStatusId' in response).toBe(true);
// })

// test('Test for fetching batch locations error', async () => {
//     jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
//     const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.clientSecret);
//     const token = await result;
//     const response = await fetchBatchLocationsErrorAsync(1, '2018-01-03', token.accessToken);
//
//     expect(response.data instanceof Array).toBe(true);
// })

test('Test for pubsub live data for driver', async () =>{
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
        orderStatusId: [2],
        pickupDate: '2017-12-19'
    }
    const result = getTokenAsync(CONFIG.temail, CONFIG.tpassword, CONFIG.clientId, CONFIG.clientSecret);
    const token = await result;
    const response = updateJobLiveData(originalJobDatum, pubSubPayload, filterObject);
    expect(response instanceof Object).toBe(true);
})

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
