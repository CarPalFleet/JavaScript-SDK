import {
  getRoutesAsync,
  removeRouteAsync,
  createRouteLocationAsync,
  updateRouteLocationAsync,
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

describe('Update route location', () => {
  it('should return true value in data', async () => {
    const result = await updateRouteLocationAsync(
      CONFIG.routeId,
      CONFIG.updateRouteLocationPayload,
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
