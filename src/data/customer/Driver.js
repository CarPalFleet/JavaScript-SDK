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
  convertObjectIntoKeyValueArray,
  arrayReduce,
} from '../utility/Util';
import {camelToSnake} from '../utility/ChangeCase';

/**
 * Create Driver
 * @param {object} driverInfo {}
 * birthday (mandatory) (string)
 * driverTypeIds (mandatory) (string) #csv Eg. 2,3
 * email (mandatory) (string)
 * existingUserEmail (optional) (boolean)
 * firstName (mandatory) (string)
 * identityId (mandatory) (string)
 * isNewUser (optional) (boolean)
 * lastName (mandatory) (string)
 * password (mandatory) (string)
 * phone (mandatory) (string)
 * productTypeId (mandatory) (int)
 * sendConfirmationSms (optional) (boolean)
 * transactionGroupId (int) (int)
 * vehicleBrand (optional) (string)
 * vehicleColor (optional) (string)
 * vehicleLicenseNumber (optional) (int)
 * vehicleModel (optional) (string)
 * vehicleModelYear (optional) (int)
 * vehicleTypeId (optional) (int)
 * @param {int} customerId
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const createDriverAsync = async (
  {
    birthday,
    driverTypeIds,
    email,
    existingUserEmail = false,
    firstName,
    identityId,
    isNewUser,
    lastName,
    password,
    phone,
    productTypeId,
    //TODO: where is the sendConfirmationEmail?
    sendConfirmationSms = false,
    transactionGroupId,
    vehicleBrand,
    vehicleColor,
    vehicleLicenseNumber,
    vehicleModel,
    vehicleModelYear,
    vehicleTypeId,
  },
  customerId,
  token
) => {
  try {
    const defaultPayload = {
      driverTypeIds,
      identityId,
      isNewUser,
      productTypeId,
      sendConfirmationSms,
      transactionGroupId,
      vehicle: {
        vehicleBrand,
        vehicleColor,
        vehicleLicenseNumber,
        vehicleModel,
        vehicleModelYear,
        vehicleTypeId,
      },
    };

    let newPayload;

    if (isNewUser) {
      newPayload = {
        ...defaultPayload,
        birthday: birthday || '',
        email,
        firstName,
        lastName,
        password,
        phone: phone || '',
      };
    } else {
      newPayload = {...defaultPayload, existingUserEmail};
    }
    const response = await axios({
      method: 'POST',
      url: endpoints.CUSTOMER_DRIVERS.replace('{0}', customerId),
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      data: newPayload,
    });

    return camelize(response.data.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Get Driver Detail
 * @param {int} customerId
 * @param {int} identityId
 * @param {int} driverId
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const getDriverDetailAsync = async (
  customerId,
  identityId,
  driverId,
  token
) => {
  try {
    const response = await axios({
      method: 'GET',
      url: endpoints.CUSTOMER_DRIVER_DETAIL.replace('{0}', customerId)
        .replace('{1}', identityId)
        .replace('{2}', driverId),
      headers: {Authorization: token},
    });
    return camelize(response.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Get Driver List
 * @param {object} filterObject {limit, page}
 * limit (optional) (int)
 * page (optional) (int) #offset, start from 1 value
 * @param {string} token
 * @return {promise} reject/resolve
 * Will return [] array if there's no drivers
 */
export const getDriversAsync = async (filterObject = {}, token) => {
  try {
    let paramString = convertObjectIntoURLString(filterObject);

    const response = await axios({
      method: 'GET',
      url: `${endpoints.API_V3.DRIVER}/${paramString.replace('&', '?')}`,
      headers: {Authorization: `Bearer ${token}`},
    });

    return camelize(response.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Update Driver
 * @param {object} filterObject
 * @param {string} token
 * @return {promise} reject/resolve
 * @deprecated since version 0.1.77
*/
export const updateDriverAsync = async (filterObject = {}, token) => {
  try {
    let paramString = convertObjectIntoURLString(filterObject);

    const response = await axios({
      method: 'PUT',
      url: `${endpoints.API_V3.DRIVER}/${paramString.replace('&', '?')}`,
      headers: {Authorization: `Bearer ${token}`},
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
 * Will return [] array if there's no drivers
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
 * @param {object} filterObject {orderRouteTypeIds, driverTypeIds, driverStatusId}
 * orderRouteTypeIds (string) (optinal) 1,2 #csv string
 * * 1 means Live, 2 means POD
 * driverTypeIds (string) (optinal) 1 #csv string
 * * 1 means Inhouse, 2 means Public, 3 means Service Provider
 * driverStatusIds (string) (optinal) 1,2,3,4 #csv string
 * * 1 means Active, 2 means With Route, 3 means Idle, 4 means Inactive driver
 * @param {int} customerId
 * @param {string} token
 * @param {boolean} validationStatus (optional)
 * @return {promise} reject/resolve
 * Will return [] array if there's no drivers
 */
 //TODO: needs unit testing
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
      headers: {Authorization: token},
    });
    return camelize(categoriesCustomerDrivers(response.data));
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Get Driver Counts for Dashboard
 * @param {object} filterObject {orderRouteTypeIds, driverTypeIds, driverStatusId}
 * orderRouteTypeIds (string) (optinal) 1,2 #csv string
 * * 1 means Live, 2 means POD
 * driverTypeIds (string) (optinal) 1 #csv string
 * * 1 means Inhouse, 2 means Public, 3 means Service Provider
 * driverStatusIds (string) (optinal) 1,2,3,4 #csv string
 * * 1 means Active, 2 means With Route, 3 means Idle, 4 means Inactive driver
 * @param {string} customerId
 * @param {boolean} token (optional)
 * @return {promise} reject/resolve
 * Will return [] array if there's no drivers
 */
 //TODO: needs unit testing
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
      headers: {Authorization: token},
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
 * pickupDate (optional)(string) = '2018-02-28'
 * withAvailability (optional)(int) = 1/0
 * withSchedule (optional)(int) = 1/0
 * limit = 20 (optional)(int)
 * page = 0 (optional)(int)
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
 //TODO: needs unit testing
export const getDriverRoutesAsync = async (filterObject, token) => {
  try {
    let paramString = convertObjectIntoURLString(camelToSnake(filterObject));
    const routes = await axios({
      method: 'GET',
      url: `${endpoints.API_V3.DRIVER_ROUTE}${paramString.replace('&', '?')}`,
      headers: {Authorization: `Bearer ${token}`},
    });

    return camelize(routes.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Get updated driver live data for Dashboard
 * This function will calculate all of driver counts
 * @param {object} originalDriverDatum
 * @param {string} pubSubPayload
 * @param {boolean} filterObject
 * @return {promise} reject/resolve
 * Will return [] array if there's no drivers
 */
export const getUpdatedDriverLiveData = (
  originalDriverDatum,
  pubSubPayload,
  filterObject
) => {
  try {
    pubSubPayload = camelize(pubSubPayload);
    pubSubPayload.data.driverStatusId = pubSubPayload.data.orderId > 0 ? 2 : 1;
    let payload = pubSubPayload.data;
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
      return originalDriverDatum;
    }

    let driverStatusKeys = Object.keys(originalDriverDatum['data']);
    let matchedPayload = driverStatusKeys.reduce(
      (matchedPayload, statusId) => {
        let index = originalDriverDatum['data'][statusId].findIndex((order) => {
          return payload.driverId === parseInt(order.driverId); // order.driverId might be string/integer;
        });
        if (index >= 0) {
          matchedPayload.isDataExist = true;
          matchedPayload.statusId = statusId;
          matchedPayload.index = index;
          matchedPayload.data = originalDriverDatum['data'][statusId][index];
        }
        return matchedPayload;
      },
      {isDataExist: false, statusId: 0, index: -1, data: {}}
    );

    if (matchedPayload.isDataExist) {
      // update activeStatusCounts
      originalDriverDatum['activeStatusCounts'][payload.driverStatusId] += 1;
      const currentStatusCounts =
        originalDriverDatum['activeStatusCounts'][matchedPayload.statusId];

      if (currentStatusCounts) {
        originalDriverDatum['activeStatusCounts'][matchedPayload.statusId] -= 1;
      }

      originalDriverDatum['data'][matchedPayload.statusId].splice(
        matchedPayload.index,
        1
      );
    } else {
      originalDriverDatum['totalStatusCounts'] += 1;
      filterObject.driverTypeIds.map((driverTypeId) => {
        originalDriverDatum['driverTypeCounts'][driverTypeId] += 1;
      });
      originalDriverDatum['activeStatusCounts'][payload.driverStatusId] += 1;
    }
    // update data Object
    originalDriverDatum['data'][payload.driverStatusId].push(payload);
    return originalDriverDatum;
  } catch (e) {
    return {
      statusCode: '500',
      statusText: 'Error in updating job live data',
    };
  }
};

/** Update driver time slot
 * @param {int} scheduleId
 * @param {object} payload {driverId, transactionGroupId, startTime, endTime, startDate}
 * scheduleId (optional)(int)
 * transactionGroupId (optional)(int)
 * startTime (optional)(date_format:H:i)
 * endTime (optional)(date_format:H:i)
 * startDate (optional)(date_format:Y-m-d)
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
  token
) => {
  try {
    const result = await axios({
      method: 'put',
      url: `${endpoints.API_V3.DRIVER_SCHEDULE.replace('{0}', scheduleId)}`,
      headers: {Authorization: `Bearer ${token}`},
      data: camelToSnake(payload),
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
      headers: {Authorization: `Bearer ${token}`},
    });
    return {data: true};
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/** Add new driver time slot
 * @param {object} payload {driverId, transactionGroupId, startTime, endTime, startDate}
 * driverId (mandatory)(int)
 * transactionGroupId (mandatory)(int)
 * startTime (mandatory)(date_format:H:i)
 * endTime (mandatory)(date_format:H:i)
 * startDate (mandatory)(date_format:Y-m-d)
 * @param {string} token resolve/reject
 * @return {Object} Promise resolve/reject
 * If resolve, return value: boolean(To indicate update successful or failed)
 * remarks: the API endpoint will return one of the following status:
 * 400: Validation Error
 * 400: Driver Schedule with same values exists
 * 200: Success
 */
export const createDriverScheduleAsync = async (payload = {}, token) => {
  try {
    const result = await axios({
      method: 'post',
      url: `${endpoints.API_V3.DRIVER_SCHEDULE.replace('{0}', '')}`,
      headers: {Authorization: `Bearer ${token}`},
      data: camelToSnake(payload),
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
 */
function calculateCustomerDriverCounts(data, driverTypeIds) {
  const countData = {
    totalStatusCounts: 0,
    activeStatusCounts: {1: 0, 2: 0, 3: 0, 4: 0},
    driverTypeCounts: {1: 0, 2: 0, 3: 0},
  };

  let drivers = categoriesCustomerDriversForCount(data);
  return arrayReduce(
    convertObjectIntoKeyValueArray(drivers.data),
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
    convertObjectIntoKeyValueArray(drivers.data[value]),
    getActiveStatusCountsAndTotalCounts.bind(
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
    1: {1: [], 2: [], 3: [], 4: []},
    2: {1: [], 2: [], 3: [], 4: []},
    3: {1: [], 2: [], 3: [], 4: []},
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
  let responseData = {1: [], 2: [], 3: [], 4: []};
  return {
    data: drivers['data'].reduce((data, value) => {
      if (data[value.driver_status_id]) {
        data[value.driver_status_id].push(value);
      }
      return data;
    }, responseData),
  };
};
