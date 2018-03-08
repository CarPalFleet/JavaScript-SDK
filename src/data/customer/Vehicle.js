import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import {apiResponseErrorHandler} from '../utility/Util';

/**
 * Get Vehicles
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const getVehicleTypesAsync = async (token) => {
  try {
    const vehicles = await axios({
      method: 'get',
      url: `${endpoints.VEHICLES}/types`,
      headers: {Authorization: `bearer ${token}`},
    });

    return camelize(vehicles.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};
