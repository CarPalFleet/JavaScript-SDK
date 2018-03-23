import {
  getRoutesAsync,
  removeRouteAsync,
  createRouteLocationAsync,
  storeRouteLocationAsync,
  removeRouteLocationsAsync,
} from '../Route';
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

describe('Store route location', () => {
  it('should return true value in data', async () => {
    const result = await storeRouteLocationAsync(
      CONFIG.createRoutePayload,
      CONFIG.token
    );
    expect('data' in result).toBeTruthy();
    expect(result.data).toBeTruthy();
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

describe('Retrieve route setting', () => {
  it('should response route_settings objects', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const result = getTokenAsync(
      CONFIG.temail,
      CONFIG.tpassword,
      CONFIG.clientId,
      CONFIG.clientSecret
    );
    const token = await result;

    const settingFilters = {
      identityId: 1,
      productTypeId: 3,
      transactionGroupId: 180,
    };

    const response = await getRouteSettingsAsync(
      settingFilters,
      token.accessToken
    );
    expect('data' in response).toBe(true);
    expect('settingRouteSettings' in response.data).toBe(true);
    expect('settingRouteSettings' instanceof Array).toBe(true);
  });
});
