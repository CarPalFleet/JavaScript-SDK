/**
 * @fileoverview This file contains all Order related functions that are triggered by a Customer
 */

import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import FormData from 'form-data';
import { camelToSnake } from '../utility/ChangeCase';
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

/**
 * Get template for order upload
 * @param {string} pickupDate (optional)(string) = "2018-02-28"
 * @param {string} token
 * @return {object} file data
 */
export const getOrderUploadTemplateAsync = async (pickupDate, token) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${endpoints.API_V3.GROUPING_BATCH_TEMPLATE}?date=${pickupDate}`,
      responseType: 'blob',
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Retrieve Remaining Orders Count
 * @param {object} filterObject # {pickupDate, withJob}
 * pickupDate (mandatory)(string) = "2018-02-28"
 * withJob(optional)(int)
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const getRemainingOrdersCountAsync = async (filterObject, token) => {
  let paramString = convertObjectIntoURLString(camelToSnake(filterObject));
  try {
    const response = await axios({
      method: 'GET',
      url: `${endpoints.API_V3.ORDER_COUNT}${paramString.replace('&', '?')}`,
      headers: { Authorization: `Bearer ${token}` },
    });

    return camelize(response.data);
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

/**
 * Check the progress of order file uploading process
 * @param {int} customerId
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const getUploadedOrderProgressionAsync = async (customerId, token) => {
  try {
    let response = await axios({
      method: 'GET',
      url: `${endpoints.API_V3.GROUPING_BATCH_PROGRESSION}`,
      headers: { Authorization: `Bearer ${token}` },
    });

    let result = camelize(response.data);

    let updatedProgressData = {
      chunkProgression: 0,
      totalChunkProgression: 0,
      failedLocationCount: 0,
      groupingLocationIdsSuccess: [],
    };

    if (response.status !== 204) {
      updatedProgressData = {
        chunkProgression: result.data.chunkProgressionCount,
        totalChunkProgression: result.data.totalLocationCount,
        failedLocationCount: result.data.failedLocationCount,
        groupingLocationIdsSuccess: [],
      };
    }

    return { data: updatedProgressData };
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Retrieve single order
 * @param {object} orderId
 * @param {string} token
 * @return {object} Promise resolve/reject
 //TODO: needs more extensive unit testing
 */
export const getOrderAsync = async (orderId, token) => {
  try {
    let response = await axios({
      method: 'GET',
      url: `${endpoints.API_V3.ORDER}/${orderId}`,
      headers: { Authorization: `Bearer ${token}` },
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
    let orders = await getOrdersAsync(filterObject, token);
    let errorContents;

    /* Check statusId whethere 4 or not
     * If statusId is 4, need to combine the response with error contents
     */
    if (statusId === 4) {
      errorContents = await getErrorOrderContentsAsync(filterObject, token);
    }

    return groupOrders(orders, errorContents ? errorContents : null);
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
  oldValues[data.oldIndex]['jobs'] = oldValues[data.oldIndex]['jobs'].concat(
    newValues[data.newIndex]['jobs']
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
    accumulator.push({ oldIndex: i, newIndex: index });
  }
  return accumulator;
};

/**
 * Get Remaining Orders
 * @param {object} filterObject # {statusIds, pickupDate (mandatory), withJob, withDriver, withRoute, sort, limit, offset}
 * statusIds = 1/2/3/4. 1 for "pending", 2 for "validated", 3 for "grouped", 4 for "failed"
 * pickupDate (mandatory) = "2018-02-28"
 * withJob (optional) = 1 OR 0
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
    return groupOrders(locations);
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
      statusIds = 2; // Success Orders
      withRoute = 0; // Orders without routes
      withJob = 1; // Order should have included jobId
      include = "pickup_group,delivery_address"
      limit = 20
      offset = 0
    */

    const url = filterObject.keyword
      ? endpoints.API_V3.ORDER_SEARCH
      : endpoints.API_V3.ORDER;

    if (filterObject.keyword) {
      filterObject.validationStatusId = filterObject.statusIds;
    }

    let filters = camelToSnake(filterObject);
    let paramString = convertObjectIntoURLString(filters);
    let response = await axios({
      method: 'GET',
      url: `${url}${paramString.replace('&', '?')}`,
      headers: { Authorization: `Bearer ${token}` },
    });

    return camelize(response.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Get upload order"s error contents from Dynamodb
 * @param {object} filterObject # {pickupDateStart (mandatory), pickupDateEnd (mandatory)}
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const getErrorOrderContentsAsync = async (
  { pickupDateStart, pickupDateEnd },
  token
) => {
  try {
    let response = await axios({
      method: 'GET',
      url: `${endpoints.API_V3.ORDER_ERRORS}/?pickup_date_start=${pickupDateStart}&pickup_date_end=${pickupDateEnd}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    return camelize(response.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Get pickup group
 * @param {object} filterObject # {pickupDate (mandatory), withJob}
 * pickupDate (optional)(string) = "2018-02-28"
 * withJob (optional)(int) = 0
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const getUniquePickupAddressesAsync = async (filterObject, token) => {
  try {
    let filters = camelToSnake(filterObject);
    let paramString = convertObjectIntoURLString(filters);
    let response = await axios({
      method: 'GET',
      url: `${endpoints.API_V3.PICKUP_GROUP}${paramString.replace('&', '?')}`,
      headers: { Authorization: `Bearer ${token}` },
    });

    let result = response.data ? camelize(response.data.data) : [];
    let pickupAddressList = result.map((locationObject) => {
      return {
        pickupGroupId: locationObject.id,
        pickupLocationAddress: locationObject.address.address,
      };
    });

    return { data: pickupAddressList };
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Create single order
 * @param {object} orderObject
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
export const createOrderAsync = async (orderObject, token) => {
  try {
    orderObject = camelToSnake(orderObject);
    let response = await axios({
      method: 'POST',
      url: endpoints.API_V3.ORDER,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        order_data: orderObject,
      },
    });

    return camelize(response.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Edit single order
 * @param {int} orderId
 * @param {object} orderObject
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
export const editOrderAsync = async (orderId, orderObject, token) => {
  try {
    let updatedLocationDataObject = {
      order_data: camelToSnake(orderObject),
    };

    let response = await axios({
      method: 'PUT',
      url: `${endpoints.API_V3.ORDER}/${orderId}`,
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

/**
 * Edit multiple orders
 * @param {array} orderDataList
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
 * @param {object} filterObject {pickupDateStart, pickupDateEnd}
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const editOrdersAsync = async (
  orderDataList = [],
  filterObject,
  token
) => {
  try {
    let updatedOrderDataList = orderDataList.map((data) => {
      let tmpObject = {
        order_id: data.orderId,
        order_data: camelToSnake(data.orderData),
      };
      return tmpObject;
    });

    let url = `${endpoints.API_V3.ORDER}`;
    if (filterObject) {
      const {
        pickupDateStart,
        pickupDateEnd,
        validationStatusId,
      } = filterObject;
      url += `?pickup_date_start=${pickupDateStart}&pickup_date_end=${pickupDateEnd}&validation_status_id=${validationStatusId}`;
    }

    let response = await axios({
      method: 'PUT',
      url,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: updatedOrderDataList,
    });

    return camelize(response.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Delete single order
 * @param {array} orderId
 * @param {string} token
 * @return {object} Promise resolve/reject
 * return {data: true} if deleting is success
 */
export const deleteOrderAsync = async (orderId, token) => {
  try {
    await axios({
      method: 'DELETE',
      url: `${endpoints.API_V3.ORDER}/${orderId}`,
      headers: { Authorization: `Bearer ${token}` },
    });

    return { data: true };
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Delete Multiple Orders
 * @param {array} orderIds
 * @param {string} token
 * @return {object} Promise resolve/reject
 * return {data: true} if deleting is success
 */
export const deleteOrdersAsync = async (orderIds = [], token) => {
  try {
    let paramString = orderIds.join();
    await axios({
      method: 'DELETE',
      url: `${endpoints.API_V3.ORDER}?order_ids=${paramString}`,
      headers: { Authorization: `Bearer ${token}` },
    });

    return { data: true };
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Group Orders with error contents
 * @param {object} orders
 * @param {object} errorContents
 * @return {object} { data: [0], groupId: [2]}
 */
export const groupOrders = (orders, errorContents = null) => {
  let orderGroups = orders['data'].reduce(
    (groupAddressObject, order, index) => {
      return orderByPickUpAddress(groupAddressObject, order, errorContents);
    },
    { data: [0], groupIds: [0] }
  );

  if (typeof orderGroups['data'][0] === 'number') {
    orderGroups['data'].splice(0, 1);
  }

  const result = {
    totalLocationCount: orders['meta'].totalLocationCount, // total_location_count
    successLocationCount: orders['meta'].validatedLocationCount, // validated_location_count
    failedLocationCount: orders['meta'].failedLocationCount, // failed_location_count
    totalValidatedOrdersCount: orders['meta'].validatedOrdersWithoutRoutesCount, // total of routes with status created
    data: orderGroups.data,
  };

  return result;
};

/**
 * Group Order by Pickup Address
 * @param {object} groups
 * @param {object} order
 * @param {object} errorContents The errorContent number.
 * @return {object} groupped addresses
 */
function orderByPickUpAddress(groups, order, errorContents) {
  // ErrorContents
  let groupId = order.pickupGroupId;
  let index = groups['groupIds'].indexOf(groupId);
  if (index === -1) {
    index = groupId ? groups['groupIds'].length : 0;
    if (index) groups['groupIds'].push(groupId);
  }

  if (!(groups['data'][index] instanceof Object)) {
    groups['data'][index] = {
      id: groupId,
      address: order.pickupLocationAddress,
      jobs: [],
    };
  }

  // driver will be empty array if there's no driver info
  // Add avatarUrl as a empty string, this field will be included in response.
  isEmpty(order.driver)
    ? (order.driver = {})
    : (order.driver['avatarUrl'] = '');

  if (errorContents) {
    order.error = mergeLocationDataWithErrors(errorContents, order);
  }

  order.latitude = order.latitude || '';
  order.longitude = order.longitude || '';
  groups['data'][index]['jobs'].push(order);

  return groups;
}

/**
 * Merge Location data with Errors
 * @param {object} errorContents # Error object
 * @param {object} order # location object
 * @return {array} errorList
 * if there's no error for this location, it will response empty array.
 */
export const mergeLocationDataWithErrors = (errorContents, order) => {
  const error = errorContents.data.find(
    (errorContent) => errorContent.orderId === order.id
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

/**
 * Update requested data
 * Example :
 {
    "type_id": 1,
    "order_ids": [
      1
    ]
 }
 * @param {object} requestData
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const updateOrderDispatchTo3PL = async (requestData, token) => {
  try {
    const response = await axios({
      method: 'POST',
      url: endpoints.API_V3.DISPATCH_3PL,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: requestData,
    });
    return camelize(response.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * @param {object} requestData
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const broadcastToFreelancers = async (requestData, token) => {
  try {
    const result = await axios({
      method: 'POST',
      url: `${endpoints.API_V3.BROADCAST_TO_FREELANCERS}`,
      headers: { Authorization: `Bearer ${token}` },
      data: requestData,
    });
    return camelize(result.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};
