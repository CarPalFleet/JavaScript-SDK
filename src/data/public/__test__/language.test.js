import { getLanguagesAsync } from '../Language';

test('test for languages', async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
  const result = await getLanguagesAsync();
  expect(result.length).toBeTruthy();
});
