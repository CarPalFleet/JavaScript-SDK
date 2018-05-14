import {
  removeRouteAsync,
  createRouteLocationAsync,
  removeRouteLocationsAsync,
  storeRouteAsync,
} from '../Route';
import {getTokenAsync} from '../../account/Auth';

import CONFIG from './Config.js';

describe('Remove Route', () => {
  it('should return 401 not authorized', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

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
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
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
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
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
