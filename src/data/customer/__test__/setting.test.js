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
      14445,
      'routing',
      result.accessToken
    );
    expect(response.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          setting: {},
        }),
      ])
    );
  });
});
