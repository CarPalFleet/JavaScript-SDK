import BaseError from './BaseError';

export default class PubSubError extends BaseError {
  constructor(message) {
    super(message || 'Something went wrong in PubSub!');
  }
}
