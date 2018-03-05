import axios from 'axios';
import endpoints from '../data/Endpoint';
import camelize from 'camelize';

export const routeOptimizeAsync = async (
  {
    customerId,
    autoDispatch,
    serviceTime,
    geoFence,
    assignTaggedDriver,
    speed,
    capacity,
    deliveryWindow,
    pickupDate,
  },
  token
) => {
  try {
    const response = await axios({
      method: 'post',
      url: endpoints.ROUTE_OPTIMIZE_SETTINGS.replace('{0}', customerId),
      body: {
        autoDispatch,
        serviceTime,
        geoFence,
        assignTaggedDriver,
        speed,
        capacity,
        deliveryWindow,
        pickupDate,
      },
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
    return camelize(response.data.data);
  } catch (e) {
    return Promise.reject({
      statusCode: e.response.status,
      statusText: e.response.statusText,
    });
  }
};
