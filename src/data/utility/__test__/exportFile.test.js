import {exportFileAsync} from '../ExportFile';
import CONFIG from './Config';

describe('Get Routes with filters', () => {
  it('should get true value for export file', async () => {
    const type = 'driver';
    const result = await exportFileAsync(type, CONFIG.token);
    expect(result.data).toBeTruthy();
  });
});
