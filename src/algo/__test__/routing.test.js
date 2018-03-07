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

  // REVIEW .toBe(true); can be replaced by .toBeTruthy() you can search and replace in the whole project for that and update all at one
  expect('data' in response).toBe(true);
  // REVIEW this lien doesn't do anything
  expect(true).toBe(true);
});

describe('Retrieve whitelabel', () => {
  it('should response object including whitelabel info', async () => {
    // REVIEW all test using a longer timeout should be E2E test, to test that code as a unit test you need to a use stub or mock for the network call
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const result = getTokenAsync(
      CONFIG.email,
      CONFIG.password,
      CONFIG.clientId,
      CONFIG.clientSecret
    );
    const token = await result;
    // REVIEW getCustomerPreferenceSettingsAsync is not defined
    const response = getCustomerPreferenceSettingsAsync(
      CONFIG.domain,
      token.accessToken
    );
    const whiteLabel = await response;
    await expect(whiteLabel).rejects.toHaveProperty('statusCode', 404);
  });
});
