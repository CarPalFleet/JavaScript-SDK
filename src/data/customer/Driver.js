/**
 * @fileoverview This file contains all Driver related functions that are triggered by a Customer
 */

import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import {
  convertObjectIntoURLString,
  apiResponseErrorHandler,
  rejectPromise,
  getCSVStringFromArrayObject,
  arrayReduce,
} from '../utility/Util';
import { camelToSnake } from '../utility/ChangeCase';

/**
 * Create Driver
 * @typedef { Object } Window
 * @property {string} startTime ("HH:MM") Format
 * @property {string} endTime ("HH:MM") Format
 * @typedef { Object } Schedule
 * @property {number} transactionGroupId
 * @property {string} startAt (YYYY-MM-DD)
 * @property {boolean} isDefault // to set this Schedule as a default
 * @property {Array.<Window>} windows Array of window object
 * @property {Array.<number>} recursions Array of day numbers for recurring window
 * @typedef { Object } Driver
 * @property {Array.<number>} transactionGroupIds (mandatory)
 * @property {boolean} sendConfirmationSms (optional)
 * @property {boolean} sendConfirmationEmail (optional)
 * @property {Array.<number>} driverTypeIds (mandatory)
 * @property {string} firstName (mandatory)
 * @property {string} lastName (mandatory)
 * @property {string} email (mandatory)
 * @property {string} password (mandatory)
 * @property {string} birthday (mandatory) (Y-m-d)
 * @property {string} phone (mandatory)
 * @property {string} vehicleColor (optional)
 * @property {number} averageSpeed (optional)
 * @property {number} maximumCapacity (optional)
 * @property {number} vehicleModelYear (optional)
 * @property {string} vehicleLicenseNumber (optional)
 * @property {string} vehicleBrand (optional)
 * @property {string} vehicleModel (optional)
 * @property {number} vehicleTypeId (optional)
 * @property {Array.<Schedule>} schedules (optional) Array of schedule object
 * @param {Driver} driverInfo {}
 * @param {string} token
 * @return {Object} Promise resolve/reject
 */
export const createDriverAsync = async (
  {
    transactionGroupIds,
    sendConfirmationSms = false,
    sendConfirmationEmail = false,
    driverTypeIds,
    firstName,
    lastName,
    email,
    password,
    birthday,
    phone,
    vehicleColor,
    averageSpeed,
    maximumCapacity,
    vehicleModelYear,
    vehicleLicenseNumber,
    vehicleBrand,
    vehicleModel,
    vehicleTypeId,
    schedules,
    interviewDetails = {},
    bank = {},
    identificationNumber,
    serviceProviderDriverServiceIds,
  },
  token
) => {
  try {
    const data = {
      transactionGroupIds,
      sendConfirmationSms,
      sendConfirmationEmail,
      driverTypeIds,
      firstName,
      lastName,
      email,
      password,
      birthday,
      phone,
      vehicle: {
        vehicleColor,
        averageSpeed,
        maximumCapacity,
        vehicleModelYear,
        vehicleLicenseNumber,
        vehicleBrand,
        vehicleModel,
        vehicleTypeId,
      },
      schedules,
      interviewDetails: camelToSnake(interviewDetails),
      bank: camelToSnake(bank),
      identificationNumber,
      serviceProviderDriverServiceIds,
    };

    const driver = camelToSnake({
      ...data,
      vehicle: camelToSnake(data.vehicle),
      schedules: data.schedules
        ? data.schedules.map((schedule) => {
            const newSchedule = {
              ...schedule,
              windows: schedule.windows.map((window) => camelToSnake(window)),
            };
            return camelToSnake(newSchedule);
          })
        : undefined,
    });

    const response = await axios({
      method: 'POST',
      url: endpoints.API_V3.CUSTOMER_DRIVER,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: driver,
    });

    return camelize(response.data.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Get Driver List
 * @param {object} filterObject {limit, page, driverIds}
 * limit (optional) (int)
 * page (optional) (int) #offset, start from 1 value
 * driverIds (optional) (csv)
 * @param {string} token
 * @return {promise} reject/resolve
 * Will return [] array if there"s no drivers
 */
export const getDriversAsync = async (filterObject = {}, token) => {
  try {
    let paramString = convertObjectIntoURLString(filterObject);

    const response = await axios({
      method: 'GET',
      url: `${endpoints.API_V3.DRIVER}/${paramString.replace('&', '?')}`,
      headers: { Authorization: `Bearer ${token}` },
    });

    return camelize(response.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Update Driver
 * @typedef { Object } Window
 * @property {string} startTime ("HH:MM") Format
 * @property {string} endTime ("HH:MM") Format
 * @typedef {Object} Schedule
 * @property {number} transactionGroupId
 * @property {string} startAt (YYYY-MM-DD)
 * @property {boolean} isDefault // to set this Schedule as a default
 * @property {Array.<Window>} windows Array of window object
 * @property {Array.<number>} recursions Array of day numbers for recurring window
 * @typedef {Object} Driver
 * @property {number} id
 * @property {number} driverStatusId
 * @property {Array.<number>} transactionGroupIds
 * @property {Array.<number>} languageIds
 * @property {boolean} hasCriminalRecord
 * @property {boolean} isAProfessionalDriver
 * @property {boolean} hasWorkAsDriver
 * @property {string} referredFrom
 * @property {string} drivingReason
 * @property {string} remarks
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} phone
 * @property {string} password
 * @property {string} passwordConfirmation
 * @property {number} vehicleModelYear
 * @property {number} averageSpeed
 * @property {number} maximumCapacity
 * @property {number} vehicleTypeId
 * @property {string} vehicleModel
 * @property {string} vehicleBrand
 * @property {string} vehicleLicenseNumber
 * @property {string} vehicleColor
 * @property {string} branchCode // bank branch code
 * @property {string} code // bank code
 * @property {string} name // bank name
 * @property {string} accountNumber // bank account number
 * @property {Array.<Schedule>} schedules  Array of schedule object
 * @param {Driver} driverDetailsInfo {}
 * @param {object} params
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const updateDriverAsync = async (
  {
    id,
    identificationNumber,
    driverStatusId,
    languageIds,
    transactionGroupIds,
    driverTypeIds,
    firstName,
    lastName,
    phone,
    password,
    passwordConfirmation,
    vehicleModelYear,
    averageSpeed,
    maximumCapacity,
    vehicleTypeId,
    vehicleModel,
    vehicleBrand,
    vehicleLicenseNumber,
    vehicleColor,
    schedules,
    interviewDetails = {},
    bank = {},
    serviceProviderDriverServiceIds,
  },
  params,
  token
) => {
  try {
    const driverInfo = camelToSnake({
      id,
      identificationNumber,
      driverStatusId,
      languageIds,
      transactionGroupIds,
      driverTypeIds,
      interviewDetails: camelToSnake(interviewDetails),
      user: camelToSnake({
        firstName,
        lastName,
        phone,
        password,
        passwordConfirmation,
      }),
      vehicle: camelToSnake({
        vehicleModelYear,
        averageSpeed,
        maximumCapacity,
        vehicleTypeId,
        vehicleModel,
        vehicleBrand,
        vehicleLicenseNumber,
        vehicleColor,
      }),
      bank: camelToSnake(bank),
      schedules: schedules
        ? schedules.map((schedule) => {
            const newSchedule = {
              ...schedule,
              windows: schedule.windows.map((window) => camelToSnake(window)),
            };
            return camelToSnake(newSchedule);
          })
        : undefined,
      serviceProviderDriverServiceIds,
    });
    const response = await axios({
      method: 'PUT',
      url: endpoints.API_V3.DRIVER_UPDATE.replace('{0}', id),
      headers: { Authorization: `Bearer ${token}` },
      params: camelToSnake(params),
      data: driverInfo,
    });
    return camelize(response.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Retrieve specific driver based on the search result
 * @param {object} filterObject {limit, page}
 * limit (optional) (int)
 * page (optional) (int) #offset, start from 1 value
 * @param {array} searchResult
 * @param {string} token
 * @return {promise} reject/resolve
 * Will return [] array if there"s no drivers
 * @deprecated since version 0.1.77
 */
export const getDriversBasedOnSearchResult = async (
  filterObject,
  searchResult,
  token
) => {
  try {
    const filedName = 'driver_id';
    const driverFilterFieldName = 'id';
    // Manipulate the driversIds of Array Object into CSV string
    const driverIds = getCSVStringFromArrayObject(searchResult, filedName);
    if (!driverIds) {
      return [];
    }

    // filter the driver with search result ids
    filterObject[driverFilterFieldName] = driverIds;
    const driver = await getDriversAsync(filterObject, token);

    return driver;
  } catch (e) {
    return rejectPromise(e);
  }
};

/**
 * Get Driver with filters
 * @param {object} filterObject {jobRouteTypeIds, driverTypeIds, driverStatusId}
 * jobRouteTypeIds (string) (optinal) 1,2 #csv string
 * * 1 means Live, 2 means POD
 * driverTypeIds (string) (optinal) 1 #csv string
 * * 1 means Inhouse, 2 means Public, 3 means Service Provider
 * driverStatusIds (string) (optinal) 1,2,3,4 #csv string
 * * 1 means Active, 2 means With Route, 3 means Idle, 4 means Inactive driver
 * @param {int} customerId
 * @param {string} token
 * @param {boolean} validationStatus (optional)
 * @return {promise} reject/resolve
 * Will return [] array if there"s no drivers
 */
// TODO: needs unit testing
export const getDriversWithFiltersAsync = async (
  filterObject = {},
  customerId,
  token,
  validationStatus = false
) => {
  let paramString = convertObjectIntoURLString(filterObject);
  try {
    const response = await axios({
      method: 'GET',
      url: `${endpoints.CUSTOMER_DRIVERS.replace(
        '{0}',
        customerId
      )}${paramString.replace('&', '?')}`,
      headers: { Authorization: token },
    });
    return camelize(categoriesCustomerDrivers(response.data));
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Get Driver Counts for Dashboard including the driver data
 * @param {object} filterObject {jobRouteTypeIds, driverTypeIds, driverStatusId}
 * jobRouteTypeIds (string) (optinal) 1,2 #csv string
 * * 1 means Live, 2 means POD
 * driverTypeIds (array) (optinal) [1] #csv string
 * * 1 means Inhouse, 2 means Public, 3 means Service Provider
 * driverStatusIds (string) (optinal) 1,2,3,4 #csv string
 * * 1 means Active, 2 means With Route, 3 means Idle, 4 means Inactive driver
 * @param {string} customerId
 * @param {boolean} token (optional)
 * @return {promise} reject/resolve
 * Will return [] array if there"s no drivers
 */
// TODO: needs unit testing
export const getDriverCountsAsync = async (
  filterObject = {},
  customerId,
  token
) => {
  let paramString = convertObjectIntoURLString(filterObject);
  try {
    const response = await axios({
      method: 'GET',
      url: `${endpoints.CUSTOMER_DRIVERS.replace(
        '{0}',
        customerId
      )}${paramString.replace('&', '?')}`,
      headers: { Authorization: token },
    });

    return calculateCustomerDriverCounts(
      response.data,
      filterObject.driverTypeIds
    );
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Get the Driver Routes
 * @param {object} filterObject # {pickupDate (mandatory), withAvailability, withSchedule, limit, offset}
 * pickupDate (optional)(string) = "2018-02-28"
 * withAvailability (optional)(int) = 1/0
 * withSchedule (optional)(int) = 1/0
 * limit = 20 (optional)(int)
 * page = 0 (optional)(int)
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
// TODO: needs unit testing
export const getDriverRoutesAsync = async (filterObject, token) => {
  try {
    let paramString = convertObjectIntoURLString(camelToSnake(filterObject));
    const routes = await axios({
      method: 'GET',
      url: `${endpoints.API_V3.DRIVER_ROUTE}${paramString.replace('&', '?')}`,
      headers: { Authorization: `Bearer ${token}` },
    });

    return camelize(routes.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Get updated driver live data for Dashboard by comparing old payload with new
 * This function will calculate all of driver counts
 * @param {object} originalDriversObject
 * @param {string} pubSubPayload
 * @param {boolean} filterObject
 * @return {promise} reject/resolve
 * Will return [] array if there"s no drivers
 //TODO: Needs unit testing
 */
export const getUpdatedDriverLiveData = (
  originalDriversObject,
  pubSubPayload,
  filterObject
) => {
  try {
    pubSubPayload = camelize(pubSubPayload);
    pubSubPayload.payload.driverStatusId =
      pubSubPayload.payload.jobId > 0 ? 2 : 1;
    let payload = pubSubPayload.payload;
    const driverStatusIds = [1, 2, 3, 4];
    // 1 = Active Driver, 2 = With Route, 3 = Idle, 4 = Inactive driver
    const isValidStatus = driverStatusIds.includes(payload.driverStatusId);
    let isIncludeInStatusIds = true;
    if (filterObject.driverStatusIds) {
      isIncludeInStatusIds = filterObject.driverStatusIds.includes(
        payload.driverStatusId
      );
    }

    let isIncludeInDriverTypeIds = true;
    if (filterObject.driverTypeIds != null) {
      let hasDriverTypeId = payload.driverTypeIds.find((driverTypeId) => {
        return filterObject.driverTypeIds.includes(driverTypeId);
      });

      isIncludeInDriverTypeIds = !!hasDriverTypeId;
    } else isIncludeInDriverTypeIds = true;

    if (!(isValidStatus && isIncludeInDriverTypeIds && isIncludeInStatusIds)) {
      return originalDriversObject;
    }

    let driverStatusKeys = Object.keys(originalDriversObject['data']);
    let matchedPayload = driverStatusKeys.reduce(
      (matchedPayload, statusId) => {
        let index = originalDriversObject['data'][statusId].findIndex((job) => {
          return payload.driverId === parseInt(job.driverId); // order.driverId might be string/integer;
        });
        if (index >= 0) {
          matchedPayload.isDataExist = true;
          matchedPayload.statusId = statusId;
          matchedPayload.index = index;
          matchedPayload.data = originalDriversObject['data'][statusId][index];
        }
        return matchedPayload;
      },
      { isDataExist: false, statusId: 0, index: -1, data: {} }
    );

    if (matchedPayload.isDataExist) {
      // update activeStatusCounts
      originalDriversObject['activeStatusCounts'][payload.driverStatusId] += 1;
      const currentStatusCounts =
        originalDriversObject['activeStatusCounts'][matchedPayload.statusId];

      if (currentStatusCounts) {
        originalDriversObject['activeStatusCounts'][
          matchedPayload.statusId
        ] -= 1;
      }

      originalDriversObject['data'][matchedPayload.statusId].splice(
        matchedPayload.index,
        1
      );
    } else {
      originalDriversObject['totalStatusCounts'] += 1;
      filterObject.driverTypeIds.map((driverTypeId) => {
        originalDriversObject['driverTypeCounts'][driverTypeId] += 1;
      });
      originalDriversObject['activeStatusCounts'][payload.driverStatusId] += 1;
    }
    // update data Object
    originalDriversObject['data'][payload.driverStatusId].push(payload);
    return originalDriversObject;
  } catch (e) {
    return {
      statusCode: '500',
      statusText: 'Error in updating job live data',
    };
  }
};

/** Update driver time slot
 * @param {int} scheduleId
 * @typedef {Object} ScheduleInfo
 * @property {number} driverId
 * @property {number} transactionGroupId
 * @property {string} startAt (YYYY-MM-DD)
 * @property {Array.<Window>} windows Array of window object
 * @property {Array.<number>} recursions Array of day numbers for recurring window
 * @param {ScheduleInfo} payload // Schdule info object
 * @param {Object} params
 * @param {string} token {driverId, transactionGroupId, startTime, endTime, startDate}
 * @return {Object} Promise resolve/reject
 * If resolve, return value: boolean(To indicate update successful or failed)
 * remarks: the API endpoint will return one of the following status:
 * 400: Validation Error
 * 400: Driver Schedule with same values exists
 * 200: Success
 */
export const updateDriverScheduleAsync = async (
  scheduleId,
  payload = {},
  params = {},
  token
) => {
  try {
    const newPayload = {
      ...payload,
      windows: payload.windows
        ? payload.windows.map((window) => camelToSnake(window))
        : undefined,
    };
    const result = await axios({
      method: 'put',
      url: `${endpoints.API_V3.DRIVER_SCHEDULE.replace('{0}', scheduleId)}`,
      headers: { Authorization: `Bearer ${token}` },
      data: camelToSnake(newPayload),
      params: camelToSnake(params),
    });
    return camelize(result.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/** deleteDriverScheduleAsync
 * @param {int} scheduleId
 * @param {string} token
 * @return {object} Promise resolve/reject
 * return value: boolean(To indicate delete successful or failed)
 * remarks: the API endpoint will return one of the following status:
 * 404: Driver Schedule does not exists
 * 204: Success with no content
 */
export const deleteDriverScheduleAsync = async (scheduleId, token) => {
  try {
    await axios({
      method: 'delete',
      url: `${endpoints.API_V3.DRIVER_SCHEDULE.replace('{0}', scheduleId)}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    return { data: true };
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/** Add new driver time slot
 * @typedef {Object} ScheduleInfo
 * @property {number} driverId (mandatory)
 * @property {number} transactionGroupId (mandatory)
 * @property {string} startAt (YYYY-MM-DD) (mandatory)
 * @property {Array.<Window>} windows Array of window object (mandatory)
 * @property {Array.<number>} recursions Array of day numbers for recurring window
 * @param {ScheduleInfo} payload // Schdule info object
 * @param {Object} params url params
 * @param {string} token resolve/reject
 * @return {Object} Promise resolve/reject
 * If resolve, return value: boolean(To indicate update successful or failed)
 * remarks: the API endpoint will return one of the following status:
 * 400: Validation Error
 * 400: Driver Schedule with same values exists
 * 200: Success
 */
export const createDriverScheduleAsync = async (
  payload = {},
  params,
  token
) => {
  try {
    const newPayload = {
      ...payload,
      windows: payload.windows
        ? payload.windows.map((window) => camelToSnake(window))
        : undefined,
    };
    const result = await axios({
      method: 'post',
      url: `${endpoints.API_V3.DRIVER_SCHEDULE.replace('{0}', '')}`,
      headers: { Authorization: `Bearer ${token}` },
      data: camelToSnake(newPayload),
      params: camelToSnake(params),
    });
    return camelize(result.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Calculate Customer Driver Counts
 * @param {object} data
 * @param {array} driverTypeIds
 * @return {object} total count object of live driver data
 // TODO: needs unit testing
 */
function calculateCustomerDriverCounts(data, driverTypeIds) {
  const countData = {
    totalStatusCounts: 0,
    activeStatusCounts: { 1: 0, 2: 0, 3: 0, 4: 0 },
    driverTypeCounts: { 1: 0, 2: 0, 3: 0 },
  };

  let drivers = categoriesCustomerDriversForCount(data);
  return arrayReduce(
    Object.keys(drivers.data),
    iterateDriverArrays.bind(null, drivers, driverTypeIds),
    countData
  );
}

/** Dependency function of calculateCustomerDriverCounts
 * Calculate Customer Driver Counts
 * @param {object} drivers
 * @param {array} driverTypeIds
 * @param {object} counts #{driverTypeCounts, activeStatusCounts, totalStatusCounts}
 driverTypeCounts: (int) 10,
 activeStatusCounts: (object) {1: 0, 2: 1, 3: 0, 4: 2}
 totalStatusCounts: (int) 20
 * @param {int} value
 * @return {object} promise reject/resolve
 */
export const iterateDriverArrays = (drivers, driverTypeIds, counts, value) => {
  arrayReduce(
    Object.keys(drivers.data[value]),
    getActiveStatusCountsAndTotalCounts.bind(
      null,
      drivers,
      driverTypeIds,
      value,
      counts
    )
  );
  return counts;
};

/** Dependency function of calculateCustomerDriverCounts
 * Categories Customer Drivers for Count
 * @param {object} drivers
 * @param {array} driverTypeIds # [1,2,3]
 * @param {int} value # actual filter value 2
 * @param {object} counts
 * @param {int} currentVal passed from reducers function
 This counts will be increased values
 Example
 driverTypeCounts: 10,
 activeStatusCounts: {
  1: 10,
  2: 10,
  3: 10,
  4: 10,
 }
 totalStatusCounts: 10
 * @param {string} key #iteration key
*/
export const getActiveStatusCountsAndTotalCounts = (
  drivers,
  driverTypeIds,
  value,
  counts,
  currentVal,
  key
) => {
  let count = drivers.data[value][key].length;
  driverTypeIds.forEach(function(driverTypeId) {
    if (driverTypeId == value) {
      counts.activeStatusCounts[key] += count;
      counts.totalStatusCounts += count;
    }
  });
  counts.driverTypeCounts[value] += count;
};

/** Dependency function of calculateCustomerDriverCounts
 * Categories Customer Drivers for Count
 * @param {object} drivers
 * @return {object} drivers
 Example Response
 {
   1: {1: [], 2: [], 3: [], 4: []},
   2: {1: [], 2: [], 3: [], 4: []},
   3: {1: [], 2: [], 3: [], 4: []},
 };
 */
export const categoriesCustomerDriversForCount = (drivers) => {
  let responseData = {
    1: { 1: [], 2: [], 3: [], 4: [] },
    2: { 1: [], 2: [], 3: [], 4: [] },
    3: { 1: [], 2: [], 3: [], 4: [] },
  };
  return {
    data: drivers['data'].reduce((data, value) => {
      value.driver_type_ids.forEach((v, k) => {
        if (data[v][value.driver_status_id]) {
          data[v][value.driver_status_id].push(value);
        }
      });
      return data;
    }, responseData),
  };
};

/** Dependency function of calculateCustomerDriverCounts
 * Categories Customer Drivers
 * @param {object} drivers
 * @return {object} drivers
 Example Response
 {
    1: [], 2: [], 3: [], 4: []
 };
 */
export const categoriesCustomerDrivers = (drivers) => {
  let responseData = { 1: [], 2: [], 3: [], 4: [] };
  return {
    data: drivers['data'].reduce((data, value) => {
      if (data[value.driver_status_id]) {
        data[value.driver_status_id].push(value);
      }
      return data;
    }, responseData),
  };
};

/**
 * delete Drivers
 * @param {string} driverIds Comma separated values of IDs belonging to drivers to remove. Only In-house drivers can be deleted. Example: ?driver_ids=1,2,3
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const deleteDriversAsync = async (driverIds, token) => {
  try {
    await axios({
      method: 'DELETE',
      url: `${endpoints.API_V3.DRIVER_UPDATE.replace(
        '/{0}',
        `?driver_ids=${driverIds}`
      )}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    return { data: true };
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * assign to freelance driver
 * @param {number} driverId
 * @param {object} params
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const assignToFreelancer = async (driverId, params, token) => {
  try {
    const result = await axios({
      method: 'POST',
      url: `${endpoints.API_V3.ASSIGN_TO_FREELANCER.replace('{0}', driverId)}`,
      headers: { Authorization: `Bearer ${token}` },
      data: params,
    });
    return camelize(result.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Get Searched Drivers
 * @param {object} params driver_status_id, driver_type_id, limit, offset
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const getSearchedDrivers = async (params, token) => {
  try {
    /*
      Add following params for searching drivers
      driver_status_id = 2; // Activated
      driver_type_id = 1; // Public/Freelance
      limit = 10
      offset = 0
    */

    let response = await axios({
      method: 'GET',
      url: `${endpoints.API_V3.DRIVER_SEARCH}`,
      headers: { Authorization: `Bearer ${token}` },
      params,
    });

    return camelize(response.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Get the Driver Payments
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const getDriverPaymentAsync = async (token) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${endpoints.API_V3.DRIVER_PAYMENT}`,
      headers: { Authorization: `Bearer ${token}` },
    });

    return camelize(res.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Create Driver Payment Batch
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const createDriverPaymentAsync = async (token) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${endpoints.API_V3.DRIVER_PAYMENT}`,
      headers: { Authorization: `Bearer ${token}` },
    });

    return camelize(res.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Update Driver Payment Batch
 * @param {string} id
 * @param {object} payload {limit, page, driverIds}
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const updateDriverPaymentAsync = async (id, payload, token) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `${endpoints.API_V3.DRIVER_PAYMENT}/${id}`,
      headers: { Authorization: `Bearer ${token}` },
      data: camelToSnake(payload),
    });

    return camelize(res.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Download Driver Payment Batch
 * @param {string} id
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const downloadDriverPaymentAsync = async (id, token) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${endpoints.API_V3.DRIVER_PAYMENT}/${id}/download`,
      headers: { Authorization: `Bearer ${token}` },
    });

    return camelize(res.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Get driver details
 * @param {string} driverId
 * @param {object} filterObject
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const getSelectedDriverRoutesAsync = async (
  driverId,
  filterObject,
  token
) => {
  try {
    let paramString = convertObjectIntoURLString(camelToSnake(filterObject));
    const routes = await axios({
      method: 'GET',
      url: `${endpoints.API_V3.DRIVER_ROUTE}/${driverId}${paramString.replace(
        '&',
        '?'
      )}`,
      headers: { Authorization: `Bearer ${token}` },
    });

    return camelize(routes.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};
