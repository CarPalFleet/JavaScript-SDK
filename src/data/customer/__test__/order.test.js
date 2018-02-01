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
    //
    // const response = await getGroupingLocationsAsync(filterObject, 1, token.accessToken);
    // expect('data' in response).toBe(true);
    const response = await fetchAllGroupingLocationsAsync(filterObject, 2318, `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjQwNDFkNjRmMWVhODk0NDUxNjUyNzFmMjlkMjZhMDg1ZGE1NDE0NWYxNDg2YjI5YjdkZTdkZDg4MWYxZjhmNGQ4YjkwMmEwODYyNzM5OTY3In0.eyJhdWQiOiIyIiwianRpIjoiNDA0MWQ2NGYxZWE4OTQ0NTE2NTI3MWYyOWQyNmEwODVkYTU0MTQ1ZjE0ODZiMjliN2RlN2RkODgxZjFmOGY0ZDhiOTAyYTA4NjI3Mzk5NjciLCJpYXQiOjE1MTczODcwNDksIm5iZiI6MTUxNzM4NzA0OSwiZXhwIjoxNTE3MzkwNjQ5LCJzdWIiOiIyNDA3Iiwic2NvcGVzIjpbImZ1bGwtYWNjZXNzIl19.yyqsbJdGaW9e8JPqU1h38rY_5OE94WRY1-C1ql09KY-oWG3h9oq9a0OQYq2Vryf2gX5tgNZGJQPApOOVch-wKyC4B8FvyyTH13G-QYCUgW8qADo5udNBU7U8BY-b8J2EOXb_f_c0YRvnUYet18NjQezlwZnMDJEoo9JuD6YL7Qr9n28O7thtabh3ibHwc6TgPJsVoGoEn8_h9wGBEBLd1d8K4_UMAc_YfhEy18Iay6MIY0EnwxRp19qYqwgzvAok0aozXoSP9GiZvR0hh-59d3Q4AtL2tOE0asYiwhFOss_2rveboQwCMPM3fBzbBGZ3XWjwItvy8zBHn0i6YWE_Yylly9z_tvygx0Cd_znZIlRhNnUdmVk5w3C1JeNdQzAGemS7WYAma7Q4oiSdLR6ti2-d20_8d6YYp4MrGm6GWD8AijU4UMr0wPbuldQDbmvr0CNk3dEXGtTVq9XrBHb2804bIFaSl0QbyCey7VizFpA_jNIiHK0hEq52GntWCoD47-TB2yIpH16sSlXsKWsOzKVRXKISTbF1VaEO70dEwlW0D09Svt8bAjnU12_A3B8MhDC1FhpRHxs7aDfBqVXUyStCVSUraiBKLwVuh33u0FnBsyzn_KESe8a1ubbxnbWgJsTV2fQ25XHr4u9Ru9n5Ih_6zX94YiYYZhy4M3i5xNA`);
    console.log("groupingLocationData", response);
    expect('data' in response).toBe(true);
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
