import {
  resetPasswordRequestAsync,
  resetPasswordAsync,
  validateResetPasswordTokenAsync,
} from '../Account';
import CONFIG from './Config';

describe('Request reset password token', () => {
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

describe('Reset password with token', () => {
  test('resetPasswordAsync throw 400 because of no or invalid token', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

    try {
      await resetPasswordAsync(
        undefined,
        CONFIG.email,
        'carpaldemo',
        'carpaldemo'
      );
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 400);
    }
  });
});

describe('Test for reset password token validation', () => {
  test('reject with statusCode 404 if the reset token is invalid', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

    try {
      const result = await validateResetPasswordTokenAsync(12);
      expect(result).toHaveProperty('statusCode', 204);
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 404);
    }
  });
});
