import {getNotificationsAsync, deleteNotificationAsync} from "../Notification";
import {getTokenAsync} from "../../account/Auth";
import CONFIG from "./Config";

describe("Test for retrieving all notifications", () => {
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

  it("should return all notifications", async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

    const response = getNotificationsAsync(false, 1, token.accessToken);
    const notifications = await response;
    expect("data" in notifications).toBeTruthy();
    expect(notifications.data).toMatchSnapshot();
  });
  it("should delete notification of user", async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
    const deleteResponse = {data: true};

    const response = await deleteNotificationAsync(
      1,
      12121212,
      token.accessToken
    );
    expect("data" in response.data).toBeTruthy();
    expect(response.data).toEqual(deleteResponse);
    expect(true).toBeTruthy();
  });
});
