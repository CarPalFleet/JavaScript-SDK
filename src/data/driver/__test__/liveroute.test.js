import { sendLiveRouteDataAsync } from '../LiveRoute';
import { getTokenAsync } from '../../account/Auth';
import CONFIG from './Config';

test('Test for new live route', async () =>{
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const result = getTokenAsync(CONFIG.driverEmail, CONFIG.driverPassword, CONFIG.clientId, CONFIG.token);
    const token = await result;

    const liveRoute = {
        "orderId": 62399,
        "addressId": 0,
        "driverId": 9168,
        "latitude": "14.572824",
        "longitude": "121.0963087",
        "orderRouteType": 1
    }
    const response = await sendLiveRouteDataAsync(liveRoute, token.accessToken);

    expect(response).toBeTruthy();
})

test('Test for merging driver location and live route data', async()=>{
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const result = getTokenAsync(CONFIG.temail, CONFIG.tpassword, CONFIG.clientId, CONFIG.token);
    const token = await result;
})
