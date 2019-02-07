import CONFIG from './Config';
import { getTokenAsync } from '../../account/Auth';
import {
  createDriverAsync,
  getDriversAsync,
  deleteDriverScheduleAsync,
  createDriverScheduleAsync,
  updateDriverScheduleAsync,
  getDriversWithFiltersAsync,
  getDriverCountsAsync,
  getDriverRoutesAsync,
  updateDriverAsync,
  deleteDriversAsync,
} from '../Driver';

describe('Create new driver ', async () => {
  let token;
  let driver;

  beforeAll(async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    token = await getTokenAsync(
      CONFIG.email,
      CONFIG.password,
      CONFIG.clientId,
      CONFIG.clientSecret
    );
  });

  it('should return success driver response and update driver', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    const driverInfoUpdate = {
      transactionGroupIds: [185],
      sendConfirmationSms: false,
      sendConfirmationEmail: false,
      driverTypeIds: [2, 3],
      firstName: 'User',
      lastName: generateDisplayName(10),
      email: `${generateDisplayName(10)}@example.com`,
      password: '123456',
      birthday: '1980-01-01',
      phone: `+6592${Math.floor(Math.random() * 1000000)}`,
      vehicleColor: 'Red',
      averageSpeed: 60,
      maximumCapacity: 100,
      vehicleModelYear: 2018,
      vehicleLicenseNumber: '12456',
      vehicleBrand: 'Scooter',
      vehicleModel: '12456',
      vehicleTypeId: 1,
      schedules: [
        {
          transactionGroupId: 185,
          startAt: new Date().toJSON().split('T')[0],
          isDefault: true,
          windows: [
            {
              startTime: '09:00',
              endTime: '22:00',
            },
          ],
          recursions: [1],
        },
      ],
    };

    const newDriver = await createDriverAsync(
      driverInfoUpdate,
      token.accessToken
    );

    driver = {
      ...newDriver,
      driverStatusId: 2,
      transactionGroupIds: driverInfoUpdate.transactionGroupIds,
      driverTypeIds: driverInfoUpdate.driverTypeIds,
      languageIds: [1], // not sure about this parameter
    };

    const response = await updateDriverAsync(driver, token.accessToken);
    expect('data' in response).toBeTruthy();
    const { data } = response;
    expect('id' in data).toBeTruthy();
    expect('driverDetailsId' in data).toBeTruthy();
    expect('userId' in data).toBeTruthy();
    expect('driverStatusId' in data).toBeTruthy();
    expect('driverStatusName' in data).toBeTruthy();
    expect('avatar' in data).toBeTruthy();
    expect('online' in data).toBeTruthy();
    expect('locationTracking' in data).toBeTruthy();
    expect('activatedAt' in data).toBeTruthy();
    expect('lastDeactivatedAt' in data).toBeTruthy();
    expect('createdAt' in data).toBeTruthy();
    expect('updatedAt' in data).toBeTruthy();
    expect('user' in data).toBeTruthy();
    expect('vehicle' in data).toBeTruthy();
  });

  it('Update driver should return validation error statusCode 400', async () => {
    try {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
      await updateDriverAsync({}, token.accessToken);
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 404);
    }
  });

  it('should respond new driver object including id details and perform a show request on that driver', async () => {
    const driverInfo = {
      transactionGroupIds: [185],
      sendConfirmationSms: false,
      sendConfirmationEmail: false,
      driverTypeIds: [2, 3],
      firstName: 'User',
      lastName: generateDisplayName(10),
      email: `${generateDisplayName(10)}@example.com`,
      password: '123456',
      birthday: '1980-01-01',
      phone: `+6592${Math.floor(Math.random() * 1000000)}`,
      vehicleColor: 'Red',
      averageSpeed: 60,
      maximumCapacity: 100,
      vehicleModelYear: 2018,
      vehicleLicenseNumber: '12456',
      vehicleBrand: 'Scooter',
      vehicleModel: '12456',
      vehicleTypeId: 1,
    };

    const response = await createDriverAsync(driverInfo, token.accessToken);
    expect('id' in response).toBeTruthy();
    expect('vehicle' in response).toBeTruthy();
    expect('driverTypes' in response).toBeTruthy();
  });

  it('Test for retrieving V3 driver list', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    const filters = {
      limit: 2,
      page: 1,
    };

    const response = await getDriversAsync(filters, token.accessToken);
    expect('data' in response).toBeTruthy();
    expect(response.data instanceof Array).toBeTruthy();
  });

  describe('Test for create, update and delete driver schedule', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 90000;
    let schedule;
    // const originalDriverDatum = {
    //   activeStatusCounts: { '1': 0, '2': 0, '3': 0, '4': 0 },
    //   driverTypeCounts: { '1': 1, '2': 3, '3': 4 },
    //   data: {
    //     '1': [],
    //     '2': [],
    //     '3': [
    //       {
    //         addressId: 0,
    //         driverId: 9168,
    //         customerId: 10919,
    //         orderId: 62411,
    //         driverStatusId: 3,
    //         driverTypeIds: [1],
    //         id: '9b4cf220-cd94-4a0b-84ac-32f74dfc142f',
    //         latitude: '1.2788882',
    //         longitude: '103.8482516',
    //         orderRouteTypeId: 1,
    //         updatedAt: '2018-01-11 06:06:57',
    //       },
    //     ],
    //     '4': [],
    //   },
    //   totalStatusCounts: 0,
    // };
    // const pubSubPayload = {
    //   data: {
    //     addressId: 0,
    //     customerId: 10919,
    //     driverId: 9168,
    //     driverTypeIds: [1],
    //     id: '1ada3ace-67ab-4e3b-a1e0-a0d3b63fedc8',
    //     latitude: '1.2789042',
    //     longitude: '103.8482397',
    //     orderId: 62411,
    //     orderRouteTypeId: 1,
    //     updatedAt: '2018-01-11 06:06:14',
    //     // "driverStatusId": 4
    //   },
    //   lastDriverStatusId: 1,
    // };

    // const filterObject = {
    //   // driverStatusIds: [2],
    //   orderRouteTypeIds: 1,
    //   driverTypeIds: [1],
    // };

    it('Test for creating the driver schedule', async () => {
      const payload = {
        driverId: driver.id,
        transactionGroupId: 185,
        windows: [
          {
            startTime: '10:01',
            endTime: '13:02',
          },
        ],
        startAt: '2020-03-05',
      };

      schedule = await createDriverScheduleAsync(payload, token.accessToken);

      expect('data' in schedule).toBeTruthy();
    });

    it('Test for updating the driver schedule', async () => {
      const payload = {
        driverId: driver.id,
        transactionGroupId: 185,
        windows: [
          {
            startTime: '10:01',
            endTime: '13:02',
          },
        ],
        startAt: '2020-03-05',
      };

      const responseUpdateSchedule = await updateDriverScheduleAsync(
        schedule.data.id,
        payload,
        token.accessToken
      );

      expect('data' in responseUpdateSchedule).toBeTruthy();
    });

    it('Test for deleting the driver schedule', async () => {
      setTimeout(async () => {
        const responseDelete = await deleteDriverScheduleAsync(
          schedule.data.id,
          token.accessToken
        );
        expect('data' in responseDelete).toBeTruthy();
      }, 1000);
    });

    it('should fail for deleting the driver schedule with wrong id', async () => {
      try {
        await deleteDriverScheduleAsync(1234, token.accessToken);
      } catch (error) {
        const expected = {
          statusCode: 404,
          statusText: 'Not Found',
          errorMessage: [
            { key: 'driverSchedule', messages: ['Driver Schedule not found'] },
          ],
        };
        expect(error).toEqual(expected);
      }
    });
  });

  it('Test for create driver schedule with with driver that does not belong to requestor', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    const playload = {
      driverId: 99999999999912,
      transactionGroupId: 185,
      windows: [
        {
          startTime: '09:00',
          endTime: '22:00',
        },
      ],
      startAt: '2018-03-01',
    };
    try {
      const response = await createDriverScheduleAsync(
        playload,
        token.accessToken
      );
      expect('data' in response).toBeTruthy();
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 400);
      expect(error).toHaveProperty('errorMessage', [
        {
          key: 'driverId',
          messages: [
            'Driver does not belong to you',
            'Driver does not match Transaction Group',
          ],
        },
      ]);
    }
  });

  const filterObject = {
    driverStatusIds: [2],
    orderRouteTypeIds: 1,
    driverTypeIds: [1],
  };
  const customerId = 14445;

  it('should get getDriversWithFiltersAsync success response', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    try {
      const response = await getDriversWithFiltersAsync(
        filterObject,
        customerId,
        token.accessToken
      );
      expect(response).toMatchSnapshot();
    } catch (error) {
      //
    }
  });
  it('should throw getDriversWithFiltersAsync 401 error status', async () => {
    try {
      await getDriverCountsAsync();
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 401);
    }
  });

  const filterObject2 = {
    driverStatusIds: [2],
    orderRouteTypeIds: 1,
    driverTypeIds: [1],
  };
  it('should get getDriverCountsAsync success response', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    try {
      const response = await getDriverCountsAsync(
        filterObject2,
        customerId,
        token.accessToken
      );
      expect(response).toMatchSnapshot();
    } catch (error) {
      //
    }
  });
  it('should throw getDriverCountsAsync 401 error status', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    try {
      await getDriverCountsAsync();
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 401);
    }
  });
  const filterObject3 = {
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
    try {
      const response = await getDriverRoutesAsync(
        filterObject3,
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
      //
    }
  });

  it('should throw getDriverRoutesAsync 401 error status', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    try {
      await getDriverCountsAsync();
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 401);
    }
  });

  it('should delete drivers', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
    const driverInfo = {
      transactionGroupIds: [185],
      sendConfirmationSms: false,
      sendConfirmationEmail: false,
      driverTypeIds: [2],
      firstName: 'User',
      lastName: generateDisplayName(10),
      email: `${generateDisplayName(10)}@example.com`,
      password: '123456',
      birthday: '1980-01-01',
      phone: `+6596381695`,
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
      const deleted = await deleteDriversAsync(response.id, token.accessToken);
      expect('data' in deleted).toBeTruthy();
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
