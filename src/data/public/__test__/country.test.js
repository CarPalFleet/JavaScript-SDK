import {getCountriesAsync} from "../Country";

test("test for countries", async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

  const result = await getCountriesAsync();
  expect(result.length).toBeTruthy();
});
