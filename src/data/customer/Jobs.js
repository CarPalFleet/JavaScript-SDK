import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import {
  convertObjectIntoURLString,
  apiResponseErrorHandler,
} from '../utility/Util';

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
      url: `${endpoints.JOB.replace('{0}', paramString)}`,
      headers: { Authorization: `bearer ${token}` },
    });

    return camelize(jobs.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};
