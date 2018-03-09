import isObject from 'lodash.isobject';
import isArray from 'lodash.isarray';

/**
 * @param {Object|String} data string or keys of object are named in form of snake
 * @param {number} depth to which level of keys should it process
 * @return {Object|String} string or keys of object are named in form of camel case
 */
export const snakeToCamel = function(data, depth) {
  if (isObject(data) || isArray(data)) {
    // REVIEW consider comparing to null with double ==
    if (typeof depth === 'undefined') {
      depth = 1;
    }
    return _processKeys(data, _camelize, depth);
  } else {
    return _camelize(data);
  }
};

/**
 * @param {Object|String} data string or keys of object are named in form of camel case
 * @param {number} depth to which level of keys should it process
 * @return {Object|String} string or keys of object are named in form of snake
 */
export const camelToSnake = function(data, depth) {
  if (isObject(data) || isArray(data)) {
    if (typeof depth === 'undefined') {
      depth = 1;
    }
    return _processKeys(data, _snakelize, depth);
  } else {
    return _snakelize(data);
  }
};

/**
 * snakelize a string formed in underscore
 * @param {int/string} key The first param.
 * @return {string} key
 */
// REVIEW why do you use _ for the name?
function _snakelize(key) {
  let separator = '_';
  let split = /(?=[A-Z])/;

  return key
    .split(split)
    .join(separator)
    .toLowerCase();
}

/**
 * camelize a string formed in underscore
 * @param {int/string} key The frist number.
 * @return {string} key
 */
function _camelize(key) {
  if (isNumber(key)) {
    return key;
  }

  key = key.replace(/[\-_\s]+(.)?/g, function(match, ch) {
    return ch ? ch.toUpperCase() : '';
  });
  // Ensure 1st char is always lowercase
  return key.substr(0, 1).toLowerCase() + key.substr(1);
}

/**
 * camelize/snakelize keys of an object
 * depth to which level of keys should it process
 * @param {int} obj
 * @param {int} processer
 * @param {int} depth
 * @return {int} result
 */
function _processKeys(obj, processer, depth) {
  if (depth === 0 || !isObject(obj)) {
    return obj;
  }

  let result;
  if (isObject(obj)) {
    result = {};
    let keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      result[processer(keys[i])] = _processKeys(
        obj[keys[i]],
        processer,
        depth - 1
      );
    }
  } else {
    result = [];
    for (let i = 0; i < obj.length; i++) {
      result[processer(i)] = _processKeys(obj[i], processer, depth - 1);
    }
  }

  return result;
}
