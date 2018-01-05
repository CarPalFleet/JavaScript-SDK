import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';

export const sendLiveRouteDataAsync = async (payload, token)=>{
    try{
        let liveRouteObj = {
          id: payload.driverId,
          orderId: payload.orderId,
          addressId: 0,
          latitude: payload.latitude,
          longitude: payload.longitude,
          orderRouteTypeId: 1
        }

        const response = await axios({method: 'post',
                                      url: endpoints.DRIVER_LIVE_ROUTES.replace('{0}', liveRouteObj.driverId),
                                      headers: {
                                        "Content-Type": 'application/json',
                                        "Authorization": token
                                      },
                                      data: liveRouteObj})
        return camelize(response.data);
    }catch(e){
        return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    }
}
