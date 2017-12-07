import { sendLiveRouteDataAsync } from '../LiveRoute';
import { getTokenAsync } from '../../account/Auth';
import CONFIG from './Config';

test('Test for new live route', async () =>{
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const result = getTokenAsync('transaction@carpal.me', 'transactioncustomer', CONFIG.clientId, CONFIG.token);
    //const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.token);
    const token = await result;

    const liveRoute = {
        orderId: 1,
        addressId: 1,
        customerId: 1,
        driverId: 1,
        driverFirstName: "Darth",
        driverLastName: "Vader",
        driverTypes: "private",
        latitude: "103.2348909",
        longitude: "1.234810928",
        orderRouteType: "route"
    }

    const response = await sendLiveRouteDataAsync(liveRoute, token.accessToken);

    expect(response).toBeTruthy();
})

test('Test for merging driver location and live route data', async()=>{
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const result = getTokenAsync('transaction@carpal.me', 'transactioncustomer', CONFIG.clientId, CONFIG.token);
    const token = await result;
})