import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';

export const sendLiveRouteDataAsync = async (driverInfo, token)=>{
    try{
        const response = await axios({method: 'post',
                                      url: endpoints.DRIVER_LIVE_ROUTES.replace('{0}', driverInfo.driverId),
                                      headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': token
                                      },
                                      data: driverInfo});
        return camelize(response.data.data);
    }catch(e){
        return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    }
}

export const mergeLiveRouteWithDriverLocation = (driverLoc, liveRoute)=>{
    return {...liveRoute, driverLoc}
}
