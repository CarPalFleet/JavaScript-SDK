import {
  resetPasswordRequestAsync,
  resetPasswordAsync,
  validateResetPasswordTokenAsync,
} from '../Account';
import CONFIG from './Config';

describe('Request reset password', () => {
  it('should repond true with 204', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

    try {
      const response = await resetPasswordRequestAsync(CONFIG.email);
      expect(response).toHaveProperty('status', 204);
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 400);
    }
  });

  it('should repond true with 400', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

    try {
      const response = await resetPasswordRequestAsync('test');
      expect(response).toBeTruthy();
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 400);
    }
  });
});

describe('Reset password', () => {
  test('result should be true if the the token is correct', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

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
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

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
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

    try {
      const result = await validateResetPasswordTokenAsync(12);
      expect(result).toHaveProperty('statusCode', 204);
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 404);
    }
  });
});
