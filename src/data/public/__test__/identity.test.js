import {getIdentitiesAsync} from '../Identity';

test('test for identities', async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  const result = await getIdentitiesAsync();
  expect(result.length).toBeTruthy();
});
