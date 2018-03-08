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
    // REVIEW undefined functions convertObjectIntoURLString and snakeCaseDecorator
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
    // REVIEW result is not used
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


/** Update driver time slot
 * @param {int} scheduleId
 * @param {object} payload {driver_id, transactionGroupId, startTime, endTime, startDate}
 * scheduleId (optional)(int)
 * transactionGroupId (optional)(int)
 * startTime (optional)(date_format:H:i)
 * endTime (optional)(date_format:H:i)
 * startDate (optional)(date_format:Y-m-d)
 * @param {Object} Promise resolve/reject
 * If resolve, return value: boolean(To indicate update successful or failed)
 * remarks: the API endpoint will return one of the following status:
 * 400: Validation Error
 * 400: Driver Schedule with same values exists
 * 200: Success
 */

export const updateDriverScheduleAsync = async (
  payload = {},
  token
) => {
  try {
    const result = await axios({
      method: 'put',
      url: `${endpoints.API_V3.DIRVER_SCHEDULE.replace('{0}', scheduleId)}`,
      headers: {Authorization: `Bearer ${token}`},
      data: payload,
    });
    return camelize(result.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/** deleteDriverScheduleAsync
 * @param {int} scheduleId
 * @param {Object} Promise resolve/reject
 * return value: boolean(To indicate delete successful or failed)
 * remarks: the API endpoint will return one of the following status:
 * 404: Driver Schedule does not exists
 * 204: Success with no content
 */

export const deleteDriverScheduleAsync = async (
  scheduleId,
  token
) => {
  try {
    const result = await axios({
      method: 'delete',
      url: `${endpoints.API_V3.DIRVER_SCHEDULE.replace('{0}', scheduleId)}`,
      headers: {Authorization: `Bearer ${token}`},
    });
    return {data: true};
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/** Add new driver time slot
 * @param {object} payload {driverId, transactionGroupId, startTime, endTime, startDate}
 * driverId (mandatory)(int)
 * transactionGroupId (mandatory)(int)
 * startTime (mandatory)(date_format:H:i)
 * endTime (mandatory)(date_format:H:i)
 * startDate (mandatory)(date_format:Y-m-d)
 * @param {Object} Promise resolve/reject
 * If resolve, return value: boolean(To indicate update successful or failed)
 * remarks: the API endpoint will return one of the following status:
 * 400: Validation Error
 * 400: Driver Schedule with same values exists
 * 200: Success
 */

export const createDriverScheduleAsync = async (
  payload = {},
  token
) => {
  try {
    const result = await axios({
      method: 'post',
      url: `${endpoints.API_V3.DIRVER_SCHEDULE.replace('{0}', '')}`,
      headers: {Authorization: `Bearer ${token}`},
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
    // REVIEW result is not used
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
