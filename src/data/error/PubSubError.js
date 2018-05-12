import BaseError from "./BaseError";

// TODO: not sure what the purpose of below class is, we should consider deprecating it.

/**
 * A class that can return error
 * If there"s custom error, it will return error with custom message
 * Else return defult message.
 */
export default class PubSubError extends BaseError {
  /**
   * PubSubError Class"s constructor
   * @param {int} message
   */
  constructor(message) {
    super(message || "Something went wrong in PubSub!");
  }
}
