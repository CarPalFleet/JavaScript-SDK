import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import {convertObjectIntoURLString} from '../utility/Util';

/**
 * Get Job Detail
 * @param {int} jobId
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const getJobDetailAsync = async (jobId, token) => {
  try {
    const jobDetail = await axios({
      method: 'get',
      url: 'endpoints.JOB'.replace('{0}', jobId),
      headers: {Authorization: `bearer ${token}`},
    });

    return camelize(jobDetail.data);
  } catch (e) {
    return Promise.reject({
      statusCode: e.response.status,
      statusText: e.response.statusText,
    });
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
      method: 'get',
      url: `${endpoints.JOB.replace('{0}', jobId)}/summary`,
      headers: {Authorization: `bearer ${token}`},
    });

    return camelize(jobSummary.data);
  } catch (e) {
    return Promise.reject({
      statusCode: e.response.status,
      statusText: e.response.statusText,
    });
  }
};

/**
 * Get Recommended Jobs
 * @param {object} filterObject #{driverId, pickupDate, limit, offset}
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const getRecommendedJobsAsync = async (filterObject = {}, token) => {
  try {
    let paramString = convertObjectIntoURLString(filterObject);
    const jobSummary = await axios({
      method: 'get',
      url: `${endpoints.RECOMMENDED_JOB}${paramString.replace('&', '?')}`,
      headers: {Authorization: `bearer ${token}`},
    });

    return camelize(jobSummary.data);
  } catch (e) {
    return Promise.reject({
      statusCode: e.response.status,
      statusText: e.response.statusText,
    });
  }
};
