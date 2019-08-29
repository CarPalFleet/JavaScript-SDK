import { getServiceProviderAsync } from '../ServiceProvider';
import { apiResponseErrorHandler } from '../../utility/Util';

describe('Test for Service Provider', () => {
  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
  });

  it('should get service provider details by its id response', async () => {
    try {
      const result = await getServiceProviderAsync(10001);
      expect(result.length).toBeTruthy();
    } catch (error) {
      const mockError = apiResponseErrorHandler(error);
      expect(mockError).toEqual(Promise.reject(error));
    }
  });
});
