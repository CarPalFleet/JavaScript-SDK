import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import {apiResponseErrorHandler} from '../utility/Util';

export const searchAsync = async (
  keywords,
  scope,
  fuzzy = true,
  fuzziness = 1,
  token
) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${
        endpoints.ELASTICSEARCH
      }?keyword=${keywords}&fuzzy=${fuzzy}&fuzziness=${fuzziness}&scope=${scope}`,
      headers: {Authorization: token},
    });
    return camelize(response.data.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

export const myOrderSearchAsync = async (
  keywords,
  scope,
  fuzzy = true,
  fuzziness = 1,
  token
) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${
        endpoints.MY_ORDER_ELASTICSEARCH
      }?keyword=${keywords}&fuzzy=${fuzzy}&fuzziness=${fuzziness}&scope=${scope}`,
      headers: {Authorization: token},
    });
    return camelize(response.data.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

export const myOrderDriverListSearchAsync = async (
  keywords,
  scope,
  fuzzy = true,
  fuzziness = 1,
  token
) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${
        endpoints.DRIVER_LIST_ELASTICSEARCH
      }?keyword=${keywords}&fuzzy=${fuzzy}&fuzziness=${fuzziness}&scope=${scope}`,
      headers: {Authorization: token},
    });
    return camelize(response.data.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};
