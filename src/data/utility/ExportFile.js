import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import {apiResponseErrorHandler} from '../utility/Util';

export const exportFileAsync = async (type, token) => {
  try {
    const response = await axios({
      method: 'GET',
      url: getExportURL(type),
      headers: {Authorization: `Bearer ${token}`},
    });

    return camelize(response.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

export const getExportURL = async (type) => {
  switch (type) {
    case 'driver':
      return endpoints.API_V3.EXPORT_DRIVER_LIST;
    case 'routing':
      return endpoints.API_V3.EXPORT_ROUTE;
    default:
      return endpoints.API_V3.EXPORT_ROUTE;
  }
};
