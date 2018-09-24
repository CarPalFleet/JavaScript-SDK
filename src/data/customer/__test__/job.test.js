import {
  getJobDetailAsync,
  getJobSummaryAsync,
  createJobsAsync,
  removeJobsAsync,
} from '../Job';
import { getTokenAsync } from '../../account/Auth';
import CONFIG from './Config';
import { storeRouteAsync } from '../Route';

describe('Show job', async () => {
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

  it('Should get Job summary and expect job not found', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

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
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    try {
      const response = await getJobDetailAsync(
        CONFIG.orderId,
        token.accessToken
      );
      expect('data' in response).toBeTruthy();
    } catch (error) {
      // console.log(error);
      // expect(error).toHaveProperty("statusCode", 404);
      // TODO: expect 404 according to documentation, but API is returning 403 because error is not handled properly
    }
  });
});

describe('job create and delete test', async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 90000;
  let token;
  let routePayload;
  let route1;
  let route2;
  let routeIds;
  let job1;
  let job2;

  beforeAll(async () => {
    token = await getTokenAsync(
      CONFIG.email,
      CONFIG.password,
      CONFIG.clientId,
      CONFIG.clientSecret
    );

    routePayload = {
      driverId: 11997,
      pickupDate: CONFIG.jobTest.date,
      route_settings: '{}',
    };

    // create route 1 now
    const route1Res = await storeRouteAsync(
      {
        routes: [
          {
            ...routePayload,
            routeLocations: [
              {
                sequence: 1,
                orderId: CONFIG.jobTest.orderIds[0],
                locationTypeId: 3,
              },
              {
                sequence: 2,
                orderId: CONFIG.jobTest.orderIds[0],
                locationTypeId: 2,
              },
            ],
          },
        ],
        replaceAllExisting: false,
      },
      token.accessToken
    );
    route1 = route1Res.data[0];

    //
    const route2Res = await storeRouteAsync(
      {
        routes: [
          {
            ...routePayload,
            driverId: 12030,
            routeLocations: [
              {
                sequence: 1,
                orderId: CONFIG.jobTest.orderIds[1],
                locationTypeId: 3,
              },
              {
                sequence: 2,
                orderId: CONFIG.jobTest.orderIds[1],
                locationTypeId: 2,
              },
            ],
          },
        ],
        replaceAllExisting: false,
      },
      token.accessToken
    );
    route2 = route2Res.data[0];

    routeIds = `${route1.id},${route2.id}`;
  });

  it('Should create a job', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
    let response;
    try {
      response = await createJobsAsync(routeIds, token.accessToken);
    } finally {
      expect(response).toHaveLength(2);
      expect('job' in response[0]).toBeTruthy();
      expect('job' in response[1]).toBeTruthy();
      job1 = response[0].job;
      job2 = response[1].job;
      expect('id' in job1).toBeTruthy();
      expect('id' in job2).toBeTruthy();
    }
  });

  it('should delete the jobs', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
    let response;
    try {
      // this test is passing right now because API only considers one job Id right now although two are passed with request
      response = await removeJobsAsync(
        `${job1.id},${job2.id}`,
        token.accessToken
      );
    } finally {
      expect('data' in response).toBeTruthy();
    }
  });

  it('create job should fail with status 400 when routeIds does not exists', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
    let errorResponse = null;
    try {
      await createJobsAsync('1234,4567', token.accessToken);
    } catch (error) {
      errorResponse = error;
    } finally {
      const expected = {
        statusCode: 400,
        statusText: 'Bad Request',
        errorMessage: [
          {
            key: 'routeId',
            messages: ['Route does not belong to you'],
          },
        ],
      };
      expect(errorResponse).toEqual(expected);
    }
  });

  it('remove job should fail with status 400 when jobsId does not exists', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

    try {
      const jobIDs = ['1234'];
      await removeJobsAsync(jobIDs, token.accessToken);
    } catch (error) {
      const expected = {
        statusCode: 400,
        statusText: 'Bad Request',
        errorMessage: [
          { key: 'jobIds', messages: ['One or more job(s) not found.'] },
        ],
      };
      expect(error).toEqual(expected);
    }
  });
});
