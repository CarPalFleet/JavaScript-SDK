/**
 * @fileoverview This file contains all general Utility functions
 */

import isObject from 'lodash.isobject';
import camelize from 'camelize';
import moment from 'moment-timezone';
import get from 'lodash.get';

/**
 * Convert Object into string as URL params
 * Example: &limit=10&offset=20
 * @param {object} filters
 * @return {string} urlString
 */
export const convertObjectIntoURLString = (filters) => {
  return Object.keys(filters).reduce(
    (str, key) => (str += `&${key}=${filters[key]}`),
    ''
  );
};

/**
 * Handle API Error
 * @param {object} e #error object
 * @return {object} Promise reject with statusCode and statusText
 */
export const apiResponseErrorHandler = (e) => {
  let rejectObj = {};
  let messages = null;
  if (e.response) {
    if (e.response.data && e.response.data.errors) {
      let errors = [];
      let errorObj = e.response.data.errors;
      if (errorObj.location_data) {
        errorObj = errorObj.location_data;
      }
      const camelizedObj = camelize(errorObj);
      const keys = Object.keys(camelizedObj);
      keys.forEach((key) => {
        errors.push({
          key,
          messages: camelizedObj[key],
        });
      });
      if (errors.length) {
        messages = errors;
      }
    }
    rejectObj = {
      statusCode: e.response.status,
      statusText: e.response.statusText,
      errorMessage:
        messages || getFormattedErrorArray(e.response.data['Message']),
    };
  } else if (e.statusCode) {
    rejectObj = e;
  } else {
    /* Catch error of e.response
    That will be undefined when status code is 403 Forbidden */
    rejectObj = { statusCode: 403, statusText: 'Forbidden', errorMessage: [] };
  }
  return Promise.reject(rejectObj);
};

/**
 * Response Promise Reject
 * It is for normal function rejection (not ajax call) to front-end
 * @param {object} e #error object
 * @return {object} Promise reject with statusCode and statusText
 */
export const rejectPromise = (e) => {
  return Promise.reject({
    statusCode: e.statusCode,
    statusText: e.statusText,
    errorMessage: [],
  });
};

/**
 * Format error messages into key value objects inside of array
 * @param {object} errorMessage #error object
 * @return {array} error array
 * If errorMessage is string,
 * return error string value as an element of array and key will be null value
 * Other wise, convert error objectes into key/value elements of an array.
 */
export const getFormattedErrorArray = (errorMessage) => {
  if (isObject(errorMessage)) {
    return arrayReduce(
      convertObjectIntoKeyValueArray(errorMessage),
      pushKeyAndMessageToArray
    );
  }

  // return key as null, and pass errorMessage into string element of an array
  return [
    {
      key: null,
      messages: [errorMessage],
    },
  ];
};

/**
 * Convert Object into key/value array.
 * ES6 Object.entries method will convert object into key, value array.
 * @param {object} object
 * @return {array} [key, value]
 */
export const convertObjectIntoKeyValueArray = (object) => {
  // implementation of Object.entries as it is not available in all browsers
  const ownProps = Object.keys(object);
  let i = ownProps.length;
  const resArray = new Array(i); // preallocate the Array
  while (i--) {
    resArray[i] = [ownProps[i], object[ownProps[i]]];
  }
  return resArray;
};

/**
 * Iterate the array and format by using ES 6 reduce method
 * Javascript ES Object.entries method will convert object into key, value array.
 * @param {object} array
 * @param {object} cb #call back function
 * @param {array} accumulator
 * @return {array} reduced data array
 */
export const arrayReduce = (array, cb, accumulator = []) => {
  return array.reduce(cb, accumulator);
};

/**
 * Iterate the array and format by using ES 6 reduce method
 * Javascript ES Object.entries method will convert object into key, value array.
 * @param {object} array
 * @param {object} cb #call back function
 * @param {array} accumulator
 * @return {array} reduced data array
 */
export const arrayMap = (array, cb) => {
  return array.map(cb);
};

/**
 * Store key/value element into array
 * @param {array} newArray #error object
 * @param {array}} [key, value]
 * @return {array} new accumulator array
 */
export const pushKeyAndMessageToArray = (newArray, [key, value]) => {
  newArray.push({ key: key, messages: value });
  return newArray;
};

/**
 * Manipulate the id of Array Object into CSV string
 * @param {object} array
 * @param {object} fieldName
 * @return {string} comma seperated value string
 */
export const getCSVStringFromArrayObject = (array, fieldName) => {
  return array
    .map((data) => {
      return data[fieldName];
    })
    .join();
};

/**
 * Find the the same id in the object
 * @param {array} a
 * @param {array} b
 * @return {boolean} true/falsea
 */
export const hasSameObjectId = (a, b) => {
  return a.id === b.id;
};

/**
 * It creates error response from object
 * @param {Object} error {statusCode, status}
 * @return {Object} error object for errorHandler
 */
export const customError = (error) => {
  return {
    response: {
      status: error.statusCode,
      statusText: error.statusText,
      data: {},
    },
  };
};

/**
 * It merges two similar arrays and merge specific property of object in this array.
 * @param {Array} a first array
 * @param {Array} b seconds array
 * @param {string} prop unique property what we comparing (ex. id)
 * @param {string} mergeProp property which we want to merge (ex. data array)
 * @return {Array} updatedArray
 */
export const mergeArraysWithObjects = (a = [], b = [], prop, mergeProp) => {
  if (a.length === 0 && b.length === 0) {
    return [];
  }
  if (a.length === 0) {
    return [...b];
  }
  if (b.length === 0) {
    return [...a];
  }
  const updatedArray = a.map((aItem) => {
    const item = b.find((bitem) => bitem.id === aItem.id);
    return item
      ? { ...aItem, [mergeProp]: [...aItem[mergeProp], ...item[mergeProp]] }
      : aItem;
  });

  b.forEach((bitem) => {
    const uniqueIndex = updatedArray.findIndex((item) => item.id === bitem.id);
    if (uniqueIndex < 0) {
      updatedArray.push(bitem);
    }
  });

  return updatedArray;
};

/**
 * It takes UTC unix timestamp in seconds and convert it to the timezone where user is active depending on his identity.
 * timestamp, userIdentityId, identities
 * @param {Number} timestamp datetime unix timestamp in seconds
 * @param {Number} userIdentityId identity id of the user
 * @param {Array} identities collection of identities
 * @return {Object} moment instance which will have all moment methods
 * Example of usage:
 * getUserDateTimefromUTC(
 *  new Date.getTime() / 1000,
 *  1,
 *  [...identities...]
 * ).format('YYYY-MM-DD HH:mm')
 */

export const getUserDateTimefromUTC = (
  timestamp,
  userIdentityId,
  identities
) => {
  if (timestamp && userIdentityId && identities && identities.length) {
    const timezone = get(
      identities.find((i) => i.id === userIdentityId),
      'identityDetail.timezone',
      ''
    );
    return moment(timestamp * 1000).tz(timezone);
  }
  return null;
};
