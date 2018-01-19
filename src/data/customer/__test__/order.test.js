import {
  getOrdersWithFilterAsync,
  getOrderDetailAsync,
  createNewDeliveryWindow,
  updateJobLiveData,
  getBatchOrderProgressAsync,
  getBatchLocationsAsync,
  fetchBatchLocationsErrorAsync,
  fetchBatchOrderCreateErrorMockUp,
  getGroupingLocationsAsync,
  groupLocations,
  mergeLocationDataWithErrors
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

// test('Test for fetching batch locations error', async () => {
//     jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
//     const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.clientSecret);
//     const token = await result;
//     const response = await fetchBatchLocationsErrorAsync(1, '2018-01-03', token.accessToken);
//
//     expect(response.data instanceof Array).toBe(true);
// })

// test('Test for fetching customer\'s driver list', async () => {
//     jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
//     const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.clientSecret);
//     const token = await result;
//     const response = await getCustomerDriverListAsync(1, '2018-01-03', token.accessToken);
//
//     expect(response.data instanceof Array).toBe(true);
// })

// test('Test for canceling the batch file upload process', async () => {
//     jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
//     const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.clientSecret);
//     const token = await result;
//     const response = await cancelBatchFileProcessAsync(CONFIG.batchId, token.accessToken);
//
//     expect(response.data instanceof Array).toBe(true);
// })

test('Test for Group Locations', () => {
    const groupingLocationData = CONFIG.groupingLocationData;
    const response = groupLocations(groupingLocationData, null);
    expect(response instanceof Object).toBe(true);
})

test('Test for Group Locations With Errors', () => {
    const groupingLocationData = CONFIG.groupingLocationData;
    const errorContents = CONFIG.errorContents;
    const response = groupLocations(groupingLocationData, errorContents);
    expect(response instanceof Object).toBe(true);
})

test('Test for merging location with errors', () => {
    const groupingLocationData = CONFIG.groupingLocationData;
    const errorContents = CONFIG.errorContents;
    const response = mergeLocationDataWithErrors(errorContents, groupingLocationData);
    console.log("mergeLocationDataWithErrors", response);
    expect(response instanceof Array).toBe(true);
})

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
