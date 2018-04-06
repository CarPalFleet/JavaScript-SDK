import {getJobDetailAsync, getJobSummaryAsync} from '../Job';
import {getTokenAsync} from '../../account/Auth';
import CONFIG from './Config';

describe('Show job', () => {
  it('Should get job details', async () => {
    const result = getTokenAsync(
      CONFIG.email,
      CONFIG.password,
      CONFIG.clientId,
      CONFIG.clientSecret
    );
    const token = await result;
    const response = await getJobDetailAsync(CONFIG.orderId, token.accessToken);
    expect('data' in response).toBeTruthy();
    expect(true).toBeTruthy();
  });
});

describe('Show Jobs', () => {
  it('Should get Job summary', async () => {
    const result = getTokenAsync(
      CONFIG.email,
      CONFIG.password,
      CONFIG.clientId,
      CONFIG.clientSecret
    );
    const token = await result;
    const response = await getJobSummaryAsync(
      CONFIG.orderId,
      token.accessToken
    );
    expect('data' in response).toBeTruthy();
    expect(true).toBeTruthy();
  });
});
