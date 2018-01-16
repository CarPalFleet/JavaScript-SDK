import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import locaitonsMockUp from './LocationMockUpData';
import { snakeCaseDecorator } from '../decorator/CoreDecorators';

export const getCustomerOrdersWithFiltersAsync = async (filterObject = {}, customerId, token, validationStatus = false)=>{
    let paramString = Object.keys(filterObject).reduce((str, key) => (str += `&${key}=${filterObject[key]}`), '');
    try{
         const response = await axios({method: 'get',
                                       url: endpoints.CUSTOMER_ORDERS.replace('{0}', customerId) + `?${paramString}`,
                                       headers: {'Authorization': token}})
         return camelize(categoriesCustomerOrders(response.data));
    }catch(e){
         return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    }
}

export const getCustomerOrderCountsAsync = async (filterObject, customerId, token)=>{
    let paramString = Object.keys(filterObject).reduce((str, key) => (str += `&${key}=${filterObject[key]}`), '');
    try{
         const response = await axios({method: 'get',
                                       url: endpoints.CUSTOMER_ORDERS.replace('{0}', customerId) + `?${paramString}`,
                                       headers: {'Authorization': token}})
         return calculateCustomerOrderCounts(response.data);
    }catch(e){
         return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    }
}

export const getOrderDetailAsync = async (customerId, orderId, token)=>{
    try{
        const response = await axios({method: 'get',
                                      url: endpoints.ORDER_DETAIL.replace('{0}', customerId).replace('{1}', orderId),
                                      headers: {'Authorization': token}})
        return camelize(response.data);
    }catch(e){
        return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    }
}

export const createNewDeliveryWindow = async ({customerId,
                                               identityId,
                                               productTypeId,
                                               transactionGroupId=null,
                                               displayName,
                                               startTime,
                                               endTime}, token) =>{
    try{
        let data = {
            identityId,
            productTypeId,
            displayName,
            startTime,
            endTime
        }

        if(productTypeId == 3){
            data.transactionGroupId = transactionGroupId;
        }
        const response = await axios({method: 'post',
                                      url: endpoints.DELIVERY_WINDOW.replace('{0}', customerId),
                                      headers: {'Authorization': token},
                                      data})
        return camelize(response.data.data);
    }catch(e){
        return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    }
}

/* Not Updated yet in README */
export const getDeliveryWindows = async (customerId, identityId, productTypeId, transactionGroupIds)=>{
    try{
        const response = await axios({
            method: 'get',
            url: `${endpoints.DELIVERY_WINDOW.replace('{0}', customerId)}?identityId=${identityId}`,
            headers: {'Authorization': token}});

        return camelize(response.data.data);
    }catch(e){
        return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    }
}

export const getBatchOrderProgressAsync = async (customerId, pickupDate, token) => {
  try {
    let response = await axios({
      method: 'GET',
      url: `${endpoints.CREAT_ORDER_UPLOAD_PROGRESS.replace('{0}', customerId)}?pickupDate=${pickupDate}`,
      header: {'Authorization': `Bearer ${token}`}
    });

    return camelize(exampleProgression());
  } catch (e) {
    handleAsyncError(e);
  }
}

export const getGroupingLocationsAsync = async (filterObject, customerId, token) => {
  try {
    let statusId = filterObject.statusId || 1;
    let filters = snakeCaseDecorator(filterObject);
    let paramString = Object.keys(filters).reduce((str, key) => (str += `&${key}=${filters[key]}`), '');
    let response = axios({
      method: 'POST',
      url: `${endpoints.GROUPING_LOCATIONS}${paramString.replace('&', '?')}`,
      header: {'Authorization': token}
    });

    let locations = camelize(response.data);
    if (filterObject.statusId === 1) {
      return groupLocationByPickUpAddress(locations);
    }

    return groupLocationByPickUpAddressWithErrors(locations, filterObject, customerId, token);
  } catch (e) {
    handleAsyncError(e);
  }
}

export const fetchBatchLocationsErrorAsync = async (pickupDate, customerId, token) => {
  try {
    let response = await axios({
      method: 'GET',
      url: `${endpoints.GROUPING_LOCATIONS_ERRORS.replace('{0}', customerId)}?pickupDate=${pickupDate}`,
      header: {'Authorization': token}
    });

    return camelize(response.data);
  } catch (e) {
    handleAsyncError(e);
  }
}

export const fetchOrderColumNames = async (pickupDate, customerId, token) => {
  try {
    let response = await axios({
      method: 'GET',
      url: `${endpoints.ORDER_COLUMNS.replace('{0}', customerId)}?pickupDate=${pickupDate}`,
      header: {'Authorization': token}
    });

    return camelize(response.data);
  } catch (e) {
    handleAsyncError(e);
  }
}

export const getUniqueGroupingLocationsAsync = async (pickupDate, customerId, token) => {
  try {
    let response = await axios({
      method: 'GET',
      url: `${endpoints.GROUPING_LOCATIONS.replace('{0}', customerId)}?pickupDate=${pickupDate}`,
      header: {'Authorization': token}
    });

    return camelize(response.data);
  } catch (e) {
    handleAsyncError(e);
  }
}

export const createGroupingLocationsAsync = async (locationObject, token) => {
  try {
    locationObject = snakeCaseDecorator(locationObject);
    let response = await axios({
      method: 'POST',
      url: endpoints.GROUPING_LOCATIONS,
      header: {'Authorization': token},
      data: locationObject
    });

    return camelize(response.data);
  } catch (e) {
    handleAsyncError(e);
  }
}

export const editGroupingLocationAsync = async (groupingLocationId, editedLocationObject, token) => {
  try {
    editedLocationObject = snakeCaseDecorator(editedLocationObject);
    let response = await axios({
      method: 'PUT',
      url: `${endpoints.GROUPING_LOCATIONS}/${groupingLocationId}`,
      header: {'Authorization': token},
      data: editedLocationObject
    });

    return camelize(response.data);
  } catch (e) {
    handleAsyncError(e);
  }
}

export const editGroupingBatchLocationsAsync = async (locations, token) => {
  try {
    locations = snakeCaseDecorator(locations);
    let response = await axios({
      method: 'PUT',
      url: endpoints.GROUPING_LOCATIONS,
      header: {'Authorization': token},
      data: locations
    });

    return camelize(response.data);
  } catch (e) {
    handleAsyncError(e);
  }
}

export const deleteGroupingLocationsAsync = async (groupingLocationId, token) => {
  try {
    let response = await axios({
      method: 'DELETE',
      url: `${endpoints.GROUPING_LOCATIONS}/${groupingLocationId}`,
      header: {'Authorization': token}
    });

    return camelize(response.data);
  } catch (e) {
    handleAsyncError(e);
  }
}

export const updateJobLiveData = (originalJobDatum, pubSubPayload, filterObject) => {
  try{
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
    const isInclude = filterObject.orderStatusIds ? filterObject.orderStatusIds.includes(pubSubPayload.orderStatusId) : true;

    if(!(isValidStatus && isSameDate && isInclude))
    {
        return originalJobDatum;
    }

    let jobStatusKeys = Object.keys(originalJobDatum['data']);
    let matchedPayload = jobStatusKeys.reduce((matchedPayload, statusId) => {
      let index = originalJobDatum['data'][statusId].findIndex((order) => {
        return pubSubPayload.orderId == order.orderId; //orderId might be string/integer;
      })
      if (index >= 0) {
        matchedPayload.statusId = statusId;
        matchedPayload.index = index;
        matchedPayload.data = originalJobDatum['data'][statusId][index];
        matchedPayload.isDataExist = originalJobDatum['data'][statusId][index];
      }
      return matchedPayload;
    }, {isDataExist: false, statusId: 0, index: -1, data: {}});

    if (matchedPayload.isDataExist) {
        // update activeStatusCounts
        originalJobDatum['activeStatusCounts'][pubSubPayload.orderStatusId] += 1;
        let currentStatusCounts = originalJobDatum['activeStatusCounts'][matchedPayload.statusId];
        originalJobDatum['activeStatusCounts'][matchedPayload.statusId] -= currentStatusCounts? 1: 0;
        delete originalJobDatum['data'][matchedPayload.statusId].splice(matchedPayload.index, 1);
    } else {
      originalJobDatum['totalStatusCounts'] += 1;
      originalJobDatum['activeStatusCounts'][pubSubPayload.orderStatusId] += 1;
    }
    //update data Object
    originalJobDatum['data'][pubSubPayload.orderStatusId].push(pubSubPayload);
    return originalJobDatum;
  }catch(e){
    return {statusCode: '500', statusText: 'Error in updating job live data'};
  }
}

function calculateCustomerOrderCounts(data) {
  let orders = categoriesCustomerOrders(data);
  let countData = {totalStatusCounts: 0, activeStatusCounts: {}};
  return Object.keys(orders.data).reduce(function(counts, value){
  	counts.activeStatusCounts[value]= orders.data[value].length;
  	counts.totalStatusCounts += orders.data[value].length;
  	return counts;
  }, countData);
}

function categoriesCustomerOrders(orders) {
  let responseData = {2: [], 5: [], 7: [], 9: []};
  return {data: orders['data'].reduce((data, value) => {
    if (data[value.order_status_id]) {
      data[value.order_status_id].push(value);
    }
    return data;
  }, responseData)}
}

function groupLocationByPickUpAddress(locations) {
  let locationsGroups = locations['data'].reduce((groupAddressObject, location, index) => {
    return groupLocations(groupAddressObject, location);
  }, {data: [0], addressIds: [0]});

  if ((typeof locationsGroups[0] === 'number')) {
    delete locationsGroups[0];
  }

  const result = {
    totalRecords: locationsGroups.totalRecords,
    data: locationsGroups.data
  }

  return result;
}

function groupLocationByPickUpAddressWithErrors(locations, filterObject, customerId, token) {
  let errorContent = fetchBatchLocationsErrorAsync(filterObject.pickupDate, customerId, token);
  let locationsGroups = locations['data'].reduce((groupAddressObject, location, index) => {
    return groupLocations(groupAddressObject, location);
  }, {data: [0], addressIds: [0]});

  if ((typeof locationsGroups[0] === 'number')) {
    delete locationsGroups[0];
  }

  const result = {
    totalRecords: locationsGroups.totalRecords,
    data: locationsGroups.data
  }

  //Update data with Errors
  result.error = errors.errorContent;
  return result;
}


function groupLocations(groups, location) {
  let groupId = location.pickupLocationAddressId;
  let index = groups['addressIds'].indexOf(groupId);
  if (index === -1) {
    index = groupId? groups['addressIds'].length : 0;
    if (index) groups['addressIds'].push(groupId);
  }

  if (!(groups['data'][index] instanceof Object)) {
    groups['data'][index] = {
      id: groupId,
      address: location.pickupLocationAddress,
      jobs: []
    }
  }
  groups['data'][index]['jobs'].push(location);

  return groups;
}

function exampleProgression() {
  // Remove progress after API finished.
  return {
    "batchStatusId": 123,
    "chunkProgression": 5,
    "totalChunkProgression": 10
  }
}

function handleAsyncError(e) {
  return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
}
