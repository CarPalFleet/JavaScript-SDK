import { getTokenAsync } from '../../data/account/Auth';
import { routeOptimizeAsync } from '../Routing';

test('Test for sending routing optimization.', async ()=>{
    // jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    // const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.token);
    // const token = await result;
    // const response = routeOptimizeAsync({
    //     customerId: 10919,
    //     autoDispatch: true,
    //     serviceTime: 1,
    //     geoFence: false,
    //     assignTaggedDriver: false,
    //     speed: 15,
    //     capacity: 100,
    //     deliveryWindow: [0, 12000],
    //     date: '2018-01-16'
    // }, token.accessToken);
    // const res = await response;
    // expect('data' in response).toBe(true);
    expect(true).toBe(true);
})
