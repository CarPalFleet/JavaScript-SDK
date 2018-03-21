import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import FormData from 'form-data';
import {snakeCaseDecorator} from '../decorator/CoreDecorators';
import isEmpty from 'lodash.isempty';
import {
  convertObjectIntoURLString,
  apiResponseErrorHandler,
  rejectPromise,
  getCSVStringFromArrayObject,
  arrayReduce,
  arrayMap,
  hasSameObjectId,
} from '../utility/Util';

export const getOrdersWithFiltersAsync = async (
  filterObject = {},
  customerId,
  token,
  validationStatus = false
) => {
  let paramString = convertObjectIntoURLString(filterObject);
  try {
    const response = await axios({
      method: 'GET',
      url: `${endpoints.CUSTOMER_ORDERS.replace(
        '{0}',
        customerId
      )}${paramString.replace('&', '?')}`,
      headers: {Authorization: token},
    });
    return camelize(categoriesCustomerOrders(response.data));
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

export const getOrderCountsAsync = async (filterObject, customerId, token) => {
  let paramString = convertObjectIntoURLString(filterObject);
  try {
    const response = await axios({
      method: 'GET',
      url: `${endpoints.CUSTOMER_ORDERS.replace(
        '{0}',
        customerId
      )}${paramString.replace('&', '?')}`,
      headers: {Authorization: token},
    });
    return calculateCustomerOrderCounts(response.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

export const createDeliveryWindow = async (
  {
    customerId,
    identityId,
    productTypeId,
    transactionGroupId = null,
    displayName,
    startTime,
    endTime,
  },
  token
) => {
  try {
    let data = {
      identityId,
      productTypeId,
      displayName,
      startTime,
      endTime,
    };

    // REVIEW use ===
    if (productTypeId == 3) {
      data.transactionGroupId = transactionGroupId;
    }
    const response = await axios({
      method: 'POST',
      url: endpoints.DELIVERY_WINDOW.replace('{0}', customerId),
      headers: {Authorization: token},
      data,
    });
    return camelize(response.data.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/* Not Updated yet in README */
export const getDeliveryWindows = async (
  customerId,
  identityId,
  productTypeId,
  transactionGroupIds,
  token
) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${endpoints.DELIVERY_WINDOW.replace(
        '{0}',
        customerId
      )}?identityId=${identityId}`,
      headers: {Authorization: token},
    });

    return camelize(response.data.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

export const fileUploadForOrderAsync = async (fileObject, token) => {
  try {
    let form = new FormData();
    form.append('grouping_spreadsheet', fileObject);

    let response = await axios(endpoints.API_V3.BATCH_FILE_UPLOAD, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      data: form,
    });

    return camelize(response.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

export const getUploadedOrderProgressionAsync = async (customerId, token) => {
  try {
    let response = await axios({
      method: 'GET',
      url: `${endpoints.API_V3.GROUPING_BATCH_PROGRESSION}`,
      headers: {Authorization: `Bearer ${token}`},
    });

    let result = camelize(response.data);

    let updatedProgressData = {
      chunkProgression: result.data.chunkProgressionCount,
      totalChunkProgression: result.data.totalLocationCount,
      failedLocationCount: result.data.failedLocationCount,
      groupingLocationIdsSuccess: [],
    };

    return {data: updatedProgressData};
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/* Function name will be changed as getOrderDetialAsync */
export const getOrderAsync = async (groupingLocationId, token) => {
  try {
    let response = await axios({
      method: 'GET',
      url: `${endpoints.API_V3.GROUPING_LOCATIONS}/${groupingLocationId}`,
      headers: {Authorization: `Bearer ${token}`},
    });

    return camelize(response.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Retrieve specific order based on the search result
 * @param {int} customerId
 * @param {object} filterObject
 * @param {array} searchResult
 * @param {string} token
 * @return {promise} reject/resolve
 * Will return [] array if there's no groupingLocationIds
 */
export const getOrdersBasedOnSearchResult = async (
  customerId,
  filterObject,
  searchResult,
  token
) => {
  try {
    const filedName = 'groupingLocationId';
    const orderFilterFieldName = 'groupingLocationIds';
    // Manipulate the groupingLocationIds of Array Object into CSV string
    const groupingLocationIds = getCSVStringFromArrayObject(
      searchResult,
      filedName
    );
    if (!groupingLocationIds) {
      return [];
    }

    // filter the order with groupingLocationIds
    filterObject[orderFilterFieldName] = groupingLocationIds;
    const order = await getOrdersGroupByPickUpAddressAsync(
      filterObject,
      customerId,
      token
    );

    return order;
  } catch (e) {
    return rejectPromise(e);
  }
};

/**
 * Get Orders
 * @param {object} filterObject # {statusIds, groupingLocationIds, pickupDate (mandatory), limit, offset}
 * StatusIds = 1/2/3/4. 1 for 'pending', 2 for 'validated', 3 for 'grouped', 4 for 'failed'
 * groupingLocationIds (string)(optional) = "27638, 27644"
 * pickupDate (mandatory) = '2018-02-28'
 * limit = 20 (int)(optional)
 * offset = 0 (int)(optional)
 * @param {customerId} customerId
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const getOrdersGroupByPickUpAddressAsync = async (
  filterObject,
  customerId,
  token
) => {
  try {
    /* If there's no statusId is passed.
    * Use 2 as default. It means validated orders
    */
    let statusId = filterObject.statusIds || 2;
    let locations = await getOrdersAsync(filterObject, token);
    let errorContents;

    /* Check statusId whethere 4 or not
    * If statusId is 4, need to combine the response with error contents
    */
    if (statusId === 4) {
      errorContents = await getErrorOrderContentsAsync(
        filterObject.pickupDate,
        customerId,
        token
      );
    }

    return groupLocations(locations, errorContents ? errorContents : null);
  } catch (e) {
    // Response Promise Reject with statusCode and statusText
    return rejectPromise(e);
  }
};

/**
 * Merge Order Records
 * @param {array} oldValues
 * @param {array} newValues
 * @return {object} Promise resolve/reject
 */
export const mergeOldAndNewOrderRecords = (oldValues, newValues) => {
  try {
    let duplicateIndexes = arrayReduce(
      oldValues,
      findDuplicateIndexes.bind(null, newValues)
    );
    let result = arrayMap(
      duplicateIndexes,
      concatDuplicateObjects.bind(null, oldValues, newValues)
    );
    return result.oldValues.concat(result.newValues);
  } catch (e) {
    return rejectPromise(e);
  }
};

export const concatDuplicateObjects = (oldValues, newValues, data) => {
  oldValues[data.oldIndex]['jobs'] = oldValues[data.oldIndex]['jobs'].concat(
    newValues[data.newIndex]['jobs']
  );
  newValues.splice(data.newIndex, 1);
};

export const findDuplicateIndexes = (newValues, accumulator, aJob, i) => {
  let index = newValues.findIndex(hasSameObjectId.bind(null, aJob));
  if (index >= 0) {
    accumulator.push({oldIndex: i, newIndex: index});
  }
  return accumulator;
};

/**
 * Get Remanining Orders
 * @param {object} filterObject # {statusIds, pickupDate (mandatory), withOrder, withDriver, withRoute, sort, limit, offset}
 * StatusIds = 1/2/3/4. 1 for 'pending', 2 for 'validated', 3 for 'grouped', 4 for 'failed'
 * pickupDate (mandatory) = '2018-02-28'
 * withOrder (optional) = 1 OR 0
 * driverId (optional) = 1234
 * sort (optional) = fieldName,asc OR desc
 * limit = 20 (optional)
 * offset = 0 (optional)
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const getRemainingOrdersAsync = async (filterObject, token) => {
  try {
    let locations = await getOrdersAsync(filterObject, token);
    return groupLocations(locations);
  } catch (e) {
    return rejectPromise(e);
  }
};

export const getOrdersAsync = async (filterObject, token) => {
  try {
    /*
      Add following filter for remaining order
      statusIds = 2; // Success Grouping Locations
      withRoute = 0; // Grouping locations without routes
      withOrder = 1; // Grouping Location should have included orderId
      include = 'pickup_group,delivery_address'
      limit = 20
      offset = 0
    */
    let filters = snakeCaseDecorator(filterObject);
    let paramString = convertObjectIntoURLString(filters);
    let response = await axios({
      method: 'GET',
      url: `${endpoints.API_V3.GROUPING_LOCATIONS}${paramString.replace(
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

export const getErrorOrderContentsAsync = async (
  pickupDate,
  customerId,
  token
) => {
  try {
    let response = await axios({
      method: 'GET',
      url: `${endpoints.GROUPING_LOCATIONS_ERRORS.replace(
        '{0}',
        customerId
      )}?pickupDate=${pickupDate}`,
      headers: {Authorization: token},
    });

    return camelize(response.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Fixed error records in RDS
  and Truncate existing error records from Dynamodb
 * This function call 2 API endpoints one after another
 * Call editOrdersAsync to edit the error grouping locations
 * if it's success, call removeOrderErrorRecordsAsync to truncate records from Dynamodb
 * if both API call is success, it will return isUpdatedOrder and isTruncateErrorReords as true
 * @param {array} errorIds
 * @param {array} locationDataList
 * @param {string} token
 * @return {promise} reject/resolve
 * In resolve, it will return object. Example. {data, isUpdatedOrder, isTruncateErrorReords}
 * data = response object from edit endpoint
 * isUpdatedOrder = true means successfullly edited the orders
 * isTruncateErrorReords = true means successfully truncated errors
 */
export const updateAndTruncateOrderErrorsAsync = async (
  errorIds = [],
  locationDataList = [],
  token
) => {
  try {
    let editResponse = await editOrdersAsync(locationDataList, token);
    await removeOrderErrorRecordsAsync(errorIds, token);

    return {
      data: editResponse,
      isUpdatedOrder: true,
      isTruncateErrorReords: true,
    };
  } catch (e) {
    return rejectPromise(e);
  }
};

/**
 * Remove Order Error Record (single record) from Dynamodb
 * @param {int} groupingLocationId
 * @param {string} token
 * @return {promise} reject/resolve
 * if resolve, will return {data: true}
 */
export const removeErrorOrderRecordAsync = async (
  groupingLocationId,
  token
) => {
  try {
    await axios({
      method: 'DELETE',
      url: `${endpoints.ORDER_WITH_ERRORS}/${groupingLocationId}`,
      headers: {Authorization: token},
    });

    return {data: true};
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Remove Order Error Records (multiple records) from Dynamodb
 * @param {array} errorIds
 * @param {string} token
 * @return {promise} reject/resolve
 * if resolve, will return {data: true}
 */
export const removeOrderErrorRecordsAsync = async (errorIds = [], token) => {
  try {
    await axios({
      method: 'DELETE',
      url: `${endpoints.BATCH_ORDER_WITH_ERRORS}`,
      headers: {Authorization: token},
      data: {errorIds},
    });

    return {data: true};
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

export const getUniquePickupAddressesAsync = async (filterObject, token) => {
  try {
    let filters = snakeCaseDecorator(filterObject);
    let paramString = convertObjectIntoURLString(filters);
    let response = await axios({
      method: 'GET',
      url: `${endpoints.API_V3.PICKUP_GROUP}${paramString.replace('&', '?')}`,
      headers: {Authorization: `Bearer ${token}`},
    });

    let result = response.data ? camelize(response.data.data) : [];
    let pickupAddressList = result.map((locationObject) => {
      return {
        pickupGroupId: locationObject.id,
        pickupLocationAddress: locationObject.address.address,
      };
    });

    return {data: pickupAddressList};
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

export const createOrderAsync = async (locationObject, token) => {
  try {
    locationObject = snakeCaseDecorator(locationObject);
    let response = await axios({
      method: 'POST',
      url: endpoints.API_V3.GROUPING_LOCATIONS,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        location_data: JSON.stringify(snakeCaseDecorator(locationObject)),
      },
    });

    return camelize(response.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

export const editOrderAsync = async (
  groupingLocationId,
  locationObject,
  token
) => {
  try {
    let updatedLocationDataObject = {
      location_data: JSON.stringify(snakeCaseDecorator(locationObject)),
    };

    let response = await axios({
      method: 'PUT',
      url: `${endpoints.API_V3.GROUPING_LOCATIONS}/${groupingLocationId}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: updatedLocationDataObject,
    });

    return camelize(response.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

export const editOrdersAsync = async (locationDataList = [], token) => {
  try {
    let updatedLocationDataList = locationDataList.map((data) => {
      let tmpObject = {
        grouping_location_id: data.groupingLocationId,
        location_data: JSON.stringify(snakeCaseDecorator(data.locationData)),
      };
      return tmpObject;
    });

    let response = await axios({
      method: 'PUT',
      url: endpoints.API_V3.GROUPING_LOCATIONS,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: updatedLocationDataList,
    });

    return camelize(response.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

export const deleteOrderAsync = async (groupingLocationId, token) => {
  try {
    await axios({
      method: 'DELETE',
      url: `${endpoints.API_V3.GROUPING_LOCATIONS}/${groupingLocationId}`,
      headers: {Authorization: `Bearer ${token}`},
    });

    return {data: true};
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

export const deleteOrdersAsync = async (groupingLocationIds = [], token) => {
  try {
    let paramString = groupingLocationIds.join();
    await axios({
      method: 'DELETE',
      url: `${
        endpoints.API_V3.GROUPING_LOCATIONS
      }?grouping_location_ids=${paramString}`,
      headers: {Authorization: `Bearer ${token}`},
    });

    return {data: true};
  } catch (e) {
    // REVIEW move this line inside the if
    let errorObject;
    // REVIEW is there a reason to not use the default apiResponseErrorHandler() ?
    if (e.response.data instanceof Object) {
      errorObject = {
        statusCode: e.response.data.error.http_code,
        statusText: e.response.data.error.message,
      };
    } else {
      return apiResponseErrorHandler(e);
    }

    // REVIEW move this line inside the if
    return Promise.reject(errorObject);
  }
};

export const cancelBatchFileProcessAsync = async (batchId, token) => {
  try {
    let response = await axios({
      method: 'DELETE',
      url: `${endpoints.API_V3.GROUPING_LOCATIONS}/${batchId}`,
      headers: {Authorization: `Bearer ${token}`},
    });

    return camelize(response.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

export const getUpdatedJobLiveData = (
  originalJobDatum,
  pubSubPayload,
  filterObject
) => {
  try {
    pubSubPayload = camelize(pubSubPayload.payload);
    // If orderStatusId is 1, change into 2. #laraval side will handle it later.
    const orderStatusIds = [2, 5, 7, 9];
    if (pubSubPayload.orderStatusId == 1) pubSubPayload.orderStatusId = 2;

    /* palyload orderStatusId must be includes in 2,5,7,9
      payload date should be the same with today date
      payload orderStatusId orderStatusIds must be one of orderStatusIds of filterObject
      Else send return orginal Job Data */
    const isValidStatus = orderStatusIds.includes(pubSubPayload.orderStatusId);
    const isSameDate = pubSubPayload.pickupDate === filterObject.pickupDate;
    const isInclude = filterObject.orderStatusIds
      ? filterObject.orderStatusIds.includes(pubSubPayload.orderStatusId)
      : true;

    if (!(isValidStatus && isSameDate && isInclude)) {
      return originalJobDatum;
    }

    let jobStatusKeys = Object.keys(originalJobDatum['data']);
    let matchedPayload = jobStatusKeys.reduce(
      (matchedPayload, statusId) => {
        let index = originalJobDatum['data'][statusId].findIndex((order) => {
          return pubSubPayload.orderId == order.orderId; // orderId might be string/integer;
        });
        if (index >= 0) {
          matchedPayload.statusId = statusId;
          matchedPayload.index = index;
          matchedPayload.data = originalJobDatum['data'][statusId][index];
          matchedPayload.isDataExist =
            originalJobDatum['data'][statusId][index];
        }
        return matchedPayload;
      },
      {isDataExist: false, statusId: 0, index: -1, data: {}}
    );

    if (matchedPayload.isDataExist) {
      // update activeStatusCounts
      originalJobDatum['activeStatusCounts'][pubSubPayload.orderStatusId] += 1;
      let currentStatusCounts =
        originalJobDatum['activeStatusCounts'][matchedPayload.statusId];
      originalJobDatum['activeStatusCounts'][
        matchedPayload.statusId
      ] -= currentStatusCounts ? 1 : 0;
      // REVIEW same as before with the delete and splice
      delete originalJobDatum['data'][matchedPayload.statusId].splice(
        matchedPayload.index,
        1
      );
    } else {
      originalJobDatum['totalStatusCounts'] += 1;
      originalJobDatum['activeStatusCounts'][pubSubPayload.orderStatusId] += 1;
    }
    // update data Object
    originalJobDatum['data'][pubSubPayload.orderStatusId].push(pubSubPayload);
    return originalJobDatum;
  } catch (e) {
    return {statusCode: '500', statusText: 'Error in updating job live data'};
  }
};

/**
 * Calculate Customer Order Counts
 * @param {object} data
 * @return {object} data # retrun count of data object
 */
function calculateCustomerOrderCounts(data) {
  let orders = categoriesCustomerOrders(data);
  let countData = {totalStatusCounts: 0, activeStatusCounts: {}};
  return Object.keys(orders.data).reduce(function(counts, value) {
    counts.activeStatusCounts[value] = orders.data[value].length;
    counts.totalStatusCounts += orders.data[value].length;
    return counts;
  }, countData);
}

/**
 * Categories Customer Orders
 * @param {object} orders
 * @return {object} data
 */
function categoriesCustomerOrders(orders) {
  let responseData = {2: [], 5: [], 7: [], 9: []};
  return {
    data: orders['data'].reduce((data, value) => {
      if (data[value.order_status_id]) {
        data[value.order_status_id].push(value);
      }
      return data;
    }, responseData),
  };
}

export const groupLocations = (locations, errorContents = null) => {
  let locationsGroups = locations['data'].reduce(
    (groupAddressObject, location, index) => {
      return groupLocationByPickUpAddress(
        groupAddressObject,
        location,
        errorContents
      );
    },
    {data: [0], groupIds: [0]}
  );

  if (typeof locationsGroups['data'][0] === 'number') {
    locationsGroups['data'].splice(0, 1);
  }

  const result = {
    totalLocationCount: locations['meta'].totalLocationCount, // total_location_count
    successLocationCount: locations['meta'].validatedLocationCount, // validated_location_count
    failedLocationCount: locations['meta'].failedLocationCount, // failed_location_count
    data: locationsGroups.data,
  };

  return result;
};

/**
 * Group Order by Pickup Address
 * @param {object} groups
 * @param {object} location
 * @param {object} errorContents The errorContent number.
 * @return {object} groupped addresses
 */
function groupLocationByPickUpAddress(groups, location, errorContents) {
  // ErrorContents
  let groupId = location.pickupGroupId;
  let index = groups['groupIds'].indexOf(groupId);
  if (index === -1) {
    index = groupId ? groups['groupIds'].length : 0;
    if (index) groups['groupIds'].push(groupId);
  }

  if (!(groups['data'][index] instanceof Object)) {
    groups['data'][index] = {
      id: groupId,
      address: location.pickupLocationAddress,
      jobs: [],
    };
  }

  // driver will be empty array if there's no driver info
  // Add avatarUrl as a empty string, this field will be included in response.
  isEmpty(location.driver)
    ? (location.driver = {})
    : (location.driver['avatarUrl'] = '');

  if (errorContents) {
    location.error = mergeLocationDataWithErrors(errorContents, location);
  }

  location.latitude = location.latitude || '';
  location.longitude = location.longitude || '';
  groups['data'][index]['jobs'].push(location);

  return groups;
}

/**
 * Merge Location data with Errors
 * @param {object} errorContents # Error object
 * @param {object} location # location object
 * @return {array} errorList
 * if there's no error for this location, it will response empty array.
 */
export const mergeLocationDataWithErrors = (errorContents, location) => {
  const error = errorContents.data.find(
    (errorContent) => errorContent.groupingLocationId === location.id
  );
  if (error) {
    return Object.keys(error['errorMessages']).reduce((errorList, key) => {
      if (
        error['errorMessages'][key].length &&
        key.search('Suggestion') === -1
      ) {
        let includeSuggestionKey =
          error['errorMessages'][key] ===
          ('pickupLocationAddress' || 'deliveryAddress');

        errorList.push({
          key: key,
          errorId: error['id'],
          suggestionKey: includeSuggestionKey ? ['latitude', 'longitude'] : [],
          suggestion: error['errorMessages'][key + 'Suggestion'] || '',
          errorMessage: error['errorMessages'][key],
        });
      }
      return errorList;
    }, []);
  }

  /* Response empty array if there's no error from dynamodb */
  return [];
};
