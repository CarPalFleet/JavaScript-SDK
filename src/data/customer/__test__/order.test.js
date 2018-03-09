import {
  getOrderDetailAsync,
  createNewDeliveryWindow,
  getBatchOrderProgressAsync,
  fetchBatchLocationsErrorAsync,
  getGroupingLocationAsync,
  getGroupingLocationsAsync,
  getUniquePickupAddressesAsync,
  createGroupingLocationAsync,
  editGroupingLocationAsync,
  editGroupingLocationsAsync,
  deleteGroupingLocationAsync,
  deleteGroupingLocationsAsync,
  removeOrderWithErrorAsync,
  updateAndTruncateOrderErrorsAsync,
  removeOrderErrorRecordsAsync,
} from '../Order';
import {getTokenAsync} from '../../account/Auth';
import CONFIG from './Config';

test('Retrieving single grouping location', async () => {
  const result = getTokenAsync(
    CONFIG.temail,
    CONFIG.tpassword,
    CONFIG.clientId,
    CONFIG.clientSecret
  );
  const token = await result;
  const response = await getGroupingLocationAsync(
    CONFIG.groupingLocationId,
    token.accessToken
  );
  expect('data' in response).toBe(true);
});

test('Retrieving validated grouping locations', async () => {
  const filterObject = {
    statusIds: 2, // 2 = validated records, 4 = errors
    pickupDate: '2018-02-28',
    limit: 30,
    offset: 0,
  };

  const result = getTokenAsync(
    CONFIG.temail,
    CONFIG.tpassword,
    CONFIG.clientId,
    CONFIG.clientSecret
  );
  const token = await result;
  const response = await getGroupingLocationsAsync(
    filterObject,
    CONFIG.customerId,
    token.accessToken
  );
  expect('data' in response).toBe(true);
  expect('totalLocationCount' in response).toBe(true);
  expect('successLocationCount' in response).toBe(true);
  expect('failedLocationCount' in response).toBe(true);
});

test('Retrieving error grouping locations', async () => {
  const filterObject = {
    statusIds: 4,
    pickupDate: '2018-02-28',
    limit: 30,
    offset: 0,
  };

  const result = getTokenAsync(
    CONFIG.temail,
    CONFIG.tpassword,
    CONFIG.clientId,
    CONFIG.clientSecret
  );
  const token = await result;
  const response = await getGroupingLocationsAsync(
    filterObject,
    CONFIG.customerId,
    token.accessToken
  );
  expect('data' in response).toBe(true);
  expect('totalLocationCount' in response).toBe(true);
  expect('successLocationCount' in response).toBe(true);
  expect('failedLocationCount' in response).toBe(true);
});

describe('Remove order with error record', () => {
  it('should remove specific order record. If it is deleted, response data should be true', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const result = getTokenAsync(
      CONFIG.temail,
      CONFIG.tpassword,
      CONFIG.clientId,
      CONFIG.clientSecret
    );
    const token = await result;

    const response = await removeOrderWithErrorAsync(27840, token.accessToken);
    expect('data' in response).toBeTruthy();
    expect(response.data).toBeTruthy();
  });
});

test('Retrieving error grouping locations from DynamoDB', async () => {
  // Example of pickupdate format 2018-02-28
  const result = getTokenAsync(
    CONFIG.temail,
    CONFIG.tpassword,
    CONFIG.clientId,
    CONFIG.clientSecret
  );
  const token = await result;
  const response = await fetchBatchLocationsErrorAsync(
    CONFIG.pickupDate,
    CONFIG.customerId,
    token.accessToken
  );
  expect(response.data instanceof Array).toBe(true);
});

describe('Call API to update error records and Remove batch errors of order from Dynamodb', () => {
  it('Should return {data: {}, isUpdatedOrder: true, isTruncateErrorReords: true}', async () => {
    const response = await updateAndTruncateOrderErrorsAsync(
      CONFIG.orderWithErrorIds,
      CONFIG.locationDataList,
      CONFIG.token
    );
    expect('data' in response).toBeTruthy();
  });
});

describe('Remove batch errors of order from Dynamodb', () => {
  it('Should response an object and data should be true.', async () => {
    const response = await removeOrderErrorRecordsAsync(
      CONFIG.orderWithErrorIds,
      CONFIG.token
    );
    expect('data' in response).toBeTruthy();
    expect(response.data).toBeTruthy();
  });
});

describe('Remove one error record of order from Dynamodb', () => {
  it('Should response an object and data should be true.', async () => {
    const response = await removeOrderErrorRecordsAsync(
      CONFIG.groupingBatchId,
      CONFIG.token
    );
    expect('data' in response).toBeTruthy();
    expect(response.data).toBeTruthy();
  });
});

test('Retrieving pickup group', async () => {
  let pickupGroupFilters = {
    pickupDate: '2018-02-05',
    withOrder: 0,
  };

  const result = getTokenAsync(
    CONFIG.temail,
    CONFIG.tpassword,
    CONFIG.clientId,
    CONFIG.clientSecret
  );
  const token = await result;
  const response = await getUniquePickupAddressesAsync(
    pickupGroupFilters,
    token.accessToken
  );
  expect('data' in response).toBe(true);
  expect(response.data instanceof Array).toBe(true);
});

test('Create Grouping Location', async () => {
  const result = getTokenAsync(
    CONFIG.temail,
    CONFIG.tpassword,
    CONFIG.clientId,
    CONFIG.clientSecret
  );
  const token = await result;
  const response = await createGroupingLocationAsync(
    CONFIG.locationObject,
    token.accessToken
  );
  expect('data' in response).toBe(true);
});

test('Edit Grouping Location', async () => {
  const result = getTokenAsync(
    CONFIG.temail,
    CONFIG.tpassword,
    CONFIG.clientId,
    CONFIG.clientSecret
  );
  const token = await result;
  const response = await editGroupingLocationAsync(
    CONFIG.groupingLocationId,
    CONFIG.locationObject,
    token.accessToken
  );
  expect('data' in response).toBe(true);
});

test('Edit Multiple Grouping Locations', async () => {
  const result = getTokenAsync(
    CONFIG.temail,
    CONFIG.tpassword,
    CONFIG.clientId,
    CONFIG.clientSecret
  );
  const token = await result;
  const response = await editGroupingLocationsAsync(
    CONFIG.locationDataList,
    token.accessToken
  );
  expect('data' in response).toBe(true);
});

test('Test for uploading batch order progression', async () => {
  const result = getTokenAsync(
    CONFIG.temail,
    CONFIG.tpassword,
    CONFIG.clientId,
    CONFIG.clientSecret
  );
  const token = await result;
  const response = await getBatchOrderProgressAsync(1, token.accessToken);
  expect('data' in response).toBe(true);
});

test('Delete Grouping Location', async () => {
  const result = getTokenAsync(
    CONFIG.temail,
    CONFIG.tpassword,
    CONFIG.clientId,
    CONFIG.clientSecret
  );
  const token = await result;
  const response = await deleteGroupingLocationAsync(
    CONFIG.groupingLocationId,
    token.accessToken
  );
  expect(response.data).toBe(true);
});

test('Delete Multiple Grouping Locations', async () => {
  const result = getTokenAsync(
    CONFIG.temail,
    CONFIG.tpassword,
    CONFIG.clientId,
    CONFIG.clientSecret
  );
  const token = await result;
  const response = await deleteGroupingLocationsAsync(
    CONFIG.groupingLocationIds,
    token.accessToken
  );
  expect(response.data).toBe(true);
});

test('Test for creating new delivery window with product type 1', async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  const result = getTokenAsync(
    CONFIG.email,
    CONFIG.password,
    CONFIG.clientId,
    CONFIG.clientSecret
  );
  const token = await result;
  const response = await createNewDeliveryWindow(
    {
      customerId: 1,
      identityId: 1,
      productTypeId: 1,
      displayName: generateDisplayName(),
      startTime: '9:30',
      endTime: '11:30',
    },
    token.accessToken
  );
  expect('id' in response).toBe(true);
});

test('Test for customer order detail', async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  const result = getTokenAsync(
    CONFIG.email,
    CONFIG.password,
    CONFIG.clientId,
    CONFIG.clientSecret
  );
  const token = await result;
  const response = await getOrderDetailAsync(1, 1, token.accessToken);
  expect('data' in response).toBe(true);
  expect(true).toBe(true);
});

test('Test for creating new delivery window with product type 3 and transaction user account', async () => {
  const result = getTokenAsync(
    CONFIG.temail,
    CONFIG.tpassword,
    CONFIG.clientId,
    CONFIG.clientSecret
  );
  const token = await result;
  const response = await createNewDeliveryWindow(
    {
      customerId: 1,
      identityId: 1,
      productTypeId: 3,
      transactionGroupId: 1,
      displayName: generateDisplayName(),
      startTime: '9:30',
      endTime: '11:30',
    },
    token.accessToken
  );
  expect('id' in response).toBe(true);
});

/**
 * Generate a name
 * @param {int} size
 * @return {string} text
 */
function generateDisplayName() {
  let text = '';
  let possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}
