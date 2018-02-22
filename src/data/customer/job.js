import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';

/** Job Detail
* @param {integer} jobId
* @param {Object} jobDetail
*/
export const getJobDetailAsync = async (orderId, token)=>{
    try {
         const jobDetail = await axios({method: 'get',
                                       url: 'endpoints.JOB'.replace('{0}', jobId),
                                       headers: {'Authorization': token}})
         return camelize(categoriesCustomerOrders(jobDetail.data));
    } catch (e) {
      return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    }
}

/** Job Summary
* @param {integer} jobId
* @param {Object} jobSummary
*/
export const getJobSummaryAsync = async (orderId, token)=>{
    try {
        const jobSummary = await axios({method: 'get',
                                      url: `${endpoints.JOB.replace('{0}', orderId)}/summary`,
                                      headers: {'Authorization': token}})
        return camelize(jobSummary.data);
    } catch (e) {
      return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    }
}
