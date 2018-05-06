import {
  resetPasswordRequestAsync,
  resetPasswordAsync,
  validateResetPasswordTokenAsync,
} from '../Account';
import CONFIG from './Config';
import {customError, apiResponseErrorHandler} from '../../utility/Util';

describe('Request reset password', () => {
  it('should repond true', async () => {
    jest.setTimeout(20000);

    const response = resetPasswordRequestAsync(CONFIG.email);
    const result = await response;
    expect(result).toBeTruthy();
  });
});

describe('Reset password', () => {
  test('result should be true if the the token is correct', async () => {
    jest.setTimeout(20000);

    const response = resetPasswordAsync(
      CONFIG.refreshToken,
      CONFIG.email,
      'carpaldemo',
      'carpaldemo'
    );
    const result = await response;
    expect(result).toBeTruthy();
  });

  test('resetPasswordAsync throw error', async () => {
    jest.setTimeout(20000);

    const error = {
      statusCode: 401,
      statusText: 'Unauthorized',
    };
    try {
      await resetPasswordAsync(
        undefined,
        CONFIG.email,
        'carpaldemo',
        'carpaldemo'
      );
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 401);
    }
  });
});

describe('Test for reset password token validation', () => {
  test('reject with statusCode 404 if the reset password is invalid', async () => {
    jest.setTimeout(20000);

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
