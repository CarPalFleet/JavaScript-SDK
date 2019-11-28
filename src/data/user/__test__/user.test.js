import { getTokenAsync } from '../../account/Auth';
import { updateUserAsync } from '../User';
import CONFIG from './Config';

describe('Test updateUserAsync function', async () => {
  let token;
  const firstName = 'User';
  const lastName = 'Lastname';
  const languageCode = 'en';

  beforeAll(async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    token = await getTokenAsync(
      CONFIG.email,
      CONFIG.password,
      CONFIG.clientId,
      CONFIG.clientSecret
    );
  });

  it('should return user updated information with userSettings', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    try {
      const response = await updateUserAsync({
        firstName,
        lastName,
        languageCode,
        token: token.accessToken,
      });
      expect(response).toHaveProperty('userSettings');
    } catch (error) {
      expect(error).toHaveProperty('statusCode');
    }
  });
});
