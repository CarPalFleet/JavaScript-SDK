import PubSubError from '../PubSubError';

/**
 * A function will throw new PubSubError
 */
function doPubSubError() {
  throw new PubSubError();
}

it('should recognize pubsub error', () => {
  expect(() => {
    doPubSubError();
  }).toThrowError();
});
