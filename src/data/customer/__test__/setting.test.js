import {getTokenAsync} from '../../account/Auth';
import {
  getCustomerPreferenceSettingsAsync,
  getCustomerSettingsAsync,
} from '../Setting';
import CONFIG from './Config';

describe('Retrieve whitelabel', () => {
  it('should response object including whitelabel info', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const result = getTokenAsync(
      CONFIG.email,
      CONFIG.password,
      CONFIG.clientId,
      CONFIG.clientSecret
    );
    const token = await result;
    const response = getCustomerPreferenceSettingsAsync(
      CONFIG.domain,
      token.accessToken
    );
    const whiteLabel = await response;
    await expect(whiteLabel).rejects.toHaveProperty('statusCode', 404);
  });
});

describe('Retrieve whitelabel with invalid domain', () => {
  it('should get error statusCode', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const result = getTokenAsync(
      CONFIG.email,
      CONFIG.password,
      CONFIG.clientId,
      CONFIG.clientSecret
    );
    const token = await result;
    const response = getCustomerPreferenceSettingsAsync(
      CONFIG.invalidDomain,
      token.accessToken
    );
    await expect(response).rejects.toHaveProperty('statusCode', 404);
  });
});

describe('Retreive customer setting', () => {
  it('should get the array of settings. ', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const result = getTokenAsync(
      CONFIG.email,
      CONFIG.password,
      CONFIG.clientId,
      CONFIG.clientSecret
    );
    const response = await getCustomerSettingsAsync(
      // REVIEW consider creating a variable for 14445, this is a "magic number" and hard to understand later by you or someone else
      // for example:
      //          const HTTP_ERROR_CODE_FILE_NOT_FOUND = 404
      //          const NUMBER_OF_SECONDS_IN_ONE_DAY = 86400
      14445,
      'routing',
      result.accessToken
    );

    // REVIEW this is quite complicated to process could use here something like
    // const expected = [{setting: {}}];
    // expect(response.data).toEqual(expected);
    expect(response.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          setting: {},
        }),
      ])
    );
  });
});
