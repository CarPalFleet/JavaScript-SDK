import PubSubError from '../PubSubError';

function doPubSubError() {
  throw new PubSubError();
}

it('should recognize pubsub error', () => {
  expect(() => {
      doPubSubError();
  }).toThrowError();
});
