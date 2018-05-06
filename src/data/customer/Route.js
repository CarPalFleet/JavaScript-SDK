/**
 * @fileoverview This file contains all Routes related functions that are triggered by a Customer
 */

import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import {
  convertObjectIntoURLString,
  apiResponseErrorHandler,
} from '../utility/Util';
import {camelToSnake} from '../utility/ChangeCase';
import toArray from 'lodash.toarray';

/**
 * Get Routes
 * @param {object} filterObject # {pickupDate (mandatory), routeStatusIds, includeOrders, limit, page}
 * pickupDate (optional)(string) = '2018-02-28'
 * routeStatusIds (optional)(int) = 1,2 (csv)
 * includeOrders (optional)(bollean) = true/false
 * limit = 20 (optional)(int)
 * page = 0 (optional)(int)
 * @param {string} token
 * @return {object} Promise resolve/reject
 * @deprecated since version 0.3.1
 */
export const getRoutesAsync = async (filterObject, token) => {
  try {
    let paramString = convertObjectIntoURLString(camelToSnake(filterObject));
    const routes = await axios({
      method: 'GET',
      url: `${endpoints.API_V3.ROUTE}${paramString.replace('&', '?')}`,
      headers: {Authorization: `Bearer ${token}`},
    });

    return camelize(routes.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Create Routes
 * @param {object} payload
 * pickupDate (mandatory) (string),
 * driverId (optional) (int),
 * routeSettings (optional) (json string),
 * routeLocations (mandatory) (array),
 * sequence (mandatory) (int),
 * groupingLocationId (mandatory) (int)
 * locationTypeId  (mandatory) (int) (2 for Delivery Location or 3 for Pickup Location)
 * routeCapacity (optional) (decimal)
 * replaceAllExisting (boolean) (optional)
 Example payload
 {
    "routes": [
    {
       "driverId": 2,
       "pickupDate": "2018-03-30",
       "routeSettings": "{}",
       "routeLocations": [
         {
           "sequence": 1,
           "groupingLocationId": 1,
           "locationTypeId": 3,
           "routeCapacity": 10.5
         }
       ]
     }
   ],
   "replaceAllExisting": true
 }
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const storeRouteAsync = async (payload, token) => {
  try {
      const routes = await axios({
      method: 'POST',
      url: endpoints.API_V3.STORE_ROUTE,
      headers: {Authorization: `Bearer ${token}`},
      data: camelToSnake(payload, 5),
    });

    return camelize(routes.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/** Remove Route
 * @param {string} routeIds # string csv
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const removeRouteAsync = async (routeIds, token) => {
  try {
    await axios({
      method: 'DELETE',
      url: `${endpoints.API_V3.ROUTE.replace('{0}', routeIds)}`,
      headers: {Authorization: `Bearer ${token}`},
    });

    return {data: true};
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/** Create Route Location
 * @param {int} routeId
 * @param {array} payload [{sequence, groupingLocationId, locationTypeId}]
 * sequence (mandatory)(int)
 * groupingLocationId (optional)(int) eg. 1
 * locationTypeId (optional)(int) 2 for Delivery Location, 3 for Pickup Location
 * Exaple payload
 [
  {
    "sequence": 1,
    "groupingLocationId": 1,
    "locationTypeId": 3
  }
 ]
 * @param {string} token
 * @return {Object} Promise resolve/reject
 //TODO: needs unit testing
 */
export const createRouteLocationAsync = async (
  routeId,
  payload = [],
  token
) => {
  try {
    const result = await axios({
      method: 'POST',
      url: `${endpoints.API_V3.ROUTE_LOCATION.replace('{0}', routeId)}`,
      headers: {Authorization: `Bearer ${token}`},
      data: toArray(camelToSnake(payload, 2)),
    });

    return camelize(result.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/** Update Route Location
 * @param {int} routeId
 * @param {array} payload
 * Example of palyload
 [
    {
        "routeLocationId": 4,
        "pickupWindowStart": "09:00",
        "pickupWindowEnd": "19:00"
    },
    {
        "routeLocationId": 8,
        "deliveryWindowStart": "09:00",
        "deliveryWindowEnd": "12:00"
    }
]
 * routeLocationId (mandatory)(int)
 * pickupWindowStart (mandatory)(string)
 * pickupWindowEnd (mandatory)(string)
 * deliveryWindowStart (mandatory)(string)
 * deliveryWindowEnd (mandatory)(string)
 * @param {string} token
 * @return {Object} Promise resolve/reject
 //TODO: needs unit testing
 */
export const updateRouteLocationAsync = async (
  routeId,
  payload = [],
  token
) => {
  try {
    const result = await axios({
      method: 'PUT',
      url: `${endpoints.API_V3.ROUTE_LOCATION.replace('{0}', routeId)}`,
      headers: {Authorization: `Bearer ${token}`},
      data: toArray(camelToSnake(payload, 2)),
    });

    return camelize(result.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/** Remove route schedule from driver
 * @param {int} routeId
 * @param {string} routeLocationIds # csv eg. 1,2,3
 * @param {string} token
 * @return {Object} Promise resolve/reject
 * If resolve, return { data: true }
 //TODO: needs unit testing
 */
export const removeRouteLocationsAsync = async (
  routeId,
  routeLocationIds,
  token
) => {
  try {
    await axios({
      method: 'DELETE',
      url: `${endpoints.API_V3.ROUTE_LOCATION.replace(
        '{0}',
        routeId
      )}?route_location_ids=${routeLocationIds}`,
      headers: {Authorization: `Bearer ${token}`},
    });

    return {data: true};
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};
