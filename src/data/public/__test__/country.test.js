import { getCountriesAsync } from '../Country';

test('test for countries', async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

  try {
    const result = await getCountriesAsync();
    expect(result.length).toBeTruthy();
  } catch (error) {
    expect(error).toHaveProperty('statusCode');
  }
});
