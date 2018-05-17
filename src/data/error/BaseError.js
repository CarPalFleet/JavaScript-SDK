// TODO: not sure what the purpose of below class is, we should consider deprecating it.

/**
 * Default Error class that can throw error
 */
export default class BaseError extends Error {
  /**
   * PubSubError Class constructor
   */
  constructor(...args) {
    super(...args);
    this.name = this.constructor.name;
  }
}
