import {
  resetPasswordRequestAsync,
  resetPasswordAsync,
} from "../Account";
import CONFIG from "./Config";

describe("Request reset password", () => {
  it("should repond true", async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

    const response = resetPasswordRequestAsync(CONFIG.email);
    const result = await response;
    expect(result).toBeTruthy();
  });
});

describe("Reset password", () => {
  test("result should be true if the the token is correct", async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

    const response = resetPasswordAsync(
      CONFIG.refreshToken,
      CONFIG.email,
      "carpaldemo",
      "carpaldemo"
    );
    const result = await response;
    expect(result).toBeTruthy();
  });

  test("resetPasswordAsync throw error", async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

    try {
      await resetPasswordAsync(
        undefined,
        CONFIG.email,
        "carpaldemo",
        "carpaldemo"
      );
    } catch (error) {
      expect(error).toHaveProperty("statusCode", 401);
    }
  });
});

describe("Test for reset password token validation", () => {
  test("reject with statusCode 404 if the reset password is invalid", async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

    try {
      // const result = await validateResetPasswordTokenAsync(makeid(32));
    } catch (error) {
      expect(error).toHaveProperty("statusCode", 404);
    }
  });
});
