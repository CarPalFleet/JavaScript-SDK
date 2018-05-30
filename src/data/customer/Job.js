/**
 * @fileoverview This file contains all Job related functions that are triggered by a Customer
 */

import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import {
  convertObjectIntoURLString,
  apiResponseErrorHandler,
} from '../utility/Util';

/**
 * Get Job Detail
 * @param {int} jobId
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const getJobDetailAsync = async (jobId, token) => {
  try {
    const jobDetail = await axios({
      method: 'GET',
      url: endpoints.API_V3.JOB.replace('{0}', jobId),
      headers: { Authorization: `Bearer ${token}` },
    });

    return camelize(jobDetail.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Get Job Summary
 * @param {int} jobId
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const getJobSummaryAsync = async (jobId, token) => {
  try {
    const jobSummary = await axios({
      method: 'GET',
      url: `${endpoints.API_V3.JOB.replace('{0}', jobId)}/summary`,
      headers: { Authorization: `Bearer ${token}` },
    });

    return camelize(jobSummary.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Get Recommended Jobs
 * @param {object} filterObject #{driverId, pickupDate, limit, offset}
 * @param {string} token
 * @return {object} Promise resolve/reject
 * @deprecated since version 0.1.77
 */
// TODO: needs unit testing
// TODO: there no such thing as Recommended Jobs? Should be deprecated?
export const getRecommendedJobsAsync = async (filterObject = {}, token) => {
  try {
    let paramString = convertObjectIntoURLString(filterObject);
    const jobSummary = await axios({
      method: 'GET',
      url: `${endpoints.API_V3.RECOMMENDED_JOB}${paramString.replace(
        '&',
        '?'
      )}`,
      headers: { Authorization: `Bearer ${token}` },
    });

    return camelize(jobSummary.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Retrieve All Job Counts
 * @param {object} filterObject # {pickupDate, limit, offset}
 * pickupDate (optional)(string) = "2018-02-28"
 * limit = 20 (optional)(int)
 * offset = 0 (optional)(int)
 * @param {int} customerId
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const getJobsCountsAsync = async (filterObject, customerId, token) => {
  let paramString = convertObjectIntoURLString(filterObject);
  try {
    const response = await axios({
      method: 'GET',
      url: `${endpoints.CUSTOMER_JOBS.replace(
        '{0}',
        customerId
      )}${paramString.replace('&', '?')}`,
      headers: { Authorization: token },
    });
    return calculateCustomerJobsCounts(response.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Calculate Customer jobs Counts
 * @param {object} data
 * @return {object} data # retrun count of data object
 //TODO: needs unit testing
 */
function calculateCustomerJobsCounts(data) {
  let orders = categoriesCustomerJobs(data);
  let countData = { totalStatusCounts: 0, activeStatusCounts: {} };
  return Object.keys(orders.data).reduce(function(counts, value) {
    counts.activeStatusCounts[value] = orders.data[value].length;
    counts.totalStatusCounts += orders.data[value].length;
    return counts;
  }, countData);
}

/**
 * Categories Customer Orders
 * @param {object} orders
 * @return {object} data
 */
export const categoriesCustomerJobs = (orders) => {
  let responseData = { 2: [], 5: [], 7: [], 9: [] };
  return {
    data: orders['data'].reduce((data, value) => {
      if (data[value.order_status_id]) {
        data[value.order_status_id].push(value);
      }
      return data;
    }, responseData),
  };
};

/**
 * Get Jobs with filters for Dashboard
 * @param {object} filterObject # {pickupDate (mandatory), routeStatusIds, includeOrders, limit, offset}
 * @param {int} customerId # {pickupDate (mandatory), routeStatusIds, includeOrders, limit, offset}
 * @param {string} token # {pickupDate (mandatory), routeStatusIds, includeOrders, limit, offset}
 * @param {boolean} validationStatus
 * pickupDate (optional)(string) = "2018-02-28"
 * routeStatusIds (optional)(int) = 1,2 (csv)
 * includeOrders (optional)(bollean) = true/false
 * limit = 20 (optional)(int)
 * page = 0 (optional)(int)
 * @return {object} Promise resolve/reject
 */
export const getJobsWithFiltersAsync = async (
  filterObject = {},
  customerId,
  token,
  validationStatus = false
) => {
  let paramString = convertObjectIntoURLString(filterObject);
  try {
    const response = await axios({
      method: 'GET',
      url: `${endpoints.CUSTOMER_JOBS.replace(
        '{0}',
        customerId
      )}${paramString.replace('&', '?')}`,
      headers: { Authorization: token },
    });
    return camelize(categoriesCustomerJobs(response.data));
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};
