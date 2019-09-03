import { getServiceProviderAsync } from '../ServiceProvider';

import CONFIG from './Config.js';
import { getTokenAsync } from '../../account/Auth';
import { apiResponseErrorHandler } from '../../utility/Util';

describe('Test for Service Provider', () => {
  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
  });

  it('should get service provider details by its id response', async () => {
    const { accessToken } = await getTokenAsync(
      CONFIG.email,
      CONFIG.password,
      CONFIG.clientId,
      CONFIG.clientSecret
    );

    try {
      const result = await getServiceProviderAsync(10001, accessToken);
      expect(result.length).toBeTruthy();
    } catch (error) {
      const mockError = apiResponseErrorHandler(error);
      expect(mockError).toEqual(Promise.reject(error));
    }
  });
});
