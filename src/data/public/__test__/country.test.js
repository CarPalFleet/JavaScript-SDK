import {getCountriesAsync} from '../Country';

test('test for countries', async () => {
  jest.setTimeout(10000);

  const result = await getCountriesAsync();
  expect(result.length).toBeTruthy();
});
