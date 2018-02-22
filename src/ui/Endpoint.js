const urlPrefix = 'https://b2gp6sn1o4.execute-api.ap-southeast-1.amazonaws.com/staging';
const laravelUrlPrefix = 'https://api-test.carpal.me';
const version = 'v3';

const endpoints = {
  API_V3: {
    DRIVER_SCHEDULES: `${laravelUrlPrefix}/${version}/customer/route`,
    DRIVER_LIST: `${laravelUrlPrefix}/${version}/customer/drivers`,
    ORDERS: `${laravelUrlPrefix}/${version}/customer/order`,
  }
}

export default endpoints;
