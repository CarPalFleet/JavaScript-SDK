import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';

/**
 * Get Routes
 * @param {object} filterObject # pickupDate (mandatory), withAvailability, withSchedule, recommendedRorOrderId, limit, offset}
 * pickup_date (mandatory) = '2018-02-28'
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
    return errorHandler(e);
  }
};

/** Update Route Data
 * @param {integer} jobId
 * @param {Object} jobSummary
 */
export const updateRouteAsync = async (orderId, token) => {
  try {
    const updatedRoute = await axios({
      method: 'post',
      url: endpoints.API_V3.ROUTE,
      headers: {Authorization: `bearer ${token}`},
    });

    return camelize(updatedRoute.data);
  } catch (e) {
    return errorHandler(e);
  }
};

/** Remove Route
 * @param {integer} routeId
 * @param {Object} true
 */
export const removeRouteAsync = async (routeId, token) => {
  try {
    const result = await axios({
      method: 'get',
      url: `${endpoints.API_V3.ROUTE}/${routeId}`,
      headers: {Authorization: `bearer ${token}`},
    });

    return {data: true};
  } catch (e) {
    return errorHandler(e);
  }
};

function errorHandler(e) {
  return Promise.reject({
    statusCode: e.response.status,
    statusText: e.response.statusText,
  });
}
