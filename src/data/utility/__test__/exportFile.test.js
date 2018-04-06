import {exportFileAsync} from '../ExportFile';
import CONFIG from './Config';
import {getTokenAsync} from '../../account/Auth';


describe('Get Routes with filters', () => {
  it('should get true value for export file', async () => {
    const type = 'routing';
    const result = getTokenAsync(
      CONFIG.email,
      CONFIG.password,
      CONFIG.clientId,
      CONFIG.clientSecret
    );
    const payload = {
      pickupDate: '2018-02-28',
      recipientEmail: 'alpha.test@carpal.me',
      transactionGroupId: 1,
    };
    const response = await exportFileAsync(type, payload, result.token);
    expect(response.data).toBeTruthy();
  });
});
