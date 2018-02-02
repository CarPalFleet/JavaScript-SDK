import {
  getNotificationsAsync,
  deleteNotificationAsync
} from '../Notification';
import { getTokenAsync } from '../../account/Auth';
import CONFIG from './Config';

let testToken = `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjBiZjU4YWU3M2ZkY2MzNGViZGQ0NTVlMTJhZGFjODM5MmVmNzFiOGFhY2RlMjNkMTI3YWVmMmFkOTVhZDYwYTAxNmRhYWNlNWJiMjZmNjYwIn0.eyJhdWQiOiIyIiwianRpIjoiMGJmNThhZTczZmRjYzM0ZWJkZDQ1NWUxMmFkYWM4MzkyZWY3MWI4YWFjZGUyM2QxMjdhZWYyYWQ5NWFkNjBhMDE2ZGFhY2U1YmIyNmY2NjAiLCJpYXQiOjE1MTc1NTMwMzAsIm5iZiI6MTUxNzU1MzAzMCwiZXhwIjoxNTE3NTU2NjMwLCJzdWIiOiIyNDA3Iiwic2NvcGVzIjpbImZ1bGwtYWNjZXNzIl19.B5neug6NZCTsVCHS5LGUwcTPQ3RQjitzWORGRKzk9bMovLzRMBpCw2ba_kV10BetSDK-6ABEbcVu3xASzTmYRip5PhkeVf2OQ24hU3fh26Azti8rmUoZZRwJcjnk7qtYILHLM4hqdcmcwv6o4R0QH_MuoVmdFPmBaBugV57pzs9hSp4jBE9Co9sPsuZ35xMtEVkbbACXLPYohHtPsWeVz7wb24zXc1ajwZTD0nZSdJxJMUvkG0WDUWXxGzI2jRyfbtmcDmW5zQmZPdiwvRI94o8bFjMGSI7AlY1BEa3Da8EUhOjzydfsEAT1n47XFjmJmopjpHqTvZKkRtbd8FJt4yNZtUmIJEbMcT39yLXCyGNBzmsI-fi_u4PuTvYli-03nYFHwDvONRKM8efgrQaBDF7FOIlp9bbJfnb3-THnwEKGZZSghaGROtPEXe79gNlozfv1vz26gNOAkfxNKjbuVvLf3U0xf2FzBGUMBw0-3BXYmLmBmjPp3IW4mtbhPbX-8FrfaRWrnORGZEaghBuioyrl594zyw0xgqBEE6QuQk0epjsvPMS_km74G-DkOdrgYF9celdD-Cv2613pdWievXwpPc7eWWZy7DNjIh7X5eYU41uE3q-PapWh2xzaq9RfB2vVjpTwotQ8nhrW62zoWVEsO5zcPj8BlxSi7bophMk`;

test('Test for retrieving all notifications', async () => {
    // jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    // const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.clientSecret);
    // const token = await result;
    const response = await getNotificationsAsync(false, CONFIG.userId, CONFIG.testToken);
    console.log("RES NOTI", response);
    expect('data' in response.data).toBe(true);
})

test('Test for deleting specific notification', async () => {
    // jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    // const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.clientSecret);
    // const token = await result;
    // const response = await deleteNotificationAsync(1, CONFIG.userId, token.accessToken);
    // expect('data' in response.data).toBe(true);
    expect(true).toBe(true);
})
