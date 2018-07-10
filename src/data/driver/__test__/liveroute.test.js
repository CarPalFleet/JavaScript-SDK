import { sendLiveRouteDataAsync } from '../LiveRoute';
import CONFIG from './Config';

describe('Send driver location Lat/lng records to Dynamodb', () => {
  test('Expect response 404 because of missing driverid', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    try {
      const response = await sendLiveRouteDataAsync(
        CONFIG.liveRoute,
        CONFIG.token
      );
      expect(response.data).toBeTruthy();
    } catch (error) {
      //
      const expected = {
        statusCode: 404,
        statusText: 'Not Found',
        errorMessage: [
          { key: null, messages: ['NotFoundError: Invalid driver ID'] },
        ],
      };

      expect(error).toEqual(expected);
    }
  });
});
