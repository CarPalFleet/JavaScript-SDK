import {
  resetPasswordRequestAsync,
  resetPasswordAsync,
  validateResetPasswordTokenAsync,
} from '../Account';
import CONFIG from './Config';

describe('Request reset password', () => {
  it('should repond true', async () => {
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
    try {
      const result = await validateResetPasswordTokenAsync(makeid(32));
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 404);
    }
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
