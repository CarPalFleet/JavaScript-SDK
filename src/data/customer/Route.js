import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import {apiResponseErrorHandler} from '../utility/Util';

/**
 * Get Routes
 * @param {object} filterObject # pickupDate (mandatory), withAvailability, withSchedule, recommendedRorOrderId, limit, offset}
 * pickupDate (mandatory)(string) = '2018-02-28'
 * withAvailability (optional)(int) = 1 OR 0 (1 means return all drivers with availabiliy, 0 means unavailable drivers; optional)
 * withSchedule (optional)(int) = 1 OR 0 (1 means return all drivers with schedule, 0 means drivers without schedule; optional)
 * recommendedRorOrderId (optional)(int) = 123 (orderId)
 * limit = 20 (optional)(int)
 * offset = 0 (optional)(int)
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
 * @param {int} routeId
 * @param {array} payload [{sequence, groupingLocationId, locationTypeId}]
 * sequence (mandatory)(int)
 * groupingLocationId (optional)(int) eg. 1
 * locationTypeId (optional)(int) 2 for Delivery Location, 3 for Pickup Location
 * @param {Object} Promise resolve/reject
 */
export const createRouteLocationAsync = async (
  routeId,
  payload = [],
  token
) => {
  try {
    const result = await axios({
      method: 'put',
      url: endpoints.API_V3.ROUTE_LOCATION,
      headers: {Authorization: `bearer ${token}`},
      data: payload,
    });

    return camelize(result.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/** Update Route Location
 * @param {int} routeId
 * @param {object} payload {routeLocationId, sequence, locationTypeId, pickupWindowStart, pickupWindowEnd}
 * routeLocationId (mandatory)(int)
 * sequence (optional)(int) eg. 1
 * locationTypeId (optional)(int) 2 for Delivery Location, 3 for Pickup Location
 * pickupWindowStart (optional)(string)
 * pickupWindowEnd (optional)(string)
 * @param {Object} Promise resolve/reject
 */
export const updateRouteLocationAsync = async (
  routeId,
  payload = {},
  token
) => {
  try {
    const result = await axios({
      method: 'post',
      url: `${endpoints.API_V3.ROUTE_LOCATION.replace('{0}', routeId)}`,
      headers: {Authorization: `bearer ${token}`},
      data: payload,
    });

    return camelize(result.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/** Remove route schedule from driver
 * @param {int} routeId
 * @param {int} routeLocationIds # csv eg. 1,2,3
 * @param {string} token
 * @param {Object} Promise resolve/reject
 * If resolve, return { data: true }
 */
export const removeRouteLocationsAsync = async (
  routeId,
  routeLocationIds,
  token
) => {
  try {
    const result = await axios({
      method: 'delete',
      url: `${endpoints.API_V3.ROUTE_LOCATION.replace(
        '{0}',
        routeLocationId
      )}?route_location_ids=${routeLocationIds}`,
      headers: {Authorization: `bearer ${token}`},
    });

    return {data: true};
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};
