import {searchAsync, generalSearch} from '../Search';
import CONFIG from './Config';

describe('Elastic Search', () => {
  it('Should response the search result array', async () => {
    const response = await searchAsync(
      'mar 1',
      'orders,drivers',
      true,
      1,
      CONFIG.token
    );
    expect(response.drivers.total > 0).toBeTruthy();
  });
});

describe('Retrieve whitelabel', () => {
  it('Should response the object which is related to keywords and scope', async () => {
    const response = await generalSearch(
      CONFIG.customerId,
      CONFIG.fuzzy,
      CONFIG.fuzziness,
      CONFIG.scopes,
      CONFIG.keywords,
      CONFIG.searchAsync,
      CONFIG.token
    );
    expect(response.data).toBeTruthy();
  });
});
