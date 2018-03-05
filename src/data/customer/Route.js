import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';

/** Get Routes
 * @param {integer} jobId
 * @param {Object} jobDetail
 */
export const getRouteAsync = async (orderId, token) => {
  try {
    const routes = await axios({
      method: 'get',
      url: endpoints.ROUTE,
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
      url: endpoints.ROUTE,
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
      url: `${endpoints.ROUTE}/${routeId}`,
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
