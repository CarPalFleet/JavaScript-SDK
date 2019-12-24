import {
  getRouteDraftDetails,
  getRouteLocationOrder,
  removeRouteAsync,
  storeRouteAsync,
  updateRoutedOrder,
  recalculateRouteOrder,
} from '../Route';
import { getTokenAsync } from '../../account/Auth';

import CONFIG from './Config.js';

describe('Remove Route', () => {
  it('should return 401 not authorized', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    try {
      const result = await removeRouteAsync(CONFIG.routeId, CONFIG.token);
      expect('data' in result).toBeTruthy();
      expect(result.data).toBeTruthy();
    } catch (e) {
      expect(e).toHaveProperty('statusCode', 401);
    }
  });
});

it('should test storeRouteAsync get statusCode 401', async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
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
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
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

it('should test update routed order', async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

  const requestedData = {};
  const routeId = 1;
  const routeLocationId = 1;
  const orderId = 1;

  const { accessToken } = await getTokenAsync(
    CONFIG.email,
    CONFIG.password,
    CONFIG.clientId,
    CONFIG.clientSecret
  );

  try {
    await updateRoutedOrder(
      requestedData,
      routeId,
      routeLocationId,
      orderId,
      accessToken
    );
  } catch (error) {
    expect(error).toHaveProperty('statusCode', 404);
  }
});

it('should test to recalculate route', async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

  const routeId = 1;

  const { accessToken } = await getTokenAsync(
    CONFIG.email,
    CONFIG.password,
    CONFIG.clientId,
    CONFIG.clientSecret
  );

  try {
    await recalculateRouteOrder(routeId, accessToken);
  } catch (error) {
    expect(error).toHaveProperty('statusCode', 404);
  }
});

it('should test to get route location order', async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

  const routeId = 1001;
  const routeLocationId = 10001;

  const { accessToken } = await getTokenAsync(
    CONFIG.email,
    CONFIG.password,
    CONFIG.clientId,
    CONFIG.clientSecret
  );

  try {
    await getRouteLocationOrder(routeId, routeLocationId, accessToken);
  } catch (error) {
    expect(error).toHaveProperty('statusCode', 404);
  }
});

it('should test to get order draft details', async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

  const routeId = 1001;
  const routeLocationId = 10001;
  const orderId = 111111;
  const filterObj = {};

  const { accessToken } = await getTokenAsync(
    CONFIG.email,
    CONFIG.password,
    CONFIG.clientId,
    CONFIG.clientSecret
  );

  try {
    await getRouteDraftDetails(
      routeId,
      routeLocationId,
      orderId,
      filterObj,
      accessToken
    );
  } catch (error) {
    expect(error).toHaveProperty('statusCode', 404);
  }
});
