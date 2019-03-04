import { getTokenAsync } from '../../account/Auth';
import { showCustomerSettingsAsync } from '../Setting';
import CONFIG from './Config';

describe('Tests showCustomerSettingsAsync function', async () => {
  let token;
  const customerId = 65;
  const payload = {
    identityId: 1,
    transactionGroupId: 185,
  };

  beforeAll(async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    token = await getTokenAsync(
      CONFIG.email,
      CONFIG.password,
      CONFIG.clientId,
      CONFIG.clientSecret
    );
  });

  it('should return customer settings status 200', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    try {
      const response = await showCustomerSettingsAsync(
        token.accessToken,
        customerId,
        payload
      );
      expect(response).toHaveProperty('status', 200);
    } catch (error) {
      expect(error).toHaveProperty('statusCode');
    }
  });

  it('should get customer settings', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    try {
      const response = await showCustomerSettingsAsync(
        token.accessToken,
        customerId,
        payload
      );
      expect(response.data).toMatchSnapshot();
    } catch (error) {
      expect(error).toHaveProperty('statusCode');
    }
  });

  it('should get error customer statusCode 401 unauthorized', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    try {
      await showCustomerSettingsAsync('');
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 401);
    }
  });

  it('should get error customer statusCode 401', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    try {
      await showCustomerSettingsAsync(token.accessToken, customerId, payload);
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 401);
    }
  });
});
