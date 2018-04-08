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
      headers: {Authorization: `Bearer ${token}`},
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
      headers: {Authorization: `Bearer ${token}`},
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
 */
 //TODO: needs unit testing
export const getRecommendedJobsAsync = async (filterObject = {}, token) => {
  try {
    let paramString = convertObjectIntoURLString(filterObject);
    const jobSummary = await axios({
      method: 'GET',
      url: `${endpoints.API_V3.RECOMMENDED_JOB}${paramString.replace(
        '&',
        '?'
      )}`,
      headers: {Authorization: `Bearer ${token}`},
    });

    return camelize(jobSummary.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};
