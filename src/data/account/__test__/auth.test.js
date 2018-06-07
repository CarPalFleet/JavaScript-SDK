import { getTokenAsync } from '../Auth';
import config from './Config';

describe('Auth integration test', () => {
  it('verifies a successful accessToken in the return object', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

    const response = await getTokenAsync(
      config.email,
      config.password,
      config.clientId,
      config.clientSecret
    );
    expect(response).toHaveProperty('accessToken');
  });

  it('test for account alpha.test@carpal.me with wrong password', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

    try {
      const response = await getTokenAsync(
        config.email,
        'wrong-password',
        config.clientId,
        config.clientSecret
      );
      expect(response).toBeNull(); // Should not trigger, only if is there is no exception which is not expected behavior
    } catch (error) {
      const expected = {
        errorMessage: [
          { key: null, messages: ['The user credentials were incorrect.'] },
        ],
        statusCode: 401,
        statusText: 'Unauthorized',
      };
      expect(error).toEqual(expected);
    }
  });
});
