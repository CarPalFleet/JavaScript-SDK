import {getTokenAsync} from "../../account/Auth";
import {
  getUserSettingsAsync,
} from "../Setting";
import CONFIG from "./Config";

describe("Retrieve user settings for routing page", () => {
  let token;
  beforeAll(async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
    token = await getTokenAsync(
      CONFIG.email,
      CONFIG.password,
      CONFIG.clientId,
      CONFIG.clientSecret
    );
  });

  it("should return false user_id and 403 statusCode", async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

    try {
      const responseUserSetting = await getUserSettingsAsync(
        12212,
        "routing",
        token.accessToken
      );
    } catch (error) {
      expect(error).toHaveProperty("statusCode", 403);
    }
  });

  it("should return Data", async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

    try {
      const responseUserSetting = await getUserSettingsAsync(
        25143,
        "routing",
        token.accessToken
      );

      expect("data" in responseUserSetting).toBeTruthy();
    } catch (error) {
      //
    }
  });
});
