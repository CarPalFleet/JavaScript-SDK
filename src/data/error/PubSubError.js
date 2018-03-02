import BaseError from './BaseError';

/**
 * A class that can return error
 * If there's custom error, it will return error with custom message
 * Else return defult message.
 */
export default class PubSubError extends BaseError {
  /**
   * PubSubError Class's constructor
   * @param {int} message
   */
  constructor(message) {
    super(message || 'Something went wrong in PubSub!');
  }
}
