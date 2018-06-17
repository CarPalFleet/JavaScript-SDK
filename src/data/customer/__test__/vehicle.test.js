import { getVehicleTypesAsync } from '../Vehicle';
import { getTokenAsync } from '../../account/Auth';
import CONFIG from './Config';

test('should show the list of vehicle types, inside of array expect id and type ', async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

  const result = getTokenAsync(
    CONFIG.email,
    CONFIG.password,
    CONFIG.clientId,
    CONFIG.clientSecret
  );
  const token = await result;
  const response = await getVehicleTypesAsync(token.accessToken);
  expect('data' in response).toBeTruthy();
});
