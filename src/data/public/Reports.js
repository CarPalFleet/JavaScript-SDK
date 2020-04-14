/**
 * @fileoverview This file contains all getReportFieldsAsync related functions that are triggered by a (public) User
 */

import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import { apiResponseErrorHandler } from '../utility/Util';

/**
 * Retrieve all report fields
 * @param {string} reportType
 * @return {object} Promise resolve/reject
 */
export const getReportFieldsAsync = async (reportType) => {
  try {
    const response = await axios.get(
      endpoints.API_V3.REPORT_FIELDS.replace('{0}', reportType)
    );
    return camelize(response.data.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};
