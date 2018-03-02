import { getCountriesAsync } from '../Country';

test('test for countries', async () => {
  const result = await getCountriesAsync();
  expect(result.length).toBeTruthy();
});
