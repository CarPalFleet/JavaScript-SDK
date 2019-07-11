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
import { camelToSnake } from '../utility/ChangeCase';
import toArray from 'lodash.toarray';

/**
 * Get Routes
 * @param {object} filterObject # {pickupDate (mandatory), routeStatusIds, includeJobs, limit, page}
 * pickupDate (optional)(string) = "2018-02-28"
 * routeStatusIds (optional)(int) = 1,2 (csv)
 * includeJobs (optional)(bollean) = true/false
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
      headers: { Authorization: `Bearer ${token}` },
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
 * orderId (mandatory) (int)
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
           "orderId": 1,
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
      headers: { Authorization: `Bearer ${token}` },
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
      url: `${endpoints.API_V3.ROUTE.replace('{0}', `?route_ids=${routeIds}`)}`,
      headers: { Authorization: `Bearer ${token}` },
    });

    return { data: true };
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
      headers: { Authorization: `Bearer ${token}` },
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
      headers: { Authorization: `Bearer ${token}` },
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
      headers: { Authorization: `Bearer ${token}` },
    });

    return { data: true };
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Update requested data
 * Example :
    {
      "pickup_time_window": "14:40-16:00",
      "delivery_time_window": "18:00-20:00",
      "delivery_address": "184 Jalan Toa Payoh, Singapore",
      "pickup_location_address": "184 Jalan Toa Payoh, Singapore",
      "pickup_coordinates": "1.3139961,103.7041625",
      "pickup_contact_name": "Joe Doe",
      "pickup_contact_company_name": "CarPal SG",
      "pickup_contact_email": "jdoe@carpal.me",
      "pickup_contact_phone": "+65999999",
      "delivery_contact_name": "Luke Walker",
      "delivery_contact_company_name": "LW Pte Ltd",
      "delivery_contact_email": "luke@walker.com",
      "delivery_contact_phone": "+65213123",
      "delivery_coordinates": "1.3139961,103.7041625",
      "delivery_notes": "Leave package at the door",
      "item_quantity": 2,
      "weight_per_item": 2,
      "item_description": "Cakes and stuff",
      "capacity": 1,
      "customer_order_number": "X-1234-9876",
      "cash_on_delivery_amount": "100.50"
    }
 * @param {array} requestData
 * @param {int} routeId
 * @param {int} routeLocationId
 * @param {int} orderId
 * @param {string} token
 * @return {Object} Promise resolve/reject
 * If resolve, return { data: true }
 */
export const updateRoutedOrder = async (
  requestData,
  routeId,
  routeLocationId,
  orderId,
  token
) => {
  try {
    const url = `${endpoints.API_V3.ROUTE_LOCATION.replace(
      '{0}',
      routeId
    )}/${routeLocationId}/order/${orderId}`;

    const routes = await axios({
      method: 'PUT',
      url,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        order_data: camelToSnake(requestData),
      },
    });

    return camelize(routes.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Recalculate Order
 * @param {int} routeId
 * @param {string} token
 * @return {object} return recalculated route
 */
export const recalculateRouteOrder = async (routeId, token) => {
  try {
    const routes = await axios({
      method: 'POST',
      url: `${endpoints.API_V3.ROUTE.replace('{0}', routeId)}/recalculate`,
      headers: { Authorization: `Bearer ${token}` },
    });

    return camelize(routes.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Recalculate Order
 * @param {int} routeId
 * @param {string} token
 * @return {object} return updated route
 */
export const getRouteAsync = async (routeId, token) => {
  try {
    const routes = await axios({
      method: 'GET',
      url: `${endpoints.API_V3.ROUTE.replace('{0}', routeId)}`,
      headers: { Authorization: `Bearer ${token}` },
    });

    return camelize(routes.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Ger Route Location Order
 * @param {int} routeId
 * @param {int} routeLocationId
 * @param {string} token
 * @return {Object} Promise resolve/reject
 */
export const getRouteLocationOrder = async (
  routeId,
  routeLocationId,
  token
) => {
  try {
    const result = await axios({
      method: 'GET',
      url: `${endpoints.API_V3.ROUTE_LOCATION.replace(
        '{0}',
        routeId
      )}/${routeLocationId}`,
      headers: { Authorization: `Bearer ${token}` },
    });

    return camelize(result.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};
