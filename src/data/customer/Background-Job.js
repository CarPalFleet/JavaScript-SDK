/**
 * @fileoverview This file contains all background job relatated functions
 */

import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import { apiResponseErrorHandler } from '../utility/Util';

/**
 * Get Latest background job status by type
 * @param {number} backgroundJobTypeId true/false
 *  1: Optimize Route
    2: Generate Driver Availability
    3: Generate Driver Order Recommendations
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const getLatestBackgroundJob = async (backgroundJobTypeId, token) => {
  try {
    let response = await axios({
      method: 'GET',
      url: `${endpoints.API_V3.LATEST_BACKGROUND_JOB.replace(
        '{0}',
        `?background_job_type_id=${backgroundJobTypeId}`
      )}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return camelize(response.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};
