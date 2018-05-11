import {
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
  updateAndTruncateOrderErrorsAsync,
  removeOrderErrorRecordsAsync,
  getRemainingOrdersCountAsync,
} from '../Order';
import {getTokenAsync} from '../../account/Auth';
import {getCSVStringFromArrayObject} from '../../utility/Util';

import CONFIG from './Config';

describe('Order tests', async () => {
  let token;
  beforeAll(async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
    token = await getTokenAsync(
      CONFIG.email,
      CONFIG.password,
      CONFIG.clientId,
      CONFIG.clientSecret
    );
  });

it('Retrieving single grouping location, expect 401', async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

  try {
    const response = await getOrderAsync(CONFIG.groupingLocationId, CONFIG.token);
    expect('data' in response).toBeTruthy();
  } catch (error) {
    expect(error).toHaveProperty('statusCode', 401);
  }
});

it('Retrieving validated grouping locations', async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

  const filterObject = {
    statusIds: 2, // 2 = validated records, 4 = errors
    pickupDate: '2018-02-28',
    limit: 30,
    offset: 0,
  };

  jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

      try {
        const response = await getOrdersGroupByPickUpAddressAsync(
          filterObject,
          CONFIG.customerId,
          token.accessToken
        );
        expect('data' in response).toBeTruthy();
        expect('totalLocationCount' in response).toBeTruthy();
        expect('successLocationCount' in response).toBeTruthy();
        expect('failedLocationCount' in response).toBeTruthy();
      } catch (error) {
        expect(error).toHaveProperty('statusCode', 401);
      }
});

it('Retrieving grouping locations empty batch', async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

  const filterObject = {
    statusIds: 4,
    pickupDate: '2010-02-28',
    limit: 30,
    offset: 0,
  };

  const response = await getOrdersGroupByPickUpAddressAsync(
    filterObject,
    CONFIG.customerId,
    token.accessToken
  );

  try {
    expect('data' in response).toBeTruthy();
    expect('totalLocationCount' in response).toBeTruthy();
    expect('successLocationCount' in response).toBeTruthy();
    expect('failedLocationCount' in response).toBeTruthy();
    expect(response).toHaveProperty('totalLocationCount', 0);

  } catch (error) {
    expect(error).toHaveProperty('statusCode', 401);
  }
});

it('Retrieving Remaining Order Count', async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

  const filterObject = {
    pickupDate: '2018-04-15',
    withOrder: 0,
  };

  try {
    const responseCount = await getRemainingOrdersCountAsync(
      filterObject,
      token.accessToken
    );
    expect('totalCount' in responseCount).toBeTruthy();

    } catch (error) {
      await expect(error).rejects.toHaveProperty('statusCode', 400);
    }
});

it('Retrieving error grouping locations from DynamoDB', async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

  try {
    const response = await getErrorOrderContentsAsync(
      CONFIG.pickupDate,
      CONFIG.customerId,
      token.accessToken
    );
    expect(response.data instanceof Array).toBeTruthy();
  } catch (error) {
    expect(error).toHaveProperty('statusCode', 401);
  }
});

it('Should return not found', async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

  try {
    const response = await updateAndTruncateOrderErrorsAsync(
      CONFIG.orderWithErrorIds,
      CONFIG.locationDataList,
      token.accessToken
    );
    expect('data' in response).toBeTruthy();

  } catch (error) {
    const expected = { statusCode: 400, statusText: 'Bad Request', errorMessage: [] };
    expect(error).toEqual(expected);
  }
});

it('Retrieving pickup group', async () => {
  let pickupGroupFilters = {
    pickupDate: '2018-02-05',
    withOrder: 0,
  };
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

  try {
    const response = await getUniquePickupAddressesAsync(
      pickupGroupFilters,
      token.accessToken
    );
    expect('data' in response).toBeTruthy();
    expect(response.data instanceof Array).toBeTruthy();

  } catch (error) {
    expect(error).toHaveProperty('statusCode', 401);
  }

});

it('Create Grouping Location with date in the past', async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

  try {
    const response = await createOrderAsync(CONFIG.locationObject,token.accessToken);

  } catch (error) {
    const expected = {"errorMessage": [{"key": "0", "messages": "The pickup date should be after or equal current date."}], "statusCode": 400, "statusText": "Bad Request"};
    expect(error).toEqual(expected);
  }
});

it('Create Grouping Location with date in the future', async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

  try {
    const response = await createOrderAsync(CONFIG.locationObjectFutureDate,token.accessToken);
    expect('data' in response).toBeTruthy();
  } catch (error) {
    expect(error).toHaveProperty('statusCode', 401);
  }
});

it('Edit Grouping Location not found', async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

  try {
    const response = await editOrderAsync(
      1,
      '28-02-2018',
      token.accessToken
    );

    expect('data' in response).toBeTruthy();
  } catch (error) {
    const expected = {"errorMessage": [{"key": "0", "messages": "Grouping Location not found"}], "statusCode": 400, "statusText": "Bad Request"};
    expect(error).toEqual(expected);
  }
});

it('Test for uploading batch order progression', async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;


  try {
    const response = await getUploadedOrderProgressionAsync(1, token.accessToken);
    expect('data' in response).toBeTruthy();

  } catch (error) {
    expect(error).toHaveProperty('statusCode', 401);
  }
});

it('Delete Grouping Location not found', async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

  try {
    const response = await deleteOrderAsync(
      1,
      token.accessToken
    );
    expect(response.data).toBeTruthy();

  } catch (error) {
      const expected = { statusCode: 400,
      statusText: 'Bad Request',
      errorMessage: [ { key: '0', messages: 'Grouping Location not found' } ] };
      expect(error).toEqual(expected);
    }
});

it('Delete Multiple Grouping Locations not found', async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

  try {
    const response = await deleteOrdersAsync(
      CONFIG.groupingLocationIds,
      token.accessToken
    );
    expect(response.data).toBeTruthy();
  } catch (error) {
      const expected = { statusCode: 400,
      statusText: 'Bad Request',
      errorMessage: [ { key: '0', messages: 'Grouping Location not found' } ] };
      expect(error).toEqual(expected);
    }
});


});

describe('Convert Ids into CSV string', () => {
  it('should response string', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

    const response = await getCSVStringFromArrayObject(
      CONFIG.searchResult,
      CONFIG.fieldName
    );
    expect.stringContaining(response);
  });
});

describe('Remove batch errors of order from Dynamodb', () => {
  it('Should response an object and data should be true.', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

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
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

    const response = await removeOrderErrorRecordsAsync(
      CONFIG.groupingBatchId,
      CONFIG.token
    );
    expect('data' in response).toBeTruthy();
    expect(response.data).toBeTruthy();
  });
});

//TODO: needs to be fixed
/*test('Edit Multiple Grouping Locations not found', async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

  const result = getTokenAsync(
    CONFIG.email,
    CONFIG.password,
    CONFIG.clientId,
    CONFIG.clientSecret
  );
  const token = await result;

  try {
     const response = await editOrdersAsync(1,token.accessToken);
     expect('data' in response).toBeTruthy();
  } catch (error) {
console.log(error);
    const expected = {"errorMessage": [{"key": "0", "messages": "Grouping Location not found"}], "statusCode": 400, "statusText": "Bad Request"};
    expect(error).toEqual(expected);
  }
});*/

//TODO: needs to be fixed
/*test('Test for file uploading', async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

  const result = getTokenAsync(
    CONFIG.email,
    CONFIG.password,
    CONFIG.clientId,
    CONFIG.clientSecret
  );
  const token = await result;

  try {
    let formData = {};
    const response = await fileUploadForOrderAsync(
      {groupingSpreadsheet: formData},
      token.accessToken
    );

    expect('groupingBatchId' in response.data).toBeTruthy();
    expect(true).toBeTruthy();
    console.log(response);
  } catch (error) {
      console.log(error);
      expect(error).toHaveProperty('statusCode', 401);
  }
});*/

//TODO: needs to be fixed
/*test('Test for file uploading error', async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

  const response = await fileUploadForOrderAsync(
    {grouping_spreadsheet: 12},
    CONFIG.token
  );

  expect('error' in response).toBeTruthy();
});*/

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
