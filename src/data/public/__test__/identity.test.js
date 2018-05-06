import {getIdentitiesAsync} from '../Identity';

test('test for identities', async () => {
  jest.setTimeout(10000);
  const result = await getIdentitiesAsync();
  expect(result.length).toBeTruthy();
});
