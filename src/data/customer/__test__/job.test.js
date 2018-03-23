import {getJobDetailAsync, getJobSummaryAsync} from '../Job';
import {getTokenAsync} from '../../account/Auth';
import CONFIG from './Config';

describe('Retrieve whitelabel', () => {
  it('Should get driver details', async () => {
    const result = getTokenAsync(
      CONFIG.temail,
      CONFIG.tpassword,
      CONFIG.clientId,
      CONFIG.clientSecret
    );
    const token = await result;
    const response = await getJobDetailAsync(CONFIG.orderId, token.accessToken);
    expect('data' in response).toBeTruthy();
    expect(true).toBeTruthy();
  });
});

describe('Retrieve whitelabel', () => {
  it('Should get driver submmary', async () => {
    const result = getTokenAsync(
      CONFIG.temail,
      CONFIG.tpassword,
      CONFIG.clientId,
      CONFIG.clientSecret
    );
    const token = await result;
    const response = await getJobSummaryAsync(
      CONFIG.orderId,
      token.accessToken
    );
    expect('data' in response).toBeTruthy();
    expect(true).toBeTruthy();
  });
});

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
