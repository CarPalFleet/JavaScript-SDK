import {
  getRoutesAsync,
  removeRouteAsync,
  createRouteLocationAsync,
  removeRouteLocationsAsync,
  storeRouteAsync,
} from '../Route';
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

it('should test storeRouteAsync get statusCode 401', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const payload = {
    routes: CONFIG.createRoutePayload,
    replaceAllExisting: true,
  };
    try {
      await storeRouteAsync(payload, '');
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 401);
    }
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
