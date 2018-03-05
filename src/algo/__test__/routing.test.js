import {getTokenAsync} from '../../data/account/Auth';
import {routeOptimizeAsync} from '../Routing';
import CONFIG from './Config';

test('Test for sending routing optimization.', async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  const result = getTokenAsync(
    CONFIG.email,
    CONFIG.password,
    CONFIG.clientId,
    CONFIG.token
  );
  const token = await result;
  const response = routeOptimizeAsync(
    {
      customerId: 10919,
      autoDispatch: true,
      serviceTime: 1,
      geoFence: false,
      assignTaggedDriver: false,
      speed: 15,
      capacity: 100,
      deliveryWindow: [0, 12000],
      date: '2018-01-16',
    },
    token.accessToken
  );

  expect('data' in response).toBe(true);
  expect(true).toBe(true);
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
