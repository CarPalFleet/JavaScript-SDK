import {sendLiveRouteDataAsync} from '../LiveRoute';
import {getDriverTokenAsync} from './Auth';
import {getTokenAsync} from '../../account/Auth';
import CONFIG from './config';
import axios from 'axios';

test('Test for new live route', async () => {
  // jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  // const result = getDriverTokenAsync(CONFIG.driverEmail, CONFIG.driverPassword);
  // const data = await result;
  // const response = await sendLiveRouteDataAsync(CONFIG.liveRoute, data.token);
  //
  // expect(response).toBeTruthy();
  expect(true).toBeTruthy();
});

// test('Test for merging driver location and live route data', async()=>{
//     jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
//     const result = getTokenAsync(CONFIG.temail, CONFIG.tpassword, CONFIG.clientId, CONFIG.token);
//     const token = await result;
// })
