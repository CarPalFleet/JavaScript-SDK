/**
 * @fileoverview This file contains all Order related functions that are triggered by a Customer
 */

import axios from "axios";
import endpoints from "../Endpoint";
import camelize from "camelize";
import FormData from "form-data";
import {camelToSnake} from "../utility/ChangeCase";
import isEmpty from "lodash.isempty";
import {
  convertObjectIntoURLString,
  apiResponseErrorHandler,
  rejectPromise,
  getCSVStringFromArrayObject,
  arrayReduce,
  arrayMap,
  hasSameObjectId,
} from "../utility/Util";

/**
 * Get Order with filters for Dashboard
 * @param {object} filterObject # {pickupDate (mandatory), routeStatusIds, includeOrders, limit, offset}
 * @param {int} customerId # {pickupDate (mandatory), routeStatusIds, includeOrders, limit, offset}
 * @param {string} token # {pickupDate (mandatory), routeStatusIds, includeOrders, limit, offset}
 * @param {boolean} validationStatus
 * pickupDate (optional)(string) = "2018-02-28"
 * routeStatusIds (optional)(int) = 1,2 (csv)
 * includeOrders (optional)(bollean) = true/false
 * limit = 20 (optional)(int)
 * page = 0 (optional)(int)
 * @return {object} Promise resolve/reject
 */
 // TODO: should be called Jobs, as the dashboard does not have Orders and should be moved to Job.js + needs unit test
export const getOrdersWithFiltersAsync = async (
  filterObject = {},
  customerId,
  token,
  validationStatus = false
) => {
  let paramString = convertObjectIntoURLString(filterObject);
  try {
    const response = await axios({
      method: "GET",
      url: `${endpoints.CUSTOMER_ORDERS.replace(
        "{0}",
        customerId
      )}${paramString.replace("&", "?")}`,
      headers: {Authorization: token},
    });
    return camelize(categoriesCustomerOrders(response.data));
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Retrieve Remaining Orders Count
 * @param {object} filterObject # {pickupDate, withOrder}
 * pickupDate (mandatory)(string) = "2018-02-28"
 * withOrder (optional)(int)
 //TODO: should be renamed to jobs after API is refactored
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const getRemainingOrdersCountAsync = async (filterObject, token) => {
  let paramString = convertObjectIntoURLString(camelToSnake(filterObject));
  try {
    const response = await axios({
      method: "GET",
      url: `${endpoints.API_V3.GROUPING_LOCATION_COUNT}${paramString.replace("&", "?")}`,
      headers: {Authorization: `Bearer ${token}`},
    });

    return camelize(response.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Retrieve All Order Counts (to be renamed to Retrieve All Jobs Counts)
 * @param {object} filterObject # {pickupDate, limit, offset}
 * pickupDate (optional)(string) = "2018-02-28"
 * limit = 20 (optional)(int)
 * offset = 0 (optional)(int)
 * @param {int} customerId
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
 // TODO: should be called Jobs, as the dashboard does not have Orders and should be moved to Job.js and needs unit testing
export const getOrderCountsAsync = async (filterObject, customerId, token) => {
  let paramString = convertObjectIntoURLString(filterObject);
  try {
    const response = await axios({
      method: "GET",
      url: `${endpoints.CUSTOMER_ORDERS.replace(
        "{0}",
        customerId
      )}${paramString.replace("&", "?")}`,
      headers: {Authorization: token},
    });
    return calculateCustomerOrderCounts(response.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Create delivery window
 * @param {object} payload {customerId, identityId, productTypeId, transactionGroupId, displayName, startTime, endTime}
 * customerId (optional)(string) = "2018-02-28"
 * identityId (optional)(int) = 20
 * productTypeId (optional)(int) = 20
 * transactionGroupId (optional)(int) = 20
 * displayName (optional)(string) = 20
 * startTime (optional)(string) = 20
 * endTime (optional)(string) = 0
 * @param {string} token
 * @return {object} Promise resolve/reject
 * @deprecated since version 0.1.77
 */
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

    const carpalFleetProductTypeId = 3;
    if (productTypeId === carpalFleetProductTypeId) {
      data.transactionGroupId = transactionGroupId;
    }
    const response = await axios({
      method: "POST",
      url: endpoints.DELIVERY_WINDOW.replace("{0}", customerId),
      headers: {Authorization: token},
      data,
    });
    return camelize(response.data.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Retrieve delivery window
 * @param {int} customerId
 * @param {int} identityId
 * @param {int} productTypeId
 * @param {array} transactionGroupIds
 * @param {string} token
 * @return {object} Promise resolve/reject
 * @deprecated since version 0.1.77
 */
export const getDeliveryWindows = async (
  customerId,
  identityId,
  productTypeId,
  transactionGroupIds,
  token
) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${endpoints.DELIVERY_WINDOW.replace(
        "{0}",
        customerId
      )}?identityId=${identityId}`,
      headers: {Authorization: token},
    });

    return camelize(response.data.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Upload Excel file for orders
 * @param {object} fileObject
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const fileUploadForOrderAsync = async (fileObject, token) => {
  try {
    let form = new FormData();
    form.append("grouping_spreadsheet", fileObject);

    let response = await axios(endpoints.API_V3.BATCH_FILE_UPLOAD, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: form,
    });

    return camelize(response.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Check the progress of order file uploading process
 * @param {int} customerId
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const getUploadedOrderProgressionAsync = async (customerId, token) => {
  try {
    let response = await axios({
      method: "GET",
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

/**
 * Retrieve single order
 * @param {object} groupingLocationId
 * @param {string} token
 * @return {object} Promise resolve/reject
 //TODO: needs more extensive unit testing
 */
export const getOrderAsync = async (groupingLocationId, token) => {
  try {
    let response = await axios({
      method: "GET",
      url: `${endpoints.API_V3.GROUPING_LOCATIONS}/${groupingLocationId}`,
      headers: {Authorization: `Bearer ${token}`},
    });

    return camelize(response.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Retrieve orders based on search result
 * @param {int} customerId
 * @param {object} filterObject {pickupDate, limit, offset}
 * pickupDate (optional)(string) = "2018-02-28"
 * limit = 20 (optional)(int)
 * offset = 0 (optional)(int)
 * @param {int} searchResult
 * @param {string} token
 * @return {object} Promise resolve/reject
 //TODO: deprecated not being used on front-end? If not, needs unit test
 */
export const getOrdersBasedOnSearchResult = async (
  customerId,
  filterObject,
  searchResult,
  token
) => {
  try {
    const filedName = "groupingLocationId";
    const orderFilterFieldName = "groupingLocationIds";
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
 * Retrieve All Order Counts //TODO: is this description correct?
 * @param {object} filterObject # {pickupDate, limit, offset}
 * pickupDate (optional)(string) = "2018-02-28"
 * limit = 20 (optional)(int)
 * offset = 0 (optional)(int)
 * @param {int} customerId
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const getOrdersGroupByPickUpAddressAsync = async (
  filterObject,
  customerId,
  token
) => {
  try {
    /* If there"s no statusId is passed.
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
//TODO: description is vague and not unit testing
 * Merge Order Records
 * @param {array} oldValues
 * @param {array} newValues
 * @return {object} Promise resolve/reject
 * Response merged order object
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

/**
//TODO: description is vague and no unit tests
 * Merge Two Objects which has the same id
 * @param {object} oldValues
 * @param {object} newValues
 * @param {object} data
 */
export const concatDuplicateObjects = (oldValues, newValues, data) => {
  oldValues[data.oldIndex]["jobs"] = oldValues[data.oldIndex]["jobs"].concat(
    newValues[data.newIndex]["jobs"]
  );
  newValues.splice(data.newIndex, 1);
};

/**
//TODO: description is vague and no unit test
 * Find duplicate indexes
 * @param {object} newValues
 * @param {array} accumulator
 Example [{oldIndex: i, newIndex: index}]
 * @param {object} oldValues
 * @param {int} i # iterator
 * @return {object} Promise resolve/reject
 */
export const findDuplicateIndexes = (newValues, accumulator, oldValues, i) => {
  let index = newValues.findIndex(hasSameObjectId.bind(null, oldValues));
  if (index >= 0) {
    accumulator.push({oldIndex: i, newIndex: index});
  }
  return accumulator;
};

/**
 * Get Remaining Orders
 * @param {object} filterObject # {statusIds, pickupDate (mandatory), withOrder, withDriver, withRoute, sort, limit, offset}
 * StatusIds = 1/2/3/4. 1 for "pending", 2 for "validated", 3 for "grouped", 4 for "failed"
 * pickupDate (mandatory) = "2018-02-28"
 * withOrder (optional) = 1 OR 0
 * driverId (optional) = 1234
 * sort (optional) = fieldName,asc OR desc
 * limit = 20 (optional)
 * offset = 0 (optional)
 * @param {string} token
 * @return {object} Promise resolve/reject
 //TODO: not sure if this function is still used by admin? / no unit tests
 */
export const getRemainingOrdersAsync = async (filterObject, token) => {
  try {
    let locations = await getOrdersAsync(filterObject, token);
    return groupLocations(locations);
  } catch (e) {
    return rejectPromise(e);
  }
};

/**
 * Get orders
 * @param {object} filterObject # {pickupDate (mandatory), limit, offset}
 * pickupDate (optional)(string) = "2018-02-28"
 * limit = 20 (optional)(int)
 * page = 0 (optional)(int)
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const getOrdersAsync = async (filterObject, token) => {
  try {
    /*
      Add following filter for remaining order
      statusIds = 2; // Success Grouping Locations
      withRoute = 0; // Grouping locations without routes
      withOrder = 1; // Grouping Location should have included orderId
      include = "pickup_group,delivery_address"
      limit = 20
      offset = 0
    */
    let filters = camelToSnake(filterObject);
    let paramString = convertObjectIntoURLString(filters);
    let response = await axios({
      method: "GET",
      url: `${endpoints.API_V3.GROUPING_LOCATIONS}${paramString.replace(
        "&",
        "?"
      )}`,
      headers: {Authorization: `Bearer ${token}`},
    });

    return camelize(response.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Get upload order"s error contents from Dynamodb
 * @param {object} pickupDate # {pickupDate (mandatory)}
 * pickupDate (optional)(string) = "2018-02-28"
 * @param {int} customerId
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const getErrorOrderContentsAsync = async (
  pickupDate,
  customerId,
  token
) => {
  try {
    let response = await axios({
      method: "GET",
      url: `${endpoints.GROUPING_LOCATIONS_ERRORS.replace(
        "{0}",
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
 * on success, call removeOrderErrorRecordsAsync to truncate records from Dynamodb
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
 TODO: needs unit testing, is this function used?
 */
export const removeErrorOrderRecordAsync = async (
  groupingLocationId,
  token
) => {
  try {
    await axios({
      method: "DELETE",
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
 Example ["56c719b7-93aa-420a-b9b1-140c4e03397b"]
 * @param {string} token
 * @return {promise} reject/resolve
 * if resolve, will return {data: true}
 */
export const removeOrderErrorRecordsAsync = async (errorIds = [], token) => {
  try {
    await axios({
      method: "DELETE",
      url: `${endpoints.BATCH_ORDER_WITH_ERRORS}`,
      headers: {Authorization: token},
      data: {errorIds},
    });

    return {data: true};
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Get pickup group
 * @param {object} filterObject # {pickupDate (mandatory), withOrder}
 * pickupDate (optional)(string) = "2018-02-28"
 * withOrder (optional)(int) = 0
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const getUniquePickupAddressesAsync = async (filterObject, token) => {
  try {
    let filters = camelToSnake(filterObject);
    let paramString = convertObjectIntoURLString(filters);
    let response = await axios({
      method: "GET",
      url: `${endpoints.API_V3.PICKUP_GROUP}${paramString.replace("&", "?")}`,
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

/**
 * Create single order
 * @param {object} locationObject
 //TODO: this object is not complete, an order can have much more parameters
 {
   pickupLocationAddress: "22 Gim moh road",
   deliveryAddress: "Holland Close",
   pickupDate: "28-02-2018",
   pickupTimeWindow: "14:35-16:00",
   deliveryDate: "28-02-2018",
   deliveryTimeWindow: "17:00-17:00",
   driverEmailId: null,
   capacity: 10,
 },
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const createOrderAsync = async (locationObject, token) => {
  try {
    locationObject = camelToSnake(locationObject);
    let response = await axios({
      method: "POST",
      url: endpoints.API_V3.GROUPING_LOCATIONS,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        location_data: JSON.stringify(camelToSnake(locationObject)),
      },
    });

    return camelize(response.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Edit single order
 * @param {int} groupingLocationId
 * @param {object} locationObject
 //TODO: this object is not complete, an order can have much more parameters
 {
   pickupLocationAddress: "22 Gim moh road",
   deliveryAddress: "Holland Close",
   pickupDate: "28-02-2018",
   pickupTimeWindow: "14:35-16:00",
   deliveryDate: "28-02-2018",
   deliveryTimeWindow: "17:00-17:00",
   driverEmailId: null,
   capacity: 10,
 },
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const editOrderAsync = async (
  groupingLocationId,
  locationObject,
  token
) => {
  try {
    let updatedLocationDataObject = {
      location_data: JSON.stringify(camelToSnake(locationObject)),
    };

    let response = await axios({
      method: "PUT",
      url: `${endpoints.API_V3.GROUPING_LOCATIONS}/${groupingLocationId}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: updatedLocationDataObject,
    });

    return camelize(response.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Edit multiple orders
 * @param {array} locationDataList
 //TODO: this object is not complete, an order can have much more parameters
 [
   {
     groupingLocationId: 27318,
     locationData: {
       pickupLocationAddress: "22 Gim moh road",
       deliveryAddress: "Holland Close",
       pickupDate: "28-02-2018",
       pickupTimeWindow: "14:35-16:00",
       deliveryDate: "28-02-2018",
       deliveryTimeWindow: "17:00-17:00",
       driverEmailId: null,
       capacity: 10,
     },
   },
 ]
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const editOrdersAsync = async (locationDataList = [], token) => {
  try {
    let updatedLocationDataList = locationDataList.map((data) => {
      let tmpObject = {
        grouping_location_id: data.groupingLocationId,
        location_data: JSON.stringify(camelToSnake(data.locationData)),
      };
      return tmpObject;
    });

    let response = await axios({
      method: "PUT",
      url: endpoints.API_V3.GROUPING_LOCATIONS,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: updatedLocationDataList,
    });

    return camelize(response.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Delete single order
 * @param {array} groupingLocationId
 * @param {string} token
 * @return {object} Promise resolve/reject
 * return {data: true} if deleting is success
 */
export const deleteOrderAsync = async (groupingLocationId, token) => {
  try {
    await axios({
      method: "DELETE",
      url: `${endpoints.API_V3.GROUPING_LOCATIONS}/${groupingLocationId}`,
      headers: {Authorization: `Bearer ${token}`},
    });

    return {data: true};
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Delete Multiple Orders
 * @param {array} groupingLocationIds
 * @param {string} token
 * @return {object} Promise resolve/reject
 * return {data: true} if deleting is success
 */
export const deleteOrdersAsync = async (groupingLocationIds = [], token) => {
  try {
    let paramString = groupingLocationIds.join();
    await axios({
      method: "DELETE",
      url: `${
        endpoints.API_V3.GROUPING_LOCATIONS
      }?grouping_location_ids=${paramString}`,
      headers: {Authorization: `Bearer ${token}`},
    });

    return {data: true};
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/** API is not ready yet
 * Cancel Batch File Process
 * @param {int} batchId
 * @param {string} token
 * @return {object} Promise resolve/reject
 * @deprecated since version 0.1.77
 */
export const cancelBatchFileProcessAsync = async (batchId, token) => {
  try {
    let response = await axios({
      method: "DELETE",
      url: `${endpoints.API_V3.GROUPING_LOCATIONS}/${batchId}`,
      headers: {Authorization: `Bearer ${token}`},
    });

    return camelize(response.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Get Updated Job Live Data for Dashboard
 * @param {object} originalJobDatum
 * @param {object} pubSubPayload
 * @param {string} filterObject {pickupDate, routeStatusIds, includeOrders, limit, offset}
 * @return {object} Promise resolve/reject
 */
 // TODO: function should be moved to file customer/Job.js + needs unit testing
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

    let jobStatusKeys = Object.keys(originalJobDatum["data"]);
    let matchedPayload = jobStatusKeys.reduce(
      (matchedPayload, statusId) => {
        let index = originalJobDatum["data"][statusId].findIndex((order) => {
          return pubSubPayload.orderId == order.orderId; // orderId might be string/integer;
        });
        if (index >= 0) {
          matchedPayload.statusId = statusId;
          matchedPayload.index = index;
          matchedPayload.data = originalJobDatum["data"][statusId][index];
          matchedPayload.isDataExist =
            originalJobDatum["data"][statusId][index];
        }
        return matchedPayload;
      },
      {isDataExist: false, statusId: 0, index: -1, data: {}}
    );

    if (matchedPayload.isDataExist) {
      // update activeStatusCounts
      originalJobDatum["activeStatusCounts"][pubSubPayload.orderStatusId] += 1;
      let currentStatusCounts =
        originalJobDatum["activeStatusCounts"][matchedPayload.statusId];
      originalJobDatum["activeStatusCounts"][
        matchedPayload.statusId
      ] -= currentStatusCounts ? 1 : 0;
      originalJobDatum["data"][matchedPayload.statusId].splice(
        matchedPayload.index,
        1
      );
    } else {
      originalJobDatum["totalStatusCounts"] += 1;
      originalJobDatum["activeStatusCounts"][pubSubPayload.orderStatusId] += 1;
    }
    // update data Object
    originalJobDatum["data"][pubSubPayload.orderStatusId].push(pubSubPayload);
    return originalJobDatum;
  } catch (e) {
    return {statusCode: "500", statusText: "Error in updating job live data"};
  }
};

/**
 * Calculate Customer Order Counts
 * @param {object} data
 * @return {object} data # retrun count of data object
 //TODO: needs unit testing
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
export const categoriesCustomerOrders = (orders) => {
  let responseData = {2: [], 5: [], 7: [], 9: []};
  return {
    data: orders["data"].reduce((data, value) => {
      if (data[value.order_status_id]) {
        data[value.order_status_id].push(value);
      }
      return data;
    }, responseData),
  };
};

/**
 * Group Locations with error contents
 * @param {object} locations
 * @param {object} errorContents
 * @return {object} { data: [0], groupId: [2]}
 */
export const groupLocations = (locations, errorContents = null) => {
  let locationsGroups = locations["data"].reduce(
    (groupAddressObject, location, index) => {
      return groupLocationByPickUpAddress(
        groupAddressObject,
        location,
        errorContents
      );
    },
    {data: [0], groupIds: [0]}
  );

  if (typeof locationsGroups["data"][0] === "number") {
    locationsGroups["data"].splice(0, 1);
  }

  const result = {
    totalLocationCount: locations["meta"].totalLocationCount, // total_location_count
    successLocationCount: locations["meta"].validatedLocationCount, // validated_location_count
    failedLocationCount: locations["meta"].failedLocationCount, // failed_location_count
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
  let index = groups["groupIds"].indexOf(groupId);
  if (index === -1) {
    index = groupId ? groups["groupIds"].length : 0;
    if (index) groups["groupIds"].push(groupId);
  }

  if (!(groups["data"][index] instanceof Object)) {
    groups["data"][index] = {
      id: groupId,
      address: location.pickupLocationAddress,
      jobs: [],
    };
  }

  // driver will be empty array if there's no driver info
  // Add avatarUrl as a empty string, this field will be included in response.
  isEmpty(location.driver)
    ? (location.driver = {})
    : (location.driver["avatarUrl"] = "");

  if (errorContents) {
    location.error = mergeLocationDataWithErrors(errorContents, location);
  }

  location.latitude = location.latitude || "";
  location.longitude = location.longitude || "";
  groups["data"][index]["jobs"].push(location);

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
    return Object.keys(error["errorMessages"]).reduce((errorList, key) => {
      if (
        error["errorMessages"][key].length &&
        key.search("Suggestion") === -1
      ) {
        let includeSuggestionKey =
          error["errorMessages"][key] ===
          ("pickupLocationAddress" || "deliveryAddress");

        errorList.push({
          key: key,
          errorId: error["id"],
          suggestionKey: includeSuggestionKey ? ["latitude", "longitude"] : [],
          suggestion: error["errorMessages"][key + "Suggestion"] || "",
          errorMessage: error["errorMessages"][key],
        });
      }
      return errorList;
    }, []);
  }

  /* Response empty array if there's no error from dynamodb */
  return [];
};
