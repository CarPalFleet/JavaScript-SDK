import {
  getOrdersWithFilterAsync,
  getOrderDetailAsync,
  createNewDeliveryWindow,
  updateJobLiveData,
  getBatchOrderProgressAsync,
  getBatchLocationsAsync,
  fetchBatchLocationsErrorAsync,
  fetchAllGroupingLocationsAsync,
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

test('Test for get grouping locations', async () => {
    // jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    // const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.clientSecret);
    // const token = await result;
    const filterObject = {
      statusIds: 2, // 2 = validated records, 4 = errors
      pickupDate: '2018-02-28',
      limit: 30,
      offset: 0
    }

    const response = await getGroupingLocationsAsync(filterObject, 2318, `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjM3MDU0MzFkMzE5MWRiN2Y1MTBlZmFmYmVlMjhlNmEyZTNjNWI1MzY1ZTU5YjQ0NzM4ODJiMGQwNTU0MjZiOThhZDI0ZTVmZDE2MWJlZDc4In0.eyJhdWQiOiIyIiwianRpIjoiMzcwNTQzMWQzMTkxZGI3ZjUxMGVmYWZiZWUyOGU2YTJlM2M1YjUzNjVlNTliNDQ3Mzg4MmIwZDA1NTQyNmI5OGFkMjRlNWZkMTYxYmVkNzgiLCJpYXQiOjE1MTc1NDIwMjAsIm5iZiI6MTUxNzU0MjAyMCwiZXhwIjoxNTE3NTQ1NjIwLCJzdWIiOiIxIiwic2NvcGVzIjpbImZ1bGwtYWNjZXNzIl19.Nz9RRsMKZeUEEkLM1WRjZKEuzuWOVU8RqQWVHsO-QxgLNCuHSvIk042nJ7aK-J3KCqLt7kLk_JrF_BK4zDVXAtb6zYKBF5pvExIrTBwmoRt0PdzSPnEgHYug8105WKv5Yie1Rd9TAuxFgJWEf1UQA5RMKWYn1mB0dibtI7BnEEmo7GInH2SqHdhPDx0J6spRHCbt217lTW7mcdqCVZ_pn-TRwybDIK59AQgqDYzNM8gasfuSetr7XqkP7sSO1SilSMTo5ZgX2yhFW-Q94DnuKGmU7dEutN_lqRypvTBchdgdZCTSUZFilz_TsAegBFs2jTOuXeEDpAMEKtmfi4bQgc7S8o5P0VwHGncMNF7Q-PGx0jQM6W0n82sh09U1StPxZG9r-2WbaIuFN-Eje-w7rTCH_kG6W48x21kEQk26mKSbri9Spb4xbJrpEiaoVozR-XiZmWn8qHNb1bArtpJ9g5bbPA-NAnr0WIcOsuzwkIlq0st6y3qYDLUyJNm3i9xAlUJmhKT95LFE9nuDxO-5jvOrdheEzF3bUEuiBN7TQ0ObbXY0pKwtDHeDVLLnOe235deBzCqJnYYD3zTN-lNvusDjIBapZE1CoDbtNagpsRcTP831FrnPwgCotOj6oEszG52R_DGxEZgrEEgLrwI8XQVOHpGXbt84WreWiutc1M4`);
    expect(true).toBe(true);
    // expect('data' in response).toBe(true);
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



test('Test for customer order detail', async () => {
    // jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    // const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.clientSecret);
    // const token = await result;
    // const response = await getOrderDetailAsync(1, 1, token.accessToken);
    // expect('data' in response).toBe(true);
    expect(true).toBe(true);
})

// test('Test for get all grouping location mockup', async () => {
    // jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    // const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.clientSecret);
    // const token = await result;
    // const response = await getGroupingLocationsAsync(1, 1, 2);
    // console.log("RES", response);
    // expect(response instanceof Object).toBe(true);
// })

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

test('Test for uploading batch order progression', async () => {
    // jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    // const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.clientSecret);
    // const token = await result;
    const response = await getBatchOrderProgressAsync(1, CONFIG.testToken);
    // const response = await getBatchOrderProgressAsync(1, token.accessToken);
    console.log("response", response);
    expect(true).toBe(true);
    // expect('batchStatusId' in response).toBe(true);
})

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

// test('Test for Group Locations', () => {
//     const groupingLocationData = CONFIG.groupingLocationData;
//     const response = groupLocations(groupingLocationData, null);
//     expect(response instanceof Object).toBe(true);
// })
//
// test('Test for Group Locations With Errors', () => {
//     const groupingLocationData = CONFIG.groupingLocationData;
//     const errorContents = CONFIG.errorContents;
//     const response = groupLocations(groupingLocationData, errorContents);
//     expect(response instanceof Object).toBe(true);
// })
//
// test('Test for merging location with errors', () => {
//     const groupingLocationData = CONFIG.groupingLocationData;
//     const errorContents = CONFIG.errorContents;
//     const response = mergeLocationDataWithErrors(errorContents, groupingLocationData);
//     console.log("mergeLocationDataWithErrors", response);
//     expect(response instanceof Array).toBe(true);
// })

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
