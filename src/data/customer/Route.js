import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import {apiResponseErrorHandler} from '../../utility/Util';

/**
 * Get Routes
 * @param {object} filterObject # pickupDate (mandatory), withAvailability, withSchedule, recommendedRorOrderId, limit, offset}
 * pickupDate (mandatory) = '2018-02-28'
 * withAvailability (optional) = 1 OR 0 (1 means return all drivers with availabiliy, 0 means unavailable drivers; optional)
 * withSchedule (optional) = 1 OR 0 (1 means return all drivers with schedule, 0 means drivers without schedule; optional)
 * recommendedRorOrderId (optional) = 123 (orderId)
 * limit = 20 (optional)
 * offset = 0 (optional)
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const getRouteAsync = async (filterObject, token) => {
  try {
    let paramString = convertObjectIntoURLString(
      snakeCaseDecorator(filterObject)
    );
    const routes = await axios({
      method: 'get',
      url: `${endpoints.API_V3.ROUTE}${paramString.replace('&', '?')}`,
      headers: {Authorization: `bearer ${token}`},
    });

    return camelize(routes.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/** Remove Route
 * @param {int} routeId
 * @param {Object} true
 */
export const removeRouteAsync = async (routeId, token) => {
  try {
    const result = await axios({
      method: 'delete',
      url: `${endpoints.API_V3.ROUTE}/${routeId}`,
      headers: {Authorization: `bearer ${token}`},
    });

    return {data: true};
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/** Create Route Location
 * @param {int} payload #{driverId, pickupDate, routeLocations = []}
 * routeLocations = []
 * example of routeLocations
 [
    {
      "sequence": 1,
      "groupingLocationId": 1,
      "locationTypeId": 3
    }
 ]
 * @param {object} Promise resolve/reject
 */
export const createRouteLocationAsync = async ({}, token) => {
  try {
    let payload = {
      driverId,
      pickupDate,
      routeLocations,
    };

    const updatedRoute = await axios({
      method: 'post',
      url: endpoints.API_V3.ROUTE,
      headers: {Authorization: `bearer ${token}`},
      data: payload,
    });

    return camelize(updatedRoute.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/** Update Route Location
 * @param {int} payload #{driverId, pickupDate, routeLocations = []}
 * routeLocations = []
 * example of routeLocations
 [
    {
      "sequence": 1,
      "groupingLocation_id": 1,
      "locationTypeId": 3,
      "routeCapacity": 10.5
    }
 ]
 * @param {object} Promise resolve/reject
 */
export const updateRouteLocationAsync = async (
  {driverId, pickupDate, routeLocations = []},
  token
) => {
  try {
    let payload = {
      driverId,
      pickupDate,
      routeLocations,
    };

    const updatedRoute = await axios({
      method: 'post',
      url: endpoints.API_V3.ROUTE,
      headers: {Authorization: `bearer ${token}`},
      data: payload,
    });

    return camelize(updatedRoute.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/** Remove Route Location
 * @param {int} routeId
 * @param {Object} true
 */
export const removeRouteLocationAsync = async (routeLocationId, token) => {
  try {
    const result = await axios({
      method: 'delete',
      url: `${endpoints.API_V3.ROUTE}/${routeLocationId}`,
      headers: {Authorization: `bearer ${token}`},
    });

    return {data: true};
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

function apiResponseErrorHandler(e) {
  return Promise.reject({
    statusCode: e.response.status,
    statusText: e.response.statusText,
  });
}
