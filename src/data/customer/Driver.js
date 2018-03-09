import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import {
  convertObjectIntoURLString,
  apiResponseErrorHandler,
} from '../utility/Util';

export const createNewDriverAsync = async (
  {
    birthday,
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
      method: 'post',
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

export const getCustomerDriverDetailAsync = async (
  customerId,
  identityId,
  driverId,
  token
) => {
  try {
    const response = await axios({
      method: 'get',
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

export const getCustomerDriverListAsync = async (filterObject = {}, token) => {
  try {
    let paramString = convertObjectIntoURLString(filterObject);

    const response = await axios({
      method: 'get',
      url: `${endpoints.CUSTOMER_DRIVERS}/${paramString.replace('&', '?')}`,
      headers: {Authorization: `Bearer ${token}`},
    });
    return camelize(response.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

export const getDriverListAsync = async (filterObject = {}, token) => {
  try {
    let paramString = convertObjectIntoURLString(filterObject);

    const response = await axios({
      method: 'get',
      url: `${endpoints.API_V3.DRIVER_LISTING}/${paramString.replace(
        '&',
        '?'
      )}`,
      headers: {Authorization: `Bearer ${token}`},
    });

    return camelize(response.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

export const exportDriverListFileAsync = async (format, token) => {
  // Return sample url which is using in frontend before api is finished.
  return {
    downloadUrl: 'http://gahp.net/wp-content/uploads/2017/09/sample.pdf',
  };

  // REVIEW remove commented, you can always find it back with git
  // try {
  // const response = await axios({
  //   method: 'get',
  //   url: `${endpoints.EXPORT_CUSTOMER_DRIVERS}?fileType=${format}`,
  //   headers: {Authorization: `Bearer ${token}`},
  // });
  //
  // return camelize(response.data);
  // } catch (e) {
  // return apiResponseErrorHandler(e);
  // }
};

export const deleteCustomerDriversAsync = async (
  driverIds,
  customerId,
  token
) => {
  // Return true which is using in frontend before api is finished.
  return {data: true};

  // try {
  // let paramString = driverIds.join();
  // const response = await axios({
  //   method: 'delete',
  //   url: `${endpoints.CUSTOMER_DRIVERS}?driver_ids=${paramString}`,
  //   headers: {Authorization: `Bearer ${token}`},
  // });
  // return camelize(response.data);
  // } catch (e) {
  // return apiResponseErrorHandler(e);
  // }
};

export const getCustomerDriversWithFiltersAsync = async (
  filterObject = {},
  customerId,
  token,
  validationStatus = false
) => {
  let paramString = convertObjectIntoURLString(filterObject);
  try {
    const response = await axios({
      method: 'get',
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

export const getCustomerDriverCountsAsync = async (
  filterObject = {},
  customerId,
  token
) => {
  let paramString = convertObjectIntoURLString(filterObject);
  try {
    const response = await axios({
      method: 'get',
      url: `endpoints.CUSTOMER_DRIVERS.replace('{0}', customerId)?${paramString}`,
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

export const updateDriverLiveData = (
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
