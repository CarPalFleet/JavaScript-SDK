import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';

export const sendLiveRouteDataAsync = async (driverInfo, token)=>{
    try{
        console.log(driverInfo, token);
        const response = await axios({method: 'post',
                                      url: 'https://b2gp6sn1o4.execute-api.ap-southeast-1.amazonaws.com/staging/drivers/1/live-routes',
                                      headers: {
                                        "Content-Type": 'application/json',
                                        "Authorization": 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIzNTEyLCJpc3MiOiJodHRwczovL2FwaS10ZXN0LmNhcnBhbC5tZS8vdjIvYXV0aGVudGljYXRlIiwiaWF0IjoxNTEzNzQyNzI5LCJleHAiOjE1MTM3NDYzMjksIm5iZiI6MTUxMzc0MjcyOSwianRpIjoiMXd0bzRIM2hiaHZQRXNHMCJ9.op3Ey7AUuDAxu2RxzsH0CV4ysfXKBnINisLgfVceScg'
                                      },
                                      data: driverInfo})
        return camelize(response.data);
    }catch(e){
        console.log("RRR", e.response.status, e.response.statusText);
        return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    }
}

export const mergeLiveRouteWithDriverLocation = (driverLoc, liveRoute)=>{
    return {...liveRoute, driverLoc}
}
