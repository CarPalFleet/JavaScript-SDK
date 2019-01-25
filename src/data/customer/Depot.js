import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import {
  convertObjectIntoURLString,
  apiResponseErrorHandler,
} from '../utility/Util';
import { camelToSnake } from '../utility/ChangeCase';

/**
 * Returns list of depots
 * @param {object} filterObject # {page, limit}
 * @param {string} token
 * @return {object} Promise resolve/reject
 */

export const getDepotsAsync = async (token, filterObject = {}) => {
  let paramString = convertObjectIntoURLString(filterObject);
  try {
    const depots = await axios({
      method: 'GET',
      url: `${endpoints.API_V3.DEPOTS.replace(
        '{0}',
        paramString.replace('&', '?')
      )}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    return camelize(depots.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

/**
 * create Depot
 * @param {string} token
 * @param {object} data depot data object
 * @return {object} Promise resolve/reject
 */
export const createDepotAsync = async (token, data) => {
  try {
    const depot = await axios({
      method: 'POST',
      url: endpoints.API_V3.DEPOTS,
      headers: { Authorization: `Bearer ${token}` },
      data: camelToSnake(data),
    });
    return camelize(depot.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};
