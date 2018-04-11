import {getTokenAsync} from '../../account/Auth';
import {
  getUserSettingsAsync,
} from '../Setting';
import CONFIG from './Config';

describe('Retrieve user settings for routing page', () => {
  it('should get an array of settings. ', async () => {
    const response = await getUserSettingsAsync(
      CONFIG.userId,
      'routing',
      CONFIG.token
    );

    const expected = [{setting: {}}];
    expect(response.data).toEqual(expected);
  });
});
