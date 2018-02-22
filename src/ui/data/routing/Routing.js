import axios from 'axios';
import endpoints from '../data/Endpoint';
import camelize from 'camelize';
import { fetchAllGroupingLocationsAsync } from '../../data/customer/Order.js';

export const getOptimizedRoutesAsync = async (filters, token) => {
  try{
    const [driverSchedules, driverList] = await Promise.all([getDriverSchedules.bind(null, filters), getDriverList.bind(null, filters)]);

    const result = await combineDriverWithSchedules(driverSchedules.data, driverList.data);
    return result;
  }catch(e){
    return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
  }
}

export const getDriverSchedules = async () => {
  try {
    const response = await axios({
      method: 'post',
      url: endpoints.DRIVER_SCHEDULES.replace('{0}', customerId),
      headers: {`Authorization: Bearer ${token}`
    });

    return camelize(response.data);
  } catch (e) {
    return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
  }
}

export const getDriverList = async () => {
  try {
    const response = await axios({
      method: 'post',
      url: endpoints.DRIVER_LIST.replace('{0}', customerId),
      headers: {`Authorization: Bearer ${token}`
    });

    return camelize(response.data);
  } catch (e) {
    return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
  }
}

export const getOrderListWithoutRoutes = async (filters, token) => {
  try {
    let response = await fetchAllGroupingLocationsAsync(appendDefaultFilters(filters), token);
    return calculateCapacityPerOrder(response.data);
  } catch (e) {
    return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
  }
}

/** Append Default filters to retrieve order list without route.
* @param {object} filters
* @return {object} filters
*/
function appendDefaultFilters(filters) {
  filters.statusIds = 2; // Success Grouping Locations
  filters.withRoute = 0; // Grouping locations without routes
  filters.withOrder = 1; // Grouping Location should have included orderId
  filters.include = 'pickup_group,delivery_address';
  return filters;
}

function calculateCapacityPerOrder(orders) {
  return orders.map((order) => {
    order.capacity = multiplyItems(order.itemQuantity, order.weightPerItem);
    return order;
  });
}

function multiplyItems(a, b) {
  return a * b;
}

function combineDriverWithSchedules(driverSchedules, driverList) {
  return driverSchedules.filters(findSameDriver());
}

function findSameDriver(driverId, data) {
  return driverId === data.id;
}
