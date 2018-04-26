import {
  getRoutesAsync,
  removeRouteAsync,
  createRouteLocationAsync,
  removeRouteLocationsAsync,
  storeRouteAsync,
} from '../Route';

import { createDriverAsync } from '../Driver';
import {getTokenAsync} from '../../account/Auth';

import CONFIG from './Config.js';

describe('Get Routes with filters', () => {
  it('Should response data (array)', async () => {
    const filters = {
      pickupDate: '2018-02-28',
      withAvailability: '',
      withSchedule: '',
      recommendedOrderId: 123,
      limit: 20,
      offset: 0,
    };
    const result = await getRoutesAsync(filters, CONFIG.token);
    expect('data' in result).toBeTruthy();
    expect.arrayContaining(result.data);
  });
});

describe('Remove Route', () => {
  it('should return true value in data', async () => {
    const result = await removeRouteAsync(CONFIG.routeId, CONFIG.token);
    expect('data' in result).toBeTruthy();
    expect(result.data).toBeTruthy();
  });
});

describe('Create new route location', () => {
  it('return created object', async () => {
    const result = await createRouteLocationAsync(
      CONFIG.routeId,
      CONFIG.createRouteLocationPayload,
      CONFIG.token
    );
    expect('data' in result).toBeTruthy();
    expect.objectContaining(result.data);
  });
});

/*describe('Store route location', () => {
  it('should return true value in data', async () => {
    // TODO: function doesn't exist
    const result = await storeRouteLocationAsync(
      CONFIG.createRoutePayload,
      CONFIG.token
    );
    expect('data' in result).toBeTruthy();
    expect(result.data).toBeTruthy();
  });
});*/

describe('Remove route location', () => {
  it('should return true value in data', async () => {
    const result = await removeRouteLocationsAsync(
      CONFIG.routeId,
      CONFIG.routeLocationIds,
      CONFIG.token
    );
    expect('data' in result).toBeTruthy();
    expect(result.data).toBeTruthy();
  });
});

// describe('Retrieve route setting', () => {
//   it('should response route_settings objects', async () => {
//     jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
//     const result = getTokenAsync(
//       CONFIG.email,
//       CONFIG.password,
//       CONFIG.clientId,
//       CONFIG.clientSecret
//     );
//     const token = await result;

//     const settingFilters = {
//       identityId: 1,
//       productTypeId: 3,
//       transactionGroupId: 180,
//     };
//     // TODO: function does not exist
//     const response = await getRouteSettingsAsync(
//       settingFilters,
//       token.accessToken
//     );
//     expect('data' in response).toBe(true);
//     expect('settingRouteSettings' in response.data).toBe(true);
//     expect('settingRouteSettings' instanceof Array).toBe(true);
//   });
// });

describe('Test storeRouteAsync function', async () => {
  const payload = {
    routes: CONFIG.createRoutePayload,
    replaceAllExisting: true,
  };

  it('should test storeRouteAsync success response', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const { accessToken } = await getTokenAsync(
      CONFIG.email,
      CONFIG.password,
      CONFIG.clientId,
      CONFIG.clientSecret
    );
    const driver = await createDriverAsync(CONFIG.driverInfo, 1, accessToken);
    const newPayload = {
      ...payload,
      routes: [
        {
          ...payload.routes[0],
          driverId: driver.id,
        },
      ],
    };
    const result = await storeRouteAsync(newPayload, accessToken);
    expect('data' in result).toBeTruthy();
    expect(result.data).toBeTruthy();
    expect(result.data[0]).toHaveProperty('createdAt')
    expect(result.data[0]).toHaveProperty('creatorUserId');
    expect(result.data[0]).toHaveProperty('customerId');
    expect(result.data[0]).toHaveProperty('driverId');
    expect(result.data[0]).toHaveProperty('id');
    expect(result.data[0]).toHaveProperty('orderId');
    expect(result.data[0]).toHaveProperty('pickupDate');
    expect(result.data[0]).toHaveProperty('routeLocations');
    expect(result.data[0]).toHaveProperty('routeSettings');
    expect(result.data[0]).toHaveProperty('routeStatusId');
    expect(result.data[0]).toHaveProperty('routeStatusName');
    expect(result.data[0]).toHaveProperty('updatedAt');
  });

  it('should test storeRouteAsync get statusCode 400', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const { accessToken } = await getTokenAsync(
      CONFIG.email,
      CONFIG.password,
      CONFIG.clientId,
      CONFIG.clientSecret
    );
    try {
      await storeRouteAsync({}, accessToken);
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 400);
    }
  });

  it('should test storeRouteAsync get statusCode 401', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    try {
      await storeRouteAsync(payload, '');
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 401);
    }
  });
});
