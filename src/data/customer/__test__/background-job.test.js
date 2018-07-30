import { getTokenAsync } from '../../account/Auth';
import { getLatestBackgroundJob } from '../Background-Job';
import CONFIG from './Config';

/**
 * this function checkes the expected properies in job
 * @param {object} response
 */
function expectedJobProps(response) {
  expect('data' in response).toBeTruthy();

  const data = response.data;
  expect('backgroundJobTypeId' in data).toBeTruthy();
  expect('backgroundJobTypeName' in data).toBeTruthy();
  expect('backgroundJobStatusId' in data).toBeTruthy();
  expect('backgroundJobStatusName' in data).toBeTruthy();
  expect('userId' in data).toBeTruthy();
}

describe('Tests getLatestBackgroundJob function', async () => {
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

  it('should response object including 200 status when type is 1(Optimize Route)', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    // type 1 is optimized routes
    const response = await getLatestBackgroundJob(1, token.accessToken);
    expect('data' in response).toBeTruthy();

    expectedJobProps(response);
  });

  it('should response object including 200 status when type is 2(Generate Driver Availability)', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    // type 2 is Generate Driver Availability
    const response = await getLatestBackgroundJob(2, token.accessToken);
    expectedJobProps(response);
  });

  it('should response object including 200 status when type is 3(Generate Driver Order Recommendations)', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    // type 3 is Generate Driver Order Recommendations
    const response = await getLatestBackgroundJob(3, token.accessToken);
    expectedJobProps(response);
  });

  it('should response error including 401', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    try {
      await getLatestBackgroundJob(3, '1234');
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 401);
    }
  });

  it('should response error including 400', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    // id 4 is passed which is a validation error
    try {
      await getLatestBackgroundJob(4, token.accessToken);
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 400);
    }
  });
});
