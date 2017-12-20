import { sendLiveRouteDataAsync } from '../LiveRoute';
import { getTokenAsync } from '../../account/Auth';
import CONFIG from './Config';

test('Test for new live route', async () =>{
    // jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const result = getTokenAsync(CONFIG.temail, CONFIG.tpassword, CONFIG.clientId, CONFIG.token);
    //const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.token);
    const token = await result;

    const liveRoute = {
      "orderId": 0,
      "addressId": 0,
      "driverId": 123456,
      "latitude": "1.33",
      "longitude": "103.45",
      "orderRouteType": 1
    }

    const response = await sendLiveRouteDataAsync(liveRoute, token.accessToken);
    console.log("response", response);
    expect(response).toBeTruthy();
})

test('Test for merging driver location and live route data', async()=>{
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const result = getTokenAsync(CONFIG.temail, CONFIG.tpassword, CONFIG.clientId, CONFIG.token);
    const token = await result;
})
