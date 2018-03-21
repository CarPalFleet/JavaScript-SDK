import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import {
  convertObjectIntoURLString,
  apiResponseErrorHandler,
  rejectPromise,
  getCSVStringFromArrayObject,
} from '../utility/Util';

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
 * Retrieve specific driver based on the search result
 * @param {object} filterObject
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

export const deleteDriversAsync = async (driverIds, customerId, token) => {
  // Return true which is using in frontend before api is finished.
  return {data: true};

  // try {
  // let paramString = driverIds.join();
  // const response = await axios({
  //   method: 'DELETE',
  //   url: `${endpoints.CUSTOMER_DRIVERS}?driver_ids=${paramString}`,
  //   headers: {Authorization: `Bearer ${token}`},
  // });
  // return camelize(response.data);
  // } catch (e) {
  // return apiResponseErrorHandler(e);
  // }
};

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

export const getUpdatedDriverLiveData = (
  originalDriverDatum,
  pubSubPayload,
  filterObject
) => {
  try {
    pubSubPayload = camelize(pubSubPayload);
    pubSubPayload.data.driverStatusId = pubSubPayload.data.orderId > 0 ? 2 : 1;
    let payload = pubSubPayload.data;
    // REVIEW explain what those ids refer to
    const driverStatusIds = [1, 2, 3, 4];
    const isValidStatus = driverStatusIds.includes(payload.driverStatusId);
    // REVIEW this code is hard to understand maybe I am wrong but it seems erronous
    // a ternary condition should look like:
    // condition ? expr1 : expr2
    // but here we have
    // const isIncludeInStatusIds = filterObject.driverStatusIds ? expr1 : expr2
    // filterObject.driverStatusIds is not a condition and looks like part of an object
    // moreover .includes already return a boolean so I don't understand the point
    const isIncludeInStatusIds = filterObject.driverStatusIds
      ? filterObject.driverStatusIds.includes(payload.driverStatusId)
      : true;
    let isIncludeInDriverTypeIds = true;
    // REVIEW this is also hard to understand how is driverTypeIds a condition or boolean
    // you are checking if there is value ?
    // consider using filterObject.driverTypeIds != null
    // I intentionally wrote != instead of !== check this link to understand why http://adripofjavascript.com/blog/drips/equals-equals-null-in-javascript.html
    if (filterObject.driverTypeIds) {
      let hasDriverTypeId = payload.driverTypeIds.find((driverTypeId) => {
        return filterObject.driverTypeIds.includes(driverTypeId);
      });
      // REVIEW you can replace this ternary by
      // isIncludeInDriverTypeIds = !!hasDriverTypeId
      // you can check this link to understand the double negation https://blog.jscrambler.com/12-extremely-useful-hacks-for-javascript/
      isIncludeInDriverTypeIds = hasDriverTypeId ? true : false;
    } else isIncludeInDriverTypeIds = true;

    if (!(isValidStatus && isIncludeInDriverTypeIds && isIncludeInStatusIds)) {
      return originalDriverDatum;
    }

    let driverStatusKeys = Object.keys(originalDriverDatum['data']);
    let matchedPayload = driverStatusKeys.reduce(
      (matchedPayload, statusId) => {
        let index = originalDriverDatum['data'][statusId].findIndex((order) => {
          // REVIEW consider converting values to the same type and use triple equal here
          return payload.driverId == order.driverId; // orderId might be string/integer;
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
      // REVIEW you can use const here
      let currentStatusCounts =
        originalDriverDatum['activeStatusCounts'][matchedPayload.statusId];

      // REVIEW this ternary is also hard to understand
      // if(originalDriverDatum['activeStatusCounts'][matchedPayload.statusId] != null)  {
      //   originalDriverDatum['activeStatusCounts'][matchedPayload.statusId] -=1
      // }
      originalDriverDatum['activeStatusCounts'][
        matchedPayload.statusId
      ] -= currentStatusCounts ? 1 : 0;

      // REVIEW remove the delete keyword, splice function already remove the items
      // moreover this is not how delete works
      delete originalDriverDatum['data'][matchedPayload.statusId].splice(
        matchedPayload.index,
        1
      );
    } else {
      originalDriverDatum['totalStatusCounts'] += 1;
      // REVIEW consider using .map or .reduce
      filterObject.driverTypeIds.forEach((driverTypeId) => {
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
      // REVIEW is it useful to pass e as well?
      e,
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
 * @param {Object} Promise resolve/reject
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
      url: `${endpoints.API_V3.DIRVER_SCHEDULE.replace('{0}', scheduleId)}`,
      headers: {Authorization: `Bearer ${token}`},
      data: payload,
    });
    return camelize(result.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/** deleteDriverScheduleAsync
 * @param {int} scheduleId
 * @param {Object} Promise resolve/reject
 * return value: boolean(To indicate delete successful or failed)
 * remarks: the API endpoint will return one of the following status:
 * 404: Driver Schedule does not exists
 * 204: Success with no content
 */

export const deleteDriverScheduleAsync = async (scheduleId, token) => {
  try {
    await axios({
      method: 'delete',
      url: `${endpoints.API_V3.DIRVER_SCHEDULE.replace('{0}', scheduleId)}`,
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
      url: `${endpoints.API_V3.DIRVER_SCHEDULE.replace('{0}', '')}`,
      headers: {Authorization: `Bearer ${token}`},
      data: payload,
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
 * @return {object}
 */
function calculateCustomerDriverCounts(data, driverTypeIds) {
  // REVIEW please be consistent using function keyword or arrow functions
  let countData = {
    totalStatusCounts: 0,
    activeStatusCounts: {1: 0, 2: 0, 3: 0, 4: 0},
    driverTypeCounts: {1: 0, 2: 0, 3: 0},
  };

  // REVIEW categoriesCustomerDriversForCount() only takes one argument
  let drivers = categoriesCustomerDriversForCount(
    data,
    countData,
    driverTypeIds
  );

  // REVIEW this is extremely complicated to understand can you split it in smaller functions or steps
  return Object.keys(drivers.data).reduce(function(counts, value) {
    Object.keys(drivers.data[value]).forEach(function(key) {
      let count = drivers.data[value][key].length;
      driverTypeIds.forEach(function(driverTypeId) {
        if (driverTypeId == value) {
          counts.activeStatusCounts[key] += count;
          counts.totalStatusCounts += count;
        }
      });
      counts.driverTypeCounts[value] += count;
    });
    return counts;
  }, countData);
}

/**
 * Categories Customer Drivers for Count
 * @param {object} drivers
 * @return {object} drivers
 */
function categoriesCustomerDriversForCount(drivers) {
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
}

/**
 * Categories Customer Drivers
 * @param {object} drivers
 * @return {object} drivers
 */
function categoriesCustomerDrivers(drivers) {
  let responseData = {1: [], 2: [], 3: [], 4: []};
  return {
    data: drivers['data'].reduce((data, value) => {
      if (data[value.driver_status_id]) {
        data[value.driver_status_id].push(value);
      }
      return data;
    }, responseData),
  };
}
