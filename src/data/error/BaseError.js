// REVIEW no need to 'use strict' babel will add it
// not sure what you need this for is it really useful?
// can you not use new Error('Something went wrong in PubSub!')

'use strict';

/**
 * Default Error class that can throw error
 */
export default class BaseError extends Error {
  /**
   * PubSubError Class's constructor
   */
  constructor(...args) {
    super(...args);
    this.name = this.constructor.name;
  }
}
