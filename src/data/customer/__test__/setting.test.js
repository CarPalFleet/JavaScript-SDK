import { getTokenAsync } from '../../account/Auth';
import {
  getCustomerPreferenceSettingsAsync,
  showCustomerSettingsAsync,
  getCustomerSettingsAsync,
} from '../Setting';
import CONFIG from './Config';

describe('Tests showCustomerSettingsAsync function', async () => {
  let token;
  const customerId = 65;
  const payload = {
    identityId: 1,
    transactionGroupId: 180,
  };

  beforeAll(async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
    token = await getTokenAsync(
      CONFIG.email,
      CONFIG.password,
      CONFIG.clientId,
      CONFIG.clientSecret
    );
  });

  it('should response object including customer settings', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

    const response = getCustomerSettingsAsync(token.accessToken);
    const settings = await response;
    expect('data' in settings).toBeTruthy();
  });

  it('should get error statusCode', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

    const response = getCustomerPreferenceSettingsAsync(
      CONFIG.invalidDomain,
      token.accessToken
    );
    await expect(response).rejects.toHaveProperty('statusCode', 404);
  });

  it('should return customer settings status 200', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

    const response = await showCustomerSettingsAsync(
      token.accessToken,
      customerId,
      payload
    );
    expect(response).toHaveProperty('status', 200);
  });

  it('should get customer settings', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

    const response = await showCustomerSettingsAsync(
      token.accessToken,
      customerId,
      payload
    );
    expect(response.data).toMatchSnapshot();
  });

  it('should get error customer statusCode 400', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

    try {
      await showCustomerSettingsAsync('');
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 400);
    }
  });

  it('should get error customer statusCode 401', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

    try {
      await showCustomerSettingsAsync(token.accessToken, customerId, payload);
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 401);
    }
  });

  it('should get error customer statusCode 403', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

    try {
      await showCustomerSettingsAsync(token.accessToken, '', payload);
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 403);
    }
  });
});
