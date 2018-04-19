import {getTokenAsync} from '../../account/Auth';
import {
  getUserSettingsAsync,
} from '../Setting';
import CONFIG from './Config';

describe('Retrieve user settings for routing page', () => {
  it('should return object with Data. ', async () => {
    const result = getTokenAsync(
      CONFIG.email,
      CONFIG.password,
      CONFIG.clientId,
      CONFIG.clientSecret
    );
    const token = await result;

    const responseUserSetting = await getUserSettingsAsync(
      1,
      'routing',
      token.accessToken
    );

    expect('data' in responseUserSetting).toBeTruthy();
  });
});
