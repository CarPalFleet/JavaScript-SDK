/**
 * @fileoverview This file contains all driver GPS data related functions that are triggered by a Driver
 */

import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import {apiResponseErrorHandler} from '../utility/Util';

/**
 * Send Live Data from driver app to Dynamodb
 * @param {object} liveRouteObj # {orderId, addressId, driverId, latitude, longitude, orderRouteType}
 * orderId (mandatory)(string) = 1234
 * addressId (mandatory)(int) = 0 #pass 0 value if no addressId
 * driverId (mandatory)(int) = 134
 * latitude = 1.344 (mandatory)(int)
 * longitude = 102.33 (mandatory)(int)
 * orderRouteType = 0 (mandatory)(int)
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const sendLiveRouteDataAsync = async (liveRouteObj, token) => {
  try {
    const response = await axios({
      method: 'POST',
      url: endpoints.DRIVER_LIVE_ROUTES.replace('{0}', liveRouteObj.driverId),
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      data: liveRouteObj,
    });
    return camelize(response.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};
