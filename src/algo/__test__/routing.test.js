import { getTokenAsync } from '../../data/account/Auth';
import { optimizeRouteAsync } from '../Routing';
import CONFIG from './Config';

describe('Call route optimization endpoints', () => {
  it('should response true value', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
    const result = getTokenAsync(
      CONFIG.email,
      CONFIG.password,
      CONFIG.clientId,
      CONFIG.clientSecret
    );
    const token = await result;
    let payload = {
      date: '2018-02-28',
      routeSettingId: 28,
      routingScope: 'all',
    };

    try {
      const response = await optimizeRouteAsync(payload, token.accessToken);
      await expect('data' in response).toBeTruthy();
    } catch (e) {
      const expected = {
        statusCode: 400,
        statusText: 'Bad Request',
        errorMessage: [
          {
            key: 'routeSettingId',
            messages: ['Route Setting does not belong to you'],
          },
        ],
      };
      expect(e).toEqual(expected);
    }
  });
});
