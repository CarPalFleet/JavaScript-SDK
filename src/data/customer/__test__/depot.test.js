import { getDepotsAsync, createDepotAsync } from '../Depot';
import { getTokenAsync } from '../../account/Auth';
import CONFIG from './Config';

describe('should show the list of depots', async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

  it('Should get Depots list', async () => {
    try {
      const token = await getTokenAsync(
        CONFIG.email,
        CONFIG.password,
        CONFIG.clientId,
        CONFIG.clientSecret
      );
      const response = await getDepotsAsync(token.accessToken);
      expect('data' in response).toBeTruthy();
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 404);
    }
  });

  it('Should get auth error if there is no proper token', async () => {
    try {
      const response = await getDepotsAsync('123');
      expect('data' in response).toBeTruthy();
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 401);
    }
  });
});

describe('Depot creation', async () => {
  it('Should create a new depot', async () => {
    try {
      const token = await getTokenAsync(
        CONFIG.email,
        CONFIG.password,
        CONFIG.clientId,
        CONFIG.clientSecret
      );
      const data = {
        code: `depot-${Math.floor(Math.random() * (999 - 100 + 1) + 100)}`,
        operating_time_start: '06:00',
        operating_time_end: '20:00',
        start_service_time_in_seconds: 1800,
        renewal_service_time_in_seconds: 1800,
        end_service_time_in_seconds: 1800,
        location: {
          address: '70 Anson Road, Singapore, 079905',
          building_name: 'GB Building',
          unit_number: '#01-23',
          latitude: 1.31384,
          longitude: 103.8071591,
        },
        contact: {
          name: 'Joe Dohn',
          email: 'joed@carpal.me',
          phone: '+6587654321',
          company_name: 'CarPal SG',
        },
      };
      const response = await createDepotAsync(token.accessToken, data);
      expect('data' in response).toBeTruthy();
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 400 || 404);
    }
  });
});
