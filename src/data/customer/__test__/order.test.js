import {
  broadcastToFreelancers,
  createOrderAsync,
  deleteOrderAsync,
  deleteOrdersAsync,
  editOrderAsync,
  editOrderSync,
  deleteOrderDispatchAsync,
  getErrorOrderContentsAsync,
  getOrderAsync,
  getOrderStatusReasonAsync,
  getOrdersGroupByPickUpAddressAsync,
  getOrderUploadTemplateAsync,
  getRemainingOrdersCountAsync,
  getUniquePickupAddressesAsync,
  getUploadedOrderProgressionAsync,
  updateOrderDispatchTo3PL,
  updateOrderStatus,
} from '../Order';
import { getTokenAsync } from '../../account/Auth';
import { getCSVStringFromArrayObject } from '../../utility/Util';

import CONFIG from './Config';

let token;
beforeAll(async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
  token = await getTokenAsync(
    CONFIG.email,
    CONFIG.password,
    CONFIG.clientId,
    CONFIG.clientSecret
  );
});

describe('Order tests', async () => {
  it('Should get template file for order upload', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    try {
      const response = await getOrderUploadTemplateAsync(
        CONFIG.pickupDate,
        token.accessToken
      );

      expect(response).toEqual(jasmine.any(Object));
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 404);
    }
  });

  it('Retrieving single order, expect 404', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    const params = {
      include:
        'route_locations,service_providers.customer.user,quote,service_type,vehicle_service,job_driver.user,driver_fee',
    };

    try {
      const response = await getOrderAsync(
        CONFIG.groupingLocationId,
        params,
        token.accessToken
      );
      expect('data' in response).toBeTruthy();
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 404);
    }
  });

  it('Retrieving validated orders', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    const filterObject = {
      statusIds: 2, // 2 = validated records, 4 = errors
      pickupDate: '2018-02-28',
      limit: 30,
      offset: 0,
    };

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

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

  it('Retrieving orders empty batch', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    const filterObject = {
      statusIds: 4,
      pickupDate: '2010-02-28',
      limit: 30,
      offset: 0,
    };

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
      expect(response).toHaveProperty('totalLocationCount', 0);
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 400);
    }
  });

  it('Retrieving Remaining Order Count', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    const filterObject = {
      pickupDate: '2018-04-15',
      withJob: 0,
    };

    try {
      const responseCount = await getRemainingOrdersCountAsync(
        filterObject,
        token.accessToken
      );
      expect('totalCount' in responseCount).toBeTruthy();
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 401);
    }
  });

  it('Retrieving error orders from DynamoDB', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    try {
      const response = await getErrorOrderContentsAsync(
        {
          pickupDateStart: CONFIG.pickupDate,
          pickupDateEnd: CONFIG.pickupDate,
        },
        token.accessToken
      );
      expect(response.data instanceof Array).toBeTruthy();
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 401);
    }
  });

  it('Retrieving pickup group', async () => {
    let pickupGroupFilters = {
      pickupDate: '2018-02-05',
      withOrder: 0,
    };
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

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

  it('Create Order with date in the past', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    try {
      const response = await createOrderAsync(
        CONFIG.locationObject,
        token.accessToken
      );
      expect('data' in response).toBeTruthy();
    } catch (error) {
      const expected = {
        errorMessage: [
          {
            key: 'orderData',
            messages: {
              pickupDate: [
                'The pickup date should be after or equal current date.',
              ],
            },
          },
        ],
        statusCode: 400,
        statusText: 'Bad Request',
        message: 'Bad Request',
      };
      expect(error).toEqual(expected);
    }
  });

  it('Create Order with date in the future', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

    try {
      const response = await createOrderAsync(
        CONFIG.locationObjectFutureDate,
        token.accessToken
      );
      expect('data' in response).toBeTruthy();
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 400);
    }
  });

  it('Edit Order not found', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    try {
      const response = await editOrderAsync(
        1,
        { pickupDate: '28-02-2018' },
        token.accessToken
      );

      expect('data' in response).toBeTruthy();
    } catch (error) {
      const expected = {
        errorMessage: [{ key: 'orderId', messages: ['Order not found'] }],
        statusCode: 404,
        statusText: 'Not Found',
        message: 'Not Found',
      };
      expect(error).toEqual(expected);
    }
  });

  it('Edit Order Sync not found', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    try {
      const response = await editOrderSync(
        1,
        { pickupDate: '28-02-2018' },
        {},
        token.accessToken
      );

      expect('data' in response).toBeTruthy();
    } catch (error) {
      const expected = {
        errorMessage: [{ key: 'orderId', messages: ['Order not found'] }],
        statusCode: 404,
        statusText: 'Not Found',
        message: 'Not Found',
      };
      expect(error).toEqual(expected);
    }
  });

  it('Test for uploading batch order progression', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    try {
      const response = await getUploadedOrderProgressionAsync(
        1,
        token.accessToken
      );
      expect('data' in response).toBeTruthy();
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 401);
    }
  });

  it('Delete Grouping Location not found', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    try {
      const response = await deleteOrderAsync(1, token.accessToken);
      expect(response.data).toBeTruthy();
    } catch (error) {
      const expected = {
        statusCode: 404,
        statusText: 'Not Found',
        message: 'Not Found',
        errorMessage: [{ key: 'orderId', messages: ['Order not found'] }],
      };
      expect(error).toEqual(expected);
    }
  });

  it('Delete Multiple Grouping Locations not found', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    try {
      const response = await deleteOrdersAsync(
        CONFIG.groupingLocationIds,
        token.accessToken
      );
      expect(response.data).toBeTruthy();
    } catch (error) {
      const expected = {
        statusCode: 404,
        statusText: 'Not Found',
        message: 'Not Found',
        errorMessage: [{ key: 'orderIds', messages: ['Order not found'] }],
      };
      expect(error).toEqual(expected);
    }
  });

  it('Update orders to dispatch to 3PL', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    try {
      await updateOrderDispatchTo3PL([], token.accessToken);
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 400);
    }
  });

  it('Broadcast orders to freelancers', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    const params = {
      order_ids: [10001],
    };

    try {
      const response = await broadcastToFreelancers(params, token.accessToken);
      expect(response).toMatchSnapshot();
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 400);
    }
  });

  it('Delete Order dispatch', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    try {
      const response = await deleteOrderDispatchAsync(1, token.accessToken);
      expect(response.data).toBeTruthy();
    } catch (error) {
      const expected = {
        statusCode: 404,
        statusText: 'Not Found',
        message: 'Not Found',
        errorMessage: [{ key: 'orderId', messages: ['Order not found'] }],
      };
      expect(error).toEqual(expected);
    }
  });
});

describe('Convert Ids into CSV string', () => {
  it('should response string', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    const response = await getCSVStringFromArrayObject(
      CONFIG.searchResult,
      CONFIG.fieldName
    );
    expect.stringContaining(response);
  });
});

describe('Cancel Order', () => {
  it('Retrieve getOrderStatusReasonAsync, expect 404', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    const statusId = 11;

    try {
      const response = await getOrderStatusReasonAsync(
        statusId,
        token.accessToken
      );
      expect('data' in response).toBeTruthy();
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 404);
    }
  });

  it('Update orders status', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    const orderId = 1;
    const payload = {
      status_id: '11',
      order_status_reason_id: 0,
      notes: 'string',
    };
    try {
      await updateOrderStatus(orderId, payload, token.accessToken);
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 404);
    }
  });
});

// TODO: needs to be fixed
/* test("Edit Multiple Grouping Locations not found", async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

  const result = getTokenAsync(
    CONFIG.email,
    CONFIG.password,
    CONFIG.clientId,
    CONFIG.clientSecret
  );
  const token = await result;

  try {
     const response = await editOrdersAsync(1,token.accessToken);
     expect("data" in response).toBeTruthy();
  } catch (error) {
console.log(error);
    const expected = {"errorMessage": [{"key": "0", "messages": "Grouping Location not found"}], "statusCode": 400, "statusText": "Bad Request"};
    expect(error).toEqual(expected);
  }
});*/

// TODO: needs to be fixed
/* test("Test for file uploading", async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

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

    expect("groupingBatchId" in response.data).toBeTruthy();
    expect(true).toBeTruthy();
    console.log(response);
  } catch (error) {
      console.log(error);
      expect(error).toHaveProperty("statusCode", 401);
  }
});*/

// TODO: needs to be fixed
/* test("Test for file uploading error", async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

  const response = await fileUploadForOrderAsync(
    {grouping_spreadsheet: 12},
    CONFIG.token
  );

  expect("error" in response).toBeTruthy();
});*/
