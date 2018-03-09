import {convertObjectIntoURLString} from '../util';

describe('Convert object key/value into url string', () => {
  it('should response string vaule', async () => {
    let data = {
      limit: 20,
      offset: 1,
    };

    const urlString = await convertObjectIntoURLString(data);
    // REVIEW this test could be more useful is you would compare the urlString to a REGEX
    expect(typeof urlString).toBe('string');
  });
});
