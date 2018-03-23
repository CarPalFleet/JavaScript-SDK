import isObject from 'lodash.isobject';

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
  if (e.response) {
    rejectObj = {
      statusCode: e.response.status,
      statusText: e.response.statusText,
      errorMessage: getFormattedErrorArray(e.response.data['Message']),
    };
  } else {
    /* Catch error of e.response
    That will be undefined when status code is 403 Forbidden */
    rejectObj = {statusCode: 403, statusText: 'Forbidden', errorMessage: []};
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
  return Object.entries(object);
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
  newArray.push({key: key, messages: value});
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
