import { getIdentitiesAsync, getIdentityAsync } from '../Identity';
import { apiResponseErrorHandler } from '../../utility/Util';

describe('Test for identities', () => {
  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
  });

  it('should test identities responses', async () => {
    try {
      const result = await getIdentitiesAsync();
      expect(result.length).toBeTruthy();
    } catch (error) {
      const mockError = apiResponseErrorHandler(error);
      expect(mockError).toEqual(Promise.reject(error));
    }
  });

  it('should test single identity by its id response', async () => {
    try {
      const result = await getIdentityAsync(30);
      expect(result.length).toBeTruthy();
    } catch (error) {
      const mockError = apiResponseErrorHandler(error);
      expect(mockError).toEqual(Promise.reject(error));
    }
  });
});
