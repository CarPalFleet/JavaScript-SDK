import { getTokenAsync } from '../../account/Auth';
import { putCustomerSettings, showCustomerSettingsAsync } from '../Setting';
import CONFIG from './Config';

describe('Test showCustomerSettingsAsync function', async () => {
  let token;

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
      const response = await showCustomerSettingsAsync(token.accessToken);
      expect(response).toHaveProperty('status', 200);
    } catch (error) {
      expect(error).toHaveProperty('statusCode');
    }
  });

  it('should get customer settings', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    try {
      const response = await showCustomerSettingsAsync(token.accessToken);
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
      await showCustomerSettingsAsync(token.accessToken);
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 401);
    }
  });
});

describe('test updating customer settings', async () => {
  let token;
  beforeAll(async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    token = await getTokenAsync(
      CONFIG.email,
      CONFIG.password,
      CONFIG.clientId,
      CONFIG.clientSecret
    );
  });

  it('should return 200', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    const settings = await showCustomerSettingsAsync(token.accessToken);
    const response = await putCustomerSettings(token.accessToken, settings.data.data.id, {
      logisticsModelId: 2,
    });

    expect(response).toHaveProperty('status', 200);
    expect(response.data.data).toHaveProperty('logisticsModelId', 2);
  });
});
