import { getVehicleTypesAsync } from '../Vehicle';
import { getTokenAsync } from '../../account/Auth';
import CONFIG from './Config';

describe('Vehicle types', () => {
  it('should get vehicle types', async () => {
    try {
      const result = getTokenAsync(
        CONFIG.email,
        CONFIG.password,
        CONFIG.clientId,
        CONFIG.clientSecret
      );
      const token = await result;
      const response = await getVehicleTypesAsync(token.accessToken);
      expect('data' in response).toBeTruthy();
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 401);
    }
  });
});
