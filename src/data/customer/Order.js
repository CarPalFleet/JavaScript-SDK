import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import { snakeCaseDecorator } from '../decorator/CoreDecorators';
import MOCKDATA from './MockUpData';
import _ from 'lodash';

export const getCustomerOrdersWithFiltersAsync = async (filterObject = {}, customerId, token, validationStatus = false)=>{
    let paramString = Object.keys(filterObject).reduce((str, key) => (str += `&${key}=${filterObject[key]}`), '');
    try {
         const response = await axios({method: 'get',
                                       url: endpoints.CUSTOMER_ORDERS.replace('{0}', customerId) + `?${paramString}`,
                                       headers: {'Authorization': token}})
         return camelize(categoriesCustomerOrders(response.data));
    } catch (e) {
      return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    }
}

export const getCustomerOrderCountsAsync = async (filterObject, customerId, token)=>{
    let paramString = Object.keys(filterObject).reduce((str, key) => (str += `&${key}=${filterObject[key]}`), '');
    try {
         const response = await axios({method: 'get',
                                       url: endpoints.CUSTOMER_ORDERS.replace('{0}', customerId) + `?${paramString}`,
                                       headers: {'Authorization': token}})
         return calculateCustomerOrderCounts(response.data);
    } catch (e) {
      return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    }
}

export const getOrderDetailAsync = async (customerId, orderId, token)=>{
    try {
        const response = await axios({method: 'get',
                                      url: endpoints.ORDER_DETAIL.replace('{0}', customerId).replace('{1}', orderId),
                                      headers: {'Authorization': token}})
        return camelize(response.data);
    } catch (e) {
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
    try {
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
    } catch (e) {
      return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    }
}

/* Not Updated yet in README */
export const getDeliveryWindows = async (customerId, identityId, productTypeId, transactionGroupIds)=>{
    try {
        const response = await axios({
            method: 'get',
            url: `${endpoints.DELIVERY_WINDOW.replace('{0}', customerId)}?identityId=${identityId}`,
            headers: {'Authorization': token}});

        return camelize(response.data.data);
    } catch (e) {
      return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    }
}

export const getBatchOrderProgressAsync = async (customerId, token) => {
  try {
    let response = await axios({
      method: 'GET',
      url: `${endpoints.API_V3.GROUPING_BATCH_PROGRESSION}`,
      headers: {'Authorization': `Bearer ${token}`}
    });

    let result = camelize(response.data);

    let updatedProgressData = {
      chunkProgression: result.data.chunkProgressionCount,
      totalChunkProgression: result.data.totalLocationCount,
      failedLocationCount: result.data.failedLocationCount,
      groupingLocationIdsSuccess: []
    }

    return { data: updatedProgressData };
  } catch (e) {
    return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
  }
}

export const getGroupingLocationAsync = async (groupingLocationId, token) => {
  try {
    let response = await axios({
      method: 'GET',
      url: `${endpoints.API_V3.GROUPING_LOCATIONS}/${groupingLocationId}`,
      headers: {'Authorization': `Bearer ${token}`},
    });

    return camelize(response.data);
  } catch (e) {
    return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
  }
}

export const getGroupingLocationsAsync = async (filterObject, customerId, token) => {
  try {
    // StatusIds has 4 types. 1 for 'pending', 2 for 'validated', 3 for 'grouped', 4 for 'failed'
    let statusId = filterObject.statusIds || 2;
    let locations = await fetchAllGroupingLocationsAsync(filterObject, customerId, token);
    let errorContents;
    if (statusId === 4) {
      errorContents = await fetchBatchLocationsErrorAsync(filterObject.pickupDate, customerId, token);
    }

    return groupLocations(locations, errorContents? errorContents: null);
  } catch (e) {
    return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
  }
}

export const fetchAllGroupingLocationsAsync = async (filterObject, customerId, token) => {
  try {
    let filters = snakeCaseDecorator(filterObject);
    let paramString = Object.keys(filters).reduce((str, key) => (str += `&${key}=${filters[key]}`), '');
    let response = await axios({
      method: 'GET',
      url: `${endpoints.API_V3.GROUPING_LOCATIONS}${paramString.replace('&', '?')}`,
      headers: {'Authorization': `Bearer ${token}`},
    });

    return camelize(response.data);
  } catch (e) {
    return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
  }
}

export const fetchBatchLocationsErrorAsync = async (pickupDate, customerId, token) => {
  try {
    let response = await axios({
      method: 'GET',
      url: `${endpoints.GROUPING_LOCATIONS_ERRORS.replace('{0}', customerId)}?pickupDate=${pickupDate}`,
      headers: {'Authorization': token},
    });

    return camelize(response.data);
  } catch (e) {
    return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
  }
}

export const getUniquePickupAddressesAsync = async (filterObject, token) => {
  try {
    let filters = snakeCaseDecorator(filterObject);
    let paramString = Object.keys(filters).reduce((str, key) => (str += `&${key}=${filters[key]}`), '');
    let response = await axios({
      method: 'GET',
      url: `${endpoints.API_V3.PICKUP_GROUP}${paramString.replace('&', '?')}`,
      headers: {'Authorization': `Bearer ${token}`},
    });

    let result = response.data? camelize(response.data.data): [];
    let pickupAddressList = result.map((locationObject) => {
      return {
        pickupGroupId: locationObject.id,
        pickupLocationAddress: locationObject.address.address
      }
    });

    return { data: pickupAddressList }
  } catch (e) {
    return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
  }
}

export const createGroupingLocationAsync = async (locationObject, token) => {
  try {
    locationObject = snakeCaseDecorator(locationObject);
    let response = await axios({
      method: 'POST',
      url: endpoints.API_V3.GROUPING_LOCATIONS,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: {
        location_data: JSON.stringify(snakeCaseDecorator(locationObject))
      }
    });

    return camelize(response.data);
  } catch (e) {
    return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
  }
}

export const editGroupingLocationAsync = async (groupingLocationId, locationObject, token) => {
  try {
    let updatedLocationDataObject = {
      location_data: JSON.stringify(snakeCaseDecorator(locationObject))
    }

    let response = await axios({
      method: 'PUT',
      url: `${endpoints.API_V3.GROUPING_LOCATIONS}/${groupingLocationId}`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: updatedLocationDataObject
    });

    return camelize(response.data);
  } catch (e) {
    return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
  }
}

export const editGroupingBatchLocationsAsync = async (locationDataList = [], token) => {
  try {
    let updatedLocationDataList = locationDataList.map((data) => {
      let tmpObject = {
        grouping_location_id: data.groupingLocationId,
        location_data: JSON.stringify(snakeCaseDecorator(data.locationData))
      }
      return tmpObject;
    })

    let response = await axios({
      method: 'PUT',
      url: endpoints.API_V3.GROUPING_LOCATIONS,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: updatedLocationDataList
    });

    return camelize(response.data);
  } catch (e) {
    return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
  }
}

export const deleteGroupingLocationAsync = async (groupingLocationId, token) => {
  try {
    let response = await axios({
      method: 'DELETE',
      url: `${endpoints.API_V3.GROUPING_LOCATIONS}/${groupingLocationId}`,
      headers: {'Authorization': `Bearer ${token}`},
    });

    return { data: true};
  } catch (e) {
    return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
  }
}

export const deleteGroupingLocationsAsync = async (groupingLocationIds = [], token) => {
  try {
    let paramString = groupingLocationIds.join();
    let response = await axios({
      method: 'DELETE',
      url: `${endpoints.API_V3.GROUPING_LOCATIONS}?grouping_location_ids=${paramString}`,
      headers: {'Authorization': `Bearer ${token}`},
    });

    return { data: true};
  } catch (e) {
    let errorObject;
    if (e.response.data instanceof Object) {
      errorObject = {statusCode: e.response.data.error.http_code, statusText: e.response.data.error.message}
    } else {
      errorObject = {statusCode: e.response.status, statusText: e.response.statusText}
    }

    return Promise.reject(errorObject);
  }
}

export const cancelBatchFileProcessAsync = async (groupingBatchId, token) => {
  try {
    let response = await axios({
      method: 'DELETE',
      url: `${endpoints.API_V3.GROUPING_LOCATIONS}/${batchId}`,
      headers: {'Authorization': `Bearer ${token}`},
    });

    return camelize(response.data);
  } catch (e) {
    return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
  }
}

export const updateJobLiveData = (originalJobDatum, pubSubPayload, filterObject) => {
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
  } catch (e) {
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

export const groupLocations = (locations, errorContents = null) => {
  let locationsGroups = locations['data'].reduce((groupAddressObject, location, index) => {
    return groupLocationByPickUpAddress(groupAddressObject, location, errorContents);
  }, {data: [0], groupIds: [0]});

  if ((typeof locationsGroups['data'][0] === 'number')) {
    locationsGroups['data'].splice(0, 1);
  }

  const result = {
    totalLocationCount: locations['meta'].totalLocationCount, //total_location_count
    successLocationCount: locations['meta'].validatedLocationCount, //validated_location_count
    failedLocationCount: locations['meta'].failedLocationCount, //failed_location_count
    data: locationsGroups.data
  }

  return result;
}

function groupLocationByPickUpAddress(groups, location, errorContents) { //errorContents
  let groupId = location.pickupGroupId;
  let index = groups['groupIds'].indexOf(groupId);
  if (index === -1) {
    index = groupId? groups['groupIds'].length : 0;
    if (index) groups['groupIds'].push(groupId);
  }

  if (!(groups['data'][index] instanceof Object)) {
    groups['data'][index] = {
      id: groupId,
      address: location.pickupLocationAddress,
      jobs: []
    }
  }

  // driver will be empty array if there's no driver info
  // Add avatarUrl as a empty string, this field will be included in response.
  _.isEmpty(location.driver)? location.driver = {} : location.driver['avatarUrl'] = '';

  if (errorContents) {
    location.error = mergeLocationDataWithErrors(errorContents, location);
  }

  location.latitude = location.latitude || '';
  location.longitude = location.longitude || '';
  groups['data'][index]['jobs'].push(location);

  return groups;
}

export const mergeLocationDataWithErrors = (errorContents, location) => {
  let error = errorContents.data.find((errorContent) => (errorContent.groupingLocationId === location.id));
  if (error) {
    return Object.keys(error['errorMessages']).reduce((errorList, key) => {
      if (error['errorMessages'][key].length) {
        let includeSuggestionKey = (error['errorMessages'][key] === ('pickupLocationAddress' || 'deliveryAddress'));
        errorList.push({
          key: key,
          suggestionKey: includeSuggestionKey? ['latitude', 'longitude']: [],
          suggestion: error['errorMessages'][key + 'Suggestion'] || '',
          errorMessage: error['errorMessages'][key]
        });
      }
      return errorList;
    }, []);
  }
}

function handleAsyncError(e) {
  let rejectObj = {};
  if (e.response) {
    rejectObj = {statusCode: e.response.status, statusText: e.response.statusText};
  } else {
    /* Catch error of e.response
    That will be undefined when status code is 403 Forbidden */
    rejectObj = {statusCode: 403, statusText: 'Forbidden'}
  }
  return Promise.reject(rejectObj);
}
