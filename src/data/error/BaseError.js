'use strict';

export default class BaseError extends Error {
  constructor(...args) {
    super(...args);
    this.name = this.constructor.name;
  }
}
