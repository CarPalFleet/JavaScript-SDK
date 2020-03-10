import { getTokenAsync } from '../../account/Auth';
import {
  getUserSettingMyOrdersColumnAsync,
  putUserSettingMyOrdersColumn,
  getUserSettingsAsync,
} from '../Setting';
import CONFIG from './Config';

describe('Test getUserSettingsAsync function', async () => {
  let token;

  beforeAll(async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    token = await getTokenAsync(
      CONFIG.email,
      CONFIG.password,
      CONFIG.clientId,
      CONFIG.clientSecret
    );
  });

  it('should return user settings status 200', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    try {
      const response = await getUserSettingsAsync(token.accessToken);
      expect(response).toMatchSnapshot();
    } catch (error) {
      expect(error).toHaveProperty('statusCode');
    }
  });
});

describe('Test getUserSettingMyOrdersColumnAsync function', async () => {
  let token;

  beforeAll(async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    token = await getTokenAsync(
      CONFIG.email,
      CONFIG.password,
      CONFIG.clientId,
      CONFIG.clientSecret
    );
  });

  it('should get user settings', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    try {
      const response = await getUserSettingMyOrdersColumnAsync(
        token.accessToken
      );
      expect(response.data).toMatchSnapshot();
    } catch (error) {
      expect(error).toHaveProperty('statusCode');
    }
  });
});

describe('test updating user settings', async () => {
  let token;
  beforeAll(async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    token = await getTokenAsync(
      CONFIG.email,
      CONFIG.password,
      CONFIG.clientId,
      CONFIG.clientSecret
    );
  });

  it('should return 200', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    const response = await putUserSettingMyOrdersColumn(
      [
        {
          key: 'customerOrderNumber',
          isFixed: false,
          isVisible: true,
        },
      ],
      token.accessToken
    );

    expect(response).toHaveProperty('status', 200);
    expect(response.data).toHaveProperty('myOrdersColumns', [
      { isFixed: false, isVisible: true, key: 'customerOrderNumber' },
    ]);
    expect(response.data.myOrdersColumns[0]).toHaveProperty('isVisible', true);
  });
});
