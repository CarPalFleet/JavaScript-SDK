/**
 * @fileoverview This file contains all Export related functions that are triggered by a Customer
 */

import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import { apiResponseErrorHandler } from '../utility/Util';
import { camelToSnake } from '../utility/ChangeCase';

// TODO: this file should be moved to /Customer since they are always triggered by a Customer

/** Export File
 * @param {string} type (mandatory) # driver-list or routing
 * @param {string} payload {transactionGroupIds, recipientEmail, pickupDate}
 * transactionGroupIds (optional) (array)
 * recipientEmail (optional) (string)
 * pickupDate (optional) (string) #Pickupdate is mandatory if type is routing
 * @param {string} token
 * @return {object} promist (reject/resolve)
 */
export const exportFileAsync = async (type, payload, token) => {
  try {
    const response = await axios({
      method: 'POST',
      url: getExportURL(type),
      headers: { Authorization: `Bearer ${token}` },
      data: camelToSnake(payload),
    });

    return camelize(response);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/** Get export endpoint url
 * @param {string} type (mandatory)
 * @return {string} url
 */
export const getExportURL = (type) => {
  switch (type) {
    case 'driver-list':
      return endpoints.API_V3.EXPORT_DRIVER_LIST;
    case 'routing':
      return endpoints.API_V3.EXPORT_ROUTE;
    default:
      return endpoints.API_V3.EXPORT_ROUTE;
  }
};
