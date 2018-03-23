import {
  resetPasswordRequestAsync,
  resetPasswordAsync,
  getDriverJobsAsync,
  getDriverLegsAsync,
  validateResetPasswordTokenAsync,
} from '../Account';
import CONFIG from './Config';

describe('Request reset password', () => {
  it('should reponse true', async () => {
    const response = resetPasswordRequestAsync(CONFIG.email);
    const result = await response;
    expect(result).toBeTruthy();
  });
});

describe('Reset password', () => {
  test('result should be true if the the token is correct', async () => {
    const response = resetPasswordAsync(
      CONFIG.refreshToken,
      CONFIG.email,
      'carpaldemo',
      'carpaldemo'
    );
    const result = await response;
    expect(result).toBeTruthy();
  });
});

describe('Test for reset password token validation', () => {
  test('reject with statusCode 404 if the reset password is invalid', async () => {
    const result = await validateResetPasswordTokenAsync(makeid(32));
    await expect(result).rejects.toHaveProperty('statusCode', 404);
  });
});

describe('Get My Job for driver app', () => {
  test('should get MyJobs array', async () => {
    const response = getDriverJobsAsync(1, CONFIG.token, CONFIG.date);
    const myJobs = await response;
    expect(Array.isArray(myJobs)).toBeTruthy();
  });
});

describe('Get My Legs for driver app', () => {
  test('should return array', async () => {
    const response = getDriverLegsAsync(1, CONFIG.token, CONFIG.date);
    const myLegs = await response;
    expect(Array.isArray(myLegs)).toBeTruthy();
  });
});

/**
 * Generate an email address
 * @param {int} size
 * @return {string} text
 */
function makeid(size) {
  let text = '';
  let possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < size; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}
