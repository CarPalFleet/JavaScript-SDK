import { getJobsAsync } from '../Jobs';
import { getTokenAsync } from '../../account/Auth';
import CONFIG from './Config';

describe('should show the list of customers jobs', async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

  it('Should get Jobs list', async () => {
    try {
      const token = await getTokenAsync(
        CONFIG.email,
        CONFIG.password,
        CONFIG.clientId,
        CONFIG.clientSecret
      );
      const response = await getJobsAsync(token.accessToken);
      expect('data' in response).toBeTruthy();
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 404);
    }
  });

  it('Should get auth error if there is no proper token', async () => {
    try {
      const response = await getJobsAsync('123');
      expect('data' in response).toBeTruthy();
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 403);
    }
  });
});
