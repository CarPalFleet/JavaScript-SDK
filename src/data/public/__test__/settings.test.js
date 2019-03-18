import { getCustomerPublicProfileSettingsAsync } from '../Setting';
import { apiResponseErrorHandler } from '../../utility/Util';

describe('Test for getCustomerPublicProfileSettingsAsync function', () => {
  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
  });

  it('should test getCustomerPublicProfileSettingsAsync error', async () => {
    try {
      const response = await getCustomerPublicProfileSettingsAsync();
      expect(response.length).toBeTruthy();
    } catch (error) {
      const mockError = apiResponseErrorHandler(error);
      expect(mockError).toEqual(Promise.reject(error));
    }
  });
});
