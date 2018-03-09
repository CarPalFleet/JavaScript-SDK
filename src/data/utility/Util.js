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
    };
  } else {
    /* Catch error of e.response
    That will be undefined when status code is 403 Forbidden */
    rejectObj = {statusCode: 403, statusText: 'Forbidden'};
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
  });
};
