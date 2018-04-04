import {sendLiveRouteDataAsync} from '../LiveRoute';
import CONFIG from './Config';

describe('Send driver location Lat/lng records to Dynamodb', () => {
  test('Expect response data is true', async () => {
    const response = await sendLiveRouteDataAsync(
      CONFIG.liveRoute,
      CONFIG.token
    );
    expect(response.data).toBeTruthy();
  });
});
