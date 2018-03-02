import {getVehicleTypesAsync} from '../Vehicle';
import {getTokenAsync} from '../../account/Auth';
import CONFIG from './Config';

test('should show the list of vehicle types, inside of array expect id and type ', async () => {
  const result = getTokenAsync(
    CONFIG.temail,
    CONFIG.tpassword,
    CONFIG.clientId,
    CONFIG.clientSecret
  );
  const token = await result;
  const response = await getVehicleTypesAsync(token.accessToken);
  expect('data' in response).toBe(true);
});
