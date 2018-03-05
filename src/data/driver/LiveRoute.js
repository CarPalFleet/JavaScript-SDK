import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import {apiResponseErrorHandler} from '../../utility/Util';

export const sendLiveRouteDataAsync = async (liveRouteObj, token) => {
  try {
    const response = await axios({
      method: 'post',
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
