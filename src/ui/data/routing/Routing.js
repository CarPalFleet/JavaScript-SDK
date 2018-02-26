import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';

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
      headers: { Authorization: `Bearer ${token}` }
    });

    return camelize(response.data);
  } catch (e) {
    return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
  }
}

export const getDriverListAsync = async () => {
  try {
    const response = await axios({
      method: 'post',
      url: endpoints.DRIVER_LIST.replace('{0}', customerId),
      headers: { Authorization: `Bearer ${token}` }
    });

    return camelize(response.data);
  } catch (e) {
    return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
  }
}

function combineDriverWithSchedules(driverSchedules, driverList) {
  return driverSchedules.filters(findSameDriver());
}

function findSameDriver(driverId, data) {
  return driverId === data.id;
}

/** Calculate capacity per order
* @param {array} orderList
* @return {array} updated orderList including capacity
*/
export const calculateCapacityPerOrder = (orderList) => {
  return orderList.map((order) => {
    order.capacity = multiplyItems(order.itemQuantity, order.weightPerItem);
    return order;
  });
}

/** Muiltiply Items
* @param {integer} a
* @param {integer} b
* @return {integer} a * b
*/
function multiplyItems(a, b) {
  return a * b;
}
