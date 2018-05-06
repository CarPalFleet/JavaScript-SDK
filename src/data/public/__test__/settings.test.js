import {getCustomerPublicProfileSettingsAsync} from '../Setting';
import {apiResponseErrorHandler} from '../../utility/Util';
import CONFIG from '../__test__/Config';

describe('Test for getCustomerPublicProfileSettingsAsync function', () => {
  beforeEach(() => {
    jest.setTimeout(10000);
  });
  // TODO put correct domain name, now it's throw an error 404
  //   it('getCustomerPublicProfileSettingsAsync success response', async () => {
  //     const response = await getCustomerPublicProfileSettingsAsync(CONFIG.domain);
  //     expect(response).toMatchSnapshot();
  //     expect(response.length).toBeTruthy();
  //   });

  it('should test getCustomerPublicProfileSettingsAsync error', async () => {
    try {
      await getCustomerPublicProfileSettingsAsync();
    } catch (error) {
      const mockError = apiResponseErrorHandler(error);
      expect(mockError).toEqual(Promise.reject(error));
    }
  });
});
