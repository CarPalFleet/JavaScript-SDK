import { exportFileAsync } from '../ExportFile';
import CONFIG from './Config';
import { getTokenAsync } from '../../account/Auth';

describe('Get Routes with filters', () => {
  it('`should get true value for export file`', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    const type = 'routing';
    const result = await getTokenAsync(
      CONFIG.email,
      CONFIG.password,
      CONFIG.clientId,
      CONFIG.clientSecret
    );
    const payload = {
      pickupDate: '2018-03-28',
      recipientEmail: 'alpha.test@carpal.me',
    };
    const response = await exportFileAsync(type, payload, result.accessToken);
    expect(response).toHaveProperty('status', 202);
  });
});
