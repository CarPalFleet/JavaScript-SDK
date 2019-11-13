import { getLanguages } from '../Languages';

describe('Test for Languages', () => {
  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
  });

  it('should get list of languages', async () => {
    try {
      const result = await getLanguages();
      expect(result).toBeTruthy();
    } catch (error) {
      expect(error).toHaveProperty('statusCode', 403);
    }
  });
});
