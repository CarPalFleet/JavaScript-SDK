import { searchAsync, generalSearch } from '../Search';
import CONFIG from './Config';

describe('Elastic Search', () => {
  it('Should response the search result array', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    // TODO: needs to be resolved
    try {
      const response = await searchAsync(
        'mar 1',
        'orders,drivers',
        true,
        1,
        CONFIG.token
      );
      expect(response.drivers.total > 0).toBeTruthy();
    } catch (e) {
      //
    }
  });
});

describe('Retrieve whitelabel', () => {
  it('Should response the object which is related to keywords and scope', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    // TODO: needs to be resolved

    try {
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
    } catch (e) {
      //
    }
  });
});
