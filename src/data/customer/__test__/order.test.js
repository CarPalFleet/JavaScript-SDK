import {
  getOrderDetailAsync,
  fileUploadForOrderAsync,
  getUploadedOrderProgressionAsync,
  getErrorOrderContentsAsync,
  getOrderAsync,
  getOrdersGroupByPickUpAddressAsync,
  getUniquePickupAddressesAsync,
  createOrderAsync,
  editOrderAsync,
  editOrdersAsync,
  deleteOrderAsync,
  deleteOrdersAsync,
  removeOrderWithErrorAsync,
  updateAndTruncateOrderErrorsAsync,
  removeOrderErrorRecordsAsync,
  getOrdersBasedOnSearchResult,
  getRemainingOrdersCountAsync,
} from '../Order';
import {getCSVStringFromArrayObject} from '../../utility/Util';
import {getTokenAsync} from '../../account/Auth';

import CONFIG from './Config';

test('Retrieving single grouping location', async () => {
  try {
    const response = await getOrderAsync(CONFIG.groupingLocationId, CONFIG.token);
    expect('data' in response).toBeTruthy();
  } catch (error) {
    console.log('error', error);
  }
}); 

test('Retrieving validated grouping locations', async () => {
    const filterObject = {
      statusIds: 2, // 2 = validated records, 4 = errors
      pickupDate: '2018-02-28',
      limit: 30,
      offset: 0,
    };
    try {
      const response = await getOrdersGroupByPickUpAddressAsync(
        filterObject,
        CONFIG.customerId,
        CONFIG.token
      );
      expect('data' in response).toBeTruthy();
      expect('totalLocationCount' in response).toBeTruthy();
      expect('successLocationCount' in response).toBeTruthy();
      expect('failedLocationCount' in response).toBeTruthy();
    } catch (error) {
      console.log('error', error);
    }
  }
);

test('Retrieving error grouping locations', async () => {
  const filterObject = {
    statusIds: 4,
    pickupDate: '2018-02-28',
    limit: 30,
    offset: 0,
  };
  try {
    const response = await getOrdersGroupByPickUpAddressAsync(
      filterObject,
      CONFIG.customerId,
      CONFIG.token
    );
    expect('data' in response).toBeTruthy();
    expect('totalLocationCount' in response).toBeTruthy();
    expect('successLocationCount' in response).toBeTruthy();
    expect('failedLocationCount' in response).toBeTruthy();
  } catch (error) {
    console.log('error', error)
  }

});

test('Retrieving Remaining Order Count', async () => {

  const filterObject = {
    pickupDate: '2018-04-15',
    withOrder: 0,
  };

  try {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const result = getTokenAsync(
      CONFIG.email,
      CONFIG.password,
      CONFIG.clientId,
      CONFIG.clientSecret
    );
    const token = await result;

    const responseCount = await getRemainingOrdersCountAsync(
      filterObject,
      token.accessToken
    );
    expect('totalCount' in responseCount).toBeTruthy();

    } catch (error) {
      await expect(error).rejects.toHaveProperty('statusCode', 400);
  }
});

describe('Retrieve Order Based on the search result', () => {
  it('should response specific orders array', async () => {
    const response = await getOrdersBasedOnSearchResult(
      CONFIG.customerId,
      CONFIG.filterObject,
      CONFIG.searchResult,
      CONFIG.token
    );
    expect('data' in response).toBeTruthy();
  });
});

describe('Convert Ids into CSV string', () => {
  it('should response string', async () => {
    const response = await getCSVStringFromArrayObject(
      CONFIG.searchResult,
      CONFIG.fieldName
    );
    expect.stringContaining(response);
  });
});

describe('Remove order with error record', () => {
  it('should remove specific order record. If it is deleted, response data should be true', async () => {
    const response = await removeOrderWithErrorAsync(27840, CONFIG.token);
    expect('data' in response).toBeTruthy();
    expect(response.data).toBeTruthy();
  });
});

test('Retrieving error grouping locations from DynamoDB', async () => {
  try {
    const response = await getErrorOrderContentsAsync(
      CONFIG.pickupDate,
      CONFIG.customerId,
      CONFIG.token
    );
    expect(response.data instanceof Array).toBeTruthy();
  } catch (error) {
    console.log('error', error);
  }
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

  const response = await getUniquePickupAddressesAsync(
    pickupGroupFilters,
    CONFIG.token
  );
  expect('data' in response).toBeTruthy();
  expect(response.data instanceof Array).toBeTruthy();
});

test('Create Grouping Location', async () => {
  try {
    const {accessToken} = await getTokenAsync(
      CONFIG.email,
      CONFIG.password,
      CONFIG.clientId,
      CONFIG.clientSecret
    );
    const response = await createOrderAsync(CONFIG.locationObject, accessToken);
    expect('data' in response).toBeTruthy();  
  } catch (error) {
    console.log('error',error)
  }
});

test('Edit Grouping Location', async () => {
  try {
    const response = await editOrderAsync(
      CONFIG.groupingLocationId,
      CONFIG.locationObject,
      CONFIG.token
    );
    expect('data' in response).toBeTruthy();
  } catch (error) {
    console.log('error',error)
  }
});

test('Edit Multiple Grouping Locations', async () => {
  try {
    const {accessToken} = await getTokenAsync(
      CONFIG.email,
      CONFIG.password,
      CONFIG.clientId,
      CONFIG.clientSecret
    );

    const response = await editOrdersAsync(CONFIG.locationDataList, accessToken);
    expect('data' in response).toBeTruthy();    
  } catch (error) {
    console.log('error',error)
  }
});

test('Test for file uploading', async () => {
  let formData = {};

  const {accessToken} = await getTokenAsync(
    CONFIG.email,
    CONFIG.password,
    CONFIG.clientId,
    CONFIG.clientSecret
  );
  const response = await fileUploadForOrderAsync(
    {groupingSpreadsheet: formData},
    accessToken
  );
  expect('groupingBatchId' in response.data).toBeTruthy();
  expect(true).toBeTruthy();
});

test('Test for file uploading error', async () => {
  try {
    const {accessToken} = await getTokenAsync(
      CONFIG.email,
      CONFIG.password,
      CONFIG.clientId,
      CONFIG.clientSecret
    );
    const response = await fileUploadForOrderAsync(
      {grouping_spreadsheet: 12},
      CONFIG.token
    );
    expect('error' in response).toBeTruthy();
  } catch (error) {
    console.log('upload object error', error);
  }

});

test('Test for uploading batch order progression', async () => {
  try {
    const {accessToken} = await getTokenAsync(
      CONFIG.email,
      CONFIG.password,
      CONFIG.clientId,
      CONFIG.clientSecret
    );
    const response = await getUploadedOrderProgressionAsync(1, accessToken);
    expect('data' in response).toBeTruthy();
  } catch (error) {
    console.log('error', error);
  }
});

test('Delete Grouping Location', async () => {
  try {
    const {accessToken} = await getTokenAsync(
      CONFIG.email,
      CONFIG.password,
      CONFIG.clientId,
      CONFIG.clientSecret
    );
    const response = await deleteOrderAsync(
      CONFIG.groupingLocationId,
      accessToken
    );
    expect(response.data).toBeTruthy();    
  } catch (error) {
    console.log('error', error);
  }
});

test('Delete Multiple Grouping Locations', async () => {

  try {
    const {accessToken} = await getTokenAsync(
      CONFIG.email,
      CONFIG.password,
      CONFIG.clientId,
      CONFIG.clientSecret
    );
    const response = await deleteOrdersAsync(
      CONFIG.groupingLocationIds,
      accessToken
    );
    expect(response.data).toBeTruthy();
  } catch (error) {
    console.log('error', error);
  }
});

test('Test for customer order detail', async () => {
  const response = await getOrderDetailAsync(1, 1, CONFIG.token);
  expect('data' in response).toBeTruthy();
  expect(true).toBeTruthy();
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
