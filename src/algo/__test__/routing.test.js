import {getTokenAsync} from '../../data/account/Auth';
import {optimizeRouteAsync} from '../Routing';
import CONFIG from './Config';

describe('Call route optimization endpoints', () => {
  it('should response true value', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const result = getTokenAsync(
      CONFIG.email,
      CONFIG.password,
      CONFIG.clientId,
      CONFIG.clientSecret
    );
    const token = await result;
    //TODO: unit tests will fail in the future because of hardcoded ids
    let payload = {
      date: '2018-02-28',
      routeSettingId: 28,
      routingScope: 'all',
    };
    const response = await optimizeRouteAsync(payload, token.accessToken);
    await expect('data' in response).toBeTruthy();
  });
});
