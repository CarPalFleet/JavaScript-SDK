import CONFIG from './Config';
import {getTokenAsync} from '../../account/Auth';
import {
  createDriverAsync,
  getDriverDetailAsync,
  getDriversAsync,
  getUpdatedDriverLiveData,
  getDriversBasedOnSearchResult,
  updateRouteLocationAsync,
  deleteDriverScheduleAsync,
  createDriverScheduleAsync,
  updateDriverScheduleAsync,
  getDriversWithFiltersAsync,
  getDriverCountsAsync,
  getDriverRoutesAsync,
} from '../Driver';


describe('Create new driver API V3', () => {
  it('should respond new driver object including id details and perform a show request on that driver', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
    const result = getTokenAsync(
      CONFIG.email,
      CONFIG.password,
      CONFIG.clientId,
      CONFIG.clientSecret
    );
    const token = await result;
    const driverInfo = {
      transactionGroupIds: [180],
      sendConfirmationSms: false,
      sendConfirmationEmail: false,
      driverTypeIds: [2, 3],
      firstName: 'User',
      lastName: generateDisplayName(10),
      email: `${generateDisplayName(10)}@example.com`,
      password: '123456',
      birthday: '1980-01-01',
      phone: '+6592341092',
      vehicleColor: 'Red',
      averageSpeed: 60,
      maximumCapacity: 100,
      vehicleModelYear: 2018,
      vehicleLicenseNumber: '12456',
      vehicleBrand: 'Scooter',
      vehicleModel: '12456',
      vehicleTypeId: 1,
    };

    try {
      const response = await createDriverAsync(driverInfo, token.accessToken);
      expect('id' in response).toBeTruthy();
      expect('driverTypes' in response).toBeTruthy();
      const responseDriverDetail = await getDriverDetailAsync(
        1,
        1,
        response.id,
        token.accessToken
      );
      expect('data' in responseDriverDetail).toBeTruthy();
    } catch (error) {
      console.log(error);
    }


  });
});

test(`Test for retrieving V3 driver list`, async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

  const result = getTokenAsync(
    CONFIG.email,
    CONFIG.password,
    CONFIG.clientId,
    CONFIG.clientSecret
  );
  const token = await result;
  const filters = {
    limit: 2,
    page: 1,
  };

  const response = await getDriversAsync(filters, token.accessToken);
  expect('data' in response).toBeTruthy();
  expect(response.data instanceof Array).toBeTruthy();
});

/* describe('Retrieve Driver based on the search result', () => {
  it('should response specific drivers array', async () => {
    const response = await getDriversBasedOnSearchResult(
      CONFIG.filterObject,
      CONFIG.searchResult,
      CONFIG.token
    );
    expect('data' in response).toBeTruthy();
  });
});*/

test('Test for pubsub live data for job', async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
  const originalDriverDatum = {
    activeStatusCounts: {'1': 0, '2': 0, '3': 0, '4': 0},
    driverTypeCounts: {'1': 1, '2': 3, '3': 4},
    data: {
      '1': [],
      '2': [],
      '3': [
        {
          addressId: 0,
          driverId: 9168,
          customerId: 10919,
          orderId: 62411,
          driverStatusId: 3,
          driverTypeIds: [1],
          id: '9b4cf220-cd94-4a0b-84ac-32f74dfc142f',
          latitude: '1.2788882',
          longitude: '103.8482516',
          orderRouteTypeId: 1,
          updatedAt: '2018-01-11 06:06:57',
        },
      ],
      '4': [],
    },
    totalStatusCounts: 0,
  };
  const pubSubPayload = {
    data: {
      addressId: 0,
      customerId: 10919,
      driverId: 9168,
      driverTypeIds: [1],
      id: '1ada3ace-67ab-4e3b-a1e0-a0d3b63fedc8',
      latitude: '1.2789042',
      longitude: '103.8482397',
      orderId: 62411,
      orderRouteTypeId: 1,
      updatedAt: '2018-01-11 06:06:14',
      // "driverStatusId": 4
    },
    lastDriverStatusId: 1,
  };

  const filterObject = {
    // driverStatusIds: [2],
    orderRouteTypeIds: 1,
    driverTypeIds: [1],
  };
  const result = getTokenAsync(
    CONFIG.email,
    CONFIG.password,
    CONFIG.clientId,
    CONFIG.clientSecret
  );
  const response = getUpdatedDriverLiveData(
    originalDriverDatum,
    pubSubPayload,
    filterObject,
    result.accessToken
  );
  expect(response instanceof Object).toBeTruthy();
});

test(`Test for create, delete and update driver schedule`, async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

  const result = getTokenAsync(
    CONFIG.email,
    CONFIG.password,
    CONFIG.clientId,
    CONFIG.clientSecret
  );
  const token = await result;

  const driverInfo = {
    identityId: 1,
    productTypeId: 3,
    transactionGroupId: [180],
    firstName: 'User',
    lastName: generateDisplayName(10),
    email: `${generateDisplayName(10)}@example.com`,
    password: '123456',
    birthday: '1980-01-01',
    phone: '+6592341092',
    isNewUser: true,
    sendConfirmationSms: false,
    vehicleTypeId: 1,
    vehicleBrand: 'Scooter',
    vehicleModel: '12456',
    vehicleLicenseNumber: '12456',
    vehicleModelYear: 2018,
    vehicleColor: 'Black',
  };

  const responseCreatedriver = await createDriverAsync(
    driverInfo,
    1,
    token.accessToken
  );
  expect('driver' in responseCreatedriver).toBeTruthy();

  const payload = {
    driverId: responseCreatedriver.driver.id,
    transactionGroupId: 180,
    startTime: '10:01',
    endTime: '13:02',
    startAt: '2020-03-01',
  };
  const responseCreateSchedule = await createDriverScheduleAsync(
    payload,
    token.accessToken
  );
  expect('data' in responseCreateSchedule).toBeTruthy();

  const scheduleId = CONFIG.scheduleId;
  const responseUpdateSchedule = await updateDriverScheduleAsync(
    responseCreateSchedule.data.id,
    payload,
    token.accessToken
  );

  expect('data' in responseUpdateSchedule).toBeTruthy();

  const responseDelete = await deleteDriverScheduleAsync(
    responseCreateSchedule.data.id,
    token.accessToken
  );

  expect('data' in responseUpdateSchedule).toBeTruthy();
});

test(`Test for create driver schedule with with driver that does not belong to requestor`, async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

  const result = getTokenAsync(
    CONFIG.email,
    CONFIG.password,
    CONFIG.clientId,
    CONFIG.clientSecret
  );
  const token = await result;
  const playload = {
    driverId: 99999999999912,
    transactionGroupId: 180,
    startTime: '10:01',
    endTime: '13:02',
    startAt: '2018-03-01',
  };
  try {
    const response = await createDriverScheduleAsync(
      playload,
      token.accessToken
    );
  } catch (error) {
    expect(error).toHaveProperty('statusCode', 400);
    expect(error).toHaveProperty('errorMessage', [
      {key: '0', messages: 'Driver does not belong to you'},
      {
        key: '1',
        messages: ' Driver does not match Transaction Group',
      },
    ]);
  }
});

describe('Test getDriversWithFiltersAsync', async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

  const filterObject = {
    driverStatusIds: [2],
    orderRouteTypeIds: 1,
    driverTypeIds: [1],
  };
  const customerId = 14445;
  it('should get getDriversWithFiltersAsync success response', async () => {
    const result = getTokenAsync(
      CONFIG.email,
      CONFIG.password,
      CONFIG.clientId,
      CONFIG.clientSecret
    );
    const token = await result;

    try {
      const response = await getDriversWithFiltersAsync(
        filterObject,
        customerId,
        token.accessToken
      );
      expect(response).toMatchSnapshot();
    } catch (error) {
      console.log('error', error);
    }
  });
  it('should throw getDriversWithFiltersAsync 401 error status', async () => {
    try {
      await getDriverCountsAsync();
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 401);
    }
  });
});

describe('Test getDriverCountsAsync', async () => {

  const filterObject = {
    driverStatusIds: [2],
    orderRouteTypeIds: 1,
    driverTypeIds: [1],
  };
  const customerId = 14445;
  it('should get getDriverCountsAsync success response', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

    const result = getTokenAsync(
      CONFIG.email,
      CONFIG.password,
      CONFIG.clientId,
      CONFIG.clientSecret
    );
    const token = await result;

    try {
      const response = await getDriverCountsAsync(
        filterObject,
        customerId,
        token.accessToken
      );
      expect(response).toMatchSnapshot();
    } catch (error) {
      console.log('error', error);
    }
  });
  it('should throw getDriverCountsAsync 401 error status', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

    try {
      await getDriverCountsAsync();
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 401);
    }
  });
});

describe('Test getDriverRoutesAsync', async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

  const filterObject = {
    pickupDate: '2018-02-28',
    withRoute: 0,
    sort: 'pickup_window,asc',
    limit: 1,
    offset: 1,
    include: 'pickup_group,delivery_address',
    statusIds: 2, // 2 is for validated records
    recommendedForDriverId: 20,
  };
  it('should get getDriverRoutesAsync success response', async () => {
    const result = getTokenAsync(
      CONFIG.email,
      CONFIG.password,
      CONFIG.clientId,
      CONFIG.clientSecret
    );
    const token = await result;

    try {
      const response = await getDriverRoutesAsync(
        filterObject,
        token.accessToken
      );
      expect(typeof response.data).toBe('object');
      const dataObj = response.data[`${Object.keys(response.data)[0]}`];
      expect(dataObj).toHaveProperty('id');
      expect(dataObj).toHaveProperty('driverDetailsId');
      expect(dataObj).toHaveProperty('userId');
      expect(dataObj).toHaveProperty('driverStatusId');
      expect(dataObj).toHaveProperty('driverStatusName');
      expect(dataObj).toHaveProperty('avatar');
      expect(dataObj).toHaveProperty('activatedAt');
      expect(dataObj).toHaveProperty('createdAt');
      expect(dataObj).toHaveProperty('updatedAt');
      expect(dataObj).toHaveProperty('user');
      expect(dataObj).toHaveProperty('vehicle');
      expect(dataObj).toHaveProperty('driverTypes');
      expect(dataObj).toHaveProperty('driverGeofences');
      expect(dataObj).toHaveProperty('driverSchedules');
      expect(dataObj).toHaveProperty('driverAssignments');
      expect(dataObj).toHaveProperty('routes');
    } catch (error) {
      console.log('error', error);
    }
  });

  it('should throw getDriverRoutesAsync 401 error status', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

    try {
      await getDriverCountsAsync();
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 401);
    }
  });
});

/**
 * Generate a display name
 * @param {int} size
 * @return {string} text
 */
function generateDisplayName(size) {
  let text = '';
  let possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < size; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}
