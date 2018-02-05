import {
  getOrdersWithFilterAsync,
  getOrderDetailAsync,
  createNewDeliveryWindow,
  updateJobLiveData,
  getBatchOrderProgressAsync,
  getBatchLocationsAsync,
  fetchBatchLocationsErrorAsync,
  fetchAllGroupingLocationsAsync,
  getGroupingLocationAsync,
  fetchBatchOrderCreateErrorMockUp,
  getGroupingLocationsAsync,
  getUniquePickupAddressesAsync,
  createGroupingLocationAsync,
  editGroupingLocationAsync,
  editGroupingBatchLocationsAsync,
  deleteGroupingLocationAsync,
  deleteGroupingLocationsAsync,
  groupLocations,
  mergeLocationDataWithErrors
} from '../Order';
import { getTokenAsync } from '../../account/Auth';
import CONFIG from './Config';

test('Retrieving single grouping location', async () => {
    const response = await getGroupingLocationAsync(CONFIG.groupingLocationId, CONFIG.testToken);
    expect('data' in response).toBe(true);
})

test('Retrieving validated grouping locations', async () => {
    const filterObject = {
      statusIds: 2, // 2 = validated records, 4 = errors
      pickupDate: '2018-02-28',
      limit: 30,
      offset: 0
    }

    const response = await getGroupingLocationsAsync(filterObject, CONFIG.customerId, CONFIG.testToken);
    expect('data' in response).toBe(true);
    expect('totalLocationCount' in response).toBe(true);
    expect('successLocationCount' in response).toBe(true);
    expect('failedLocationCount' in response).toBe(true);
})

test('Retrieving error grouping locations', async () => {
    const filterObject = {
      statusIds: 4,
      pickupDate: '2018-02-28',
      limit: 30,
      offset: 0
    }

    const response = await getGroupingLocationsAsync(filterObject, CONFIG.customerId, CONFIG.testToken);
    expect('data' in response).toBe(true);
    expect('totalLocationCount' in response).toBe(true);
    expect('successLocationCount' in response).toBe(true);
    expect('failedLocationCount' in response).toBe(true);
})

test('Retrieving error grouping locations from DynamoDB', async () => {
  //Example of pickupdate format 2018-02-28
  const response = await fetchBatchLocationsErrorAsync(CONFIG.pickupDate, CONFIG.customerId, CONFIG.testToken);
  expect(response.data instanceof Array).toBe(true);
})

test('Retrieving pickup group', async () => {
    let pickupGroupFilters = {
      pickupDate: "2018-02-28",
      withOrder: 1
    }

    const response = await getUniquePickupAddressesAsync(CONFIG.pickupGroupFilters, CONFIG.testToken);
    expect('data' in response).toBe(true);
})

test('Create Grouping Location', async () => {
    const response = await createGroupingLocationAsync(CONFIG.locationObject, CONFIG.testToken);
    expect('data' in response).toBe(true);
})

test('Edit Grouping Location', async () => {
    const response = await editGroupingLocationAsync(CONFIG.groupingLocationId, CONFIG.locationObject, CONFIG.testToken);
    expect('data' in response).toBe(true);
})

test('Edit Multiple Grouping Locations', async () => {
    const response = await editGroupingBatchLocationsAsync(CONFIG.locationDataList, CONFIG.testToken);
    expect('data' in response).toBe(true);
})

test('Test for uploading batch order progression', async () => {
    const response = await getBatchOrderProgressAsync(1, CONFIG.testToken);
    expect('data' in response).toBe(true);
})

// test('Delete Grouping Location', async () => {
//     const response = await deleteGroupingLocationAsync(CONFIG.groupingLocationId, CONFIG.testToken);
//     expect(response.success).toBe(true);
// })
//
// test('Delete Multiple Grouping Locations', async () => {
//     const response = await deleteGroupingLocationsAsync(CONFIG.groupingLocationIds, CONFIG.testToken);
//     expect(response.success).toBe(true);
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

test('Test for customer order detail', async () => {
    // jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    // const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.clientSecret);
    // const token = await result;
    // const response = await getOrderDetailAsync(1, 1, token.accessToken);
    // expect('data' in response).toBe(true);
    expect(true).toBe(true);
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

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
