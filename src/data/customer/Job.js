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
 * Get Job Driver Locations
 * @param {int} jobId
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const getJobDriverLocationsAsync = async (jobId, token) => {
  try {
    const jobDriverLocations = await axios({
      method: 'GET',
      url: endpoints.API_V3.JOB_DRIVER_LOCATIONS.replace('{0}', jobId),
      headers: { Authorization: `Bearer ${token}` },
    });
    return camelize(jobDriverLocations.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Returns job timeline
 * @param {int} jobId
 * @param {string} token
 * @param {object} filterObject # {nextCursor, limit}
 * @return {object} Promise resolve/reject
 */

export const getJobTimelineAsync = async (jobId, token, filterObject = {}) => {
  let paramString = convertObjectIntoURLString(filterObject);
  try {
    const timeline = await axios({
      method: 'GET',
      url: `${endpoints.API_V3.JOB_TIMELINE.replace('{0}', jobId).replace(
        '{1}',
        paramString.replace('&', '?')
      )}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    return camelize(timeline.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * Returns jobs created by the customer
 * @param {object} filterObject # {pickupDateStart, pickupDateEnd, transactionGroupIds, jobStatusIds, includes, page, limit}
 * @param {string} token
 * @return {object} Promise resolve/reject
 */

export const getJobsAsync = async (token, filterObject = {}) => {
  let paramString = convertObjectIntoURLString(filterObject);
  try {
    const jobs = await axios({
      method: 'GET',
      url: `${endpoints.API_V3.JOB.replace(
        '{0}',
        paramString.replace('&', '?')
      )}`,
      headers: { Authorization: `Bearer ${token}` },
    });

    return camelize(jobs.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

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
 * @param {object} filterObject # {pickupDate}
 * pickupDate (optional)(string) = "2018-02-28"
 * @param {int} customerId
 * @param {string} token
 * @return {object} Promise resolve/reject
 * //TODO: needs unit testing
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
  let jobs = categoriesCustomerJobs(data);
  let countData = { totalStatusCounts: 0, activeStatusCounts: {} };
  return Object.keys(jobs.data).reduce(function(counts, value) {
    counts.activeStatusCounts[value] = jobs.data[value].length;
    counts.totalStatusCounts += jobs.data[value].length;
    return counts;
  }, countData);
}

/**
 * Categories Customer Jobs
 * @param {object} jobs
 * @return {object} data
 */
export const categoriesCustomerJobs = (jobs) => {
  let responseData = { 2: [], 5: [], 7: [], 9: [] };
  return {
    data: jobs['data'].reduce((data, value) => {
      if (data[value.job_status_id]) {
        data[value.job_status_id].push(value);
      }
      return data;
    }, responseData),
  };
};

/**
 * Get Jobs with filters for Dashboard
 * @param {object} filterObject # {pickupDate (mandatory), jobStatusIds}
 * @param {int} customerId
 * @param {string} token
 * @param {boolean} validationStatus
 * pickupDate (optional)(string) = "2018-02-28"
 * jobStatusIds (optional)(int) = 1,2 (csv)
 * @return {object} Promise resolve/reject
 *  //TODO: needs unit testing
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

/**
 * Get Updated Job Live Data for Dashboard
 * @param {object} originalJobDatum
 * @param {object} pubSubPayload
 * @param {string} filterObject {pickupDate, routeStatusIds, includeJobs limit, offset}
 * @return {object} Promise resolve/reject
 */
// TODO: needs unit testing
export const getUpdatedJobLiveData = (
  originalJobDatum,
  pubSubPayload,
  filterObject
) => {
  try {
    pubSubPayload = camelize(pubSubPayload.payload);
    // If jobStatusId is 1, change into 2. #laraval side will handle it later.
    const jobStatusIds = [2, 5, 7, 9];
    if (pubSubPayload.jobStatusId == 1) pubSubPayload.jobStatusId = 2;

    /* palyload jobStatusId must be includes in 2,5,7,9
      payload date should be the same with today date
      payload jobStatusId jobStatusIds must be one of jobStatusIds of filterObject
      Else send return orginal Job Data */
    const isValidStatus = jobStatusIds.includes(pubSubPayload.jobStatusId);
    const isSameDate = pubSubPayload.pickupDate === filterObject.pickupDate;
    const isInclude = filterObject.jobStatusIds
      ? filterObject.jobStatusIds.includes(pubSubPayload.jobStatusId)
      : true;

    if (!(isValidStatus && isSameDate && isInclude)) {
      return originalJobDatum;
    }

    let jobStatusKeys = Object.keys(originalJobDatum['data']);
    let matchedPayload = jobStatusKeys.reduce(
      (matchedPayload, statusId) => {
        let index = originalJobDatum['data'][statusId].findIndex((job) => {
          return pubSubPayload.jobId == job.jobId; // jobId might be string/integer;
        });
        if (index >= 0) {
          matchedPayload.statusId = statusId;
          matchedPayload.index = index;
          matchedPayload.data = originalJobDatum['data'][statusId][index];
          matchedPayload.isDataExist =
            originalJobDatum['data'][statusId][index];
        }
        return matchedPayload;
      },
      { isDataExist: false, statusId: 0, index: -1, data: {} }
    );

    if (matchedPayload.isDataExist) {
      // update activeStatusCounts
      originalJobDatum['activeStatusCounts'][pubSubPayload.jobStatusId] += 1;
      let currentStatusCounts =
        originalJobDatum['activeStatusCounts'][matchedPayload.statusId];
      originalJobDatum['activeStatusCounts'][
        matchedPayload.statusId
      ] -= currentStatusCounts ? 1 : 0;
      originalJobDatum['data'][matchedPayload.statusId].splice(
        matchedPayload.index,
        1
      );
    } else {
      originalJobDatum['totalStatusCounts'] += 1;
      originalJobDatum['activeStatusCounts'][pubSubPayload.jobStatusId] += 1;
    }
    // update data Object
    originalJobDatum['data'][pubSubPayload.jobStatusId].push(pubSubPayload);
    return originalJobDatum;
  } catch (e) {
    return { statusCode: '500', statusText: 'Error in updating job live data' };
  }
};

/**
 * create Jobs
 * @param {string} routeIds comma separated string ex: 1234,3455
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const createJobsAsync = async (routeIds, token) => {
  try {
    const routes = routeIds.split(',');
    const promises = routes.map((id) => {
      return axios({
        method: 'POST',
        url: endpoints.API_V3.JOB_FROM_ROUTE,
        headers: { Authorization: `Bearer ${token}` },
        data: {
          route_id: id,
        },
      });
    });
    const responses = await axios.all(promises);
    return responses.map((res, index) => {
      const returnObj = {
        routeId: routes[index],
        job: camelize(res.data).data,
      };
      return returnObj;
    });
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * delete Jobs
 * @param {string} jobIds comma separated string ex: 1234,3455
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const removeJobsAsync = async (jobIds, token) => {
  try {
    await axios({
      method: 'DELETE',
      url: `${endpoints.API_V3.JOB.replace(
        '/{0}',
        `?job_ids=${jobIds}&cascade=1`
      )}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    return { data: true };
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * delete Jobs
 * @param {string} jobId
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const cancelJobAsync = async (jobId, token) => {
  try {
    const jobData = axios({
      method: 'PUT',
      url: `${endpoints.API_V3.JOB}/${jobId}`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        status_id: 4, // cancelled
      },
    });
    return camelize(jobData.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};
