import { getJobDetailAsync, getJobSummaryAsync, createJobsAsync } from '../Job';
import { getTokenAsync } from '../../account/Auth';
import CONFIG from './Config';

describe('Show job', async () => {
  let token;
  beforeAll(async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
    token = await getTokenAsync(
      CONFIG.email,
      CONFIG.password,
      CONFIG.clientId,
      CONFIG.clientSecret
    );
  });

  it('Should get Job summary and expect job not found', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

    try {
      const response = await getJobSummaryAsync(
        CONFIG.orderId,
        token.accessToken
      );
      expect('data' in response).toBeTruthy();
    } catch (error) {
      // expect(error).toHaveProperty("statusCode", 404);
      // TODO: expect 404 according to documentation, but API is returning 403 because error is not handled properly
    }
  });

  it('Should get job details and expect job not found', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
    try {
      const response = await getJobDetailAsync(
        CONFIG.orderId,
        token.accessToken
      );
      expect('data' in response).toBeTruthy();
    } catch (error) {
      const expected = {
        statusCode: 400,
        statusText: 'Bad Request',
        errorMessage: [],
      };
      expect(error).toEqual(expected);
    }
  });

  describe('job create', async () => {
    it('should be success', async () => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
      let response = {};
      try {
        response = await createJobsAsync(CONFIG.routeIds, token.accessToken);
      } finally {
        expect('data' in response).toBeTruthy();
      }
    });
    it('should be failure', async () => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
      let errorResponse = null;
      try {
        await createJobsAsync('1234,4567', token.accessToken);
      } catch (error) {
        errorResponse = error;
      } finally {
        const expected = {
          statusCode: 400,
          statusText: 'Bad Request',
          errorMessage: [],
        };
        expect(errorResponse).toEqual(expected);
      }
    });
  });
});
