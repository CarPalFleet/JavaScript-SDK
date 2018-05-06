import {getLanguagesAsync} from '../Language';

test('test for languages', async () => {
  jest.setTimeout(10000);
  const result = await getLanguagesAsync();
  expect(result.length).toBeTruthy();
});
