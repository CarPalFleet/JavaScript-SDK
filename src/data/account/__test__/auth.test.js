import {getTokenAsync} from '../Auth';
import config from './config';

describe('Auth integration test', () => {
  it('verifies that the token data matches the snapshot', async () => {
    const response = await getTokenAsync(
      config.temail,
      config.tpassword,
      config.clientId,
      config.clientSecret
    );
    expect(response).toMatchSnapshot();
  });

  it('test for account alpha.test@carpal.me with wrong tpassword', async () => {
    try {
      const response = await getTokenAsync(
        config.temail,
        'wrong-password',
        config.clientId,
        config.clientSecret
      );
      expect(response).toBeNull(); // Should not trigger, only if is there is no exception which is not expected behavior
    } catch (error) {
      const expected = {statusCode: 403, statusText: 'Forbidden'};
      expect(error).toEqual(expected);
    }
  });
});
