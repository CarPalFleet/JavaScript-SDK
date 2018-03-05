const urlPrefix =
  'https://b2gp6sn1o4.execute-api.ap-southeast-1.amazonaws.com/staging';
const laravelUrlPrefix = 'https://api-test.carpal.me';
const version = 'v3';

const endpoints = {
  LANGUAGES: `${urlPrefix}/languages`,
  IDENTITIES: `${urlPrefix}/identities`,
  COUNTRIES: `${urlPrefix}/countries`,
  ACCOUNTS: `${urlPrefix}/drivers`,
  OAUTH: `${urlPrefix}/authentication`,
  PASSWORD_RESET: `${urlPrefix}/users/password/reset`,
  PASSWORD_RESET_TOKEN: `${urlPrefix}/users/password/token`,
  MY_JOBS: `${urlPrefix}/drivers/{0}/jobs?date={1}`,
  MY_LEGS: `${urlPrefix}/drivers/{0}/legs?date={1}`,
  NEW_CUSTOMER: `${urlPrefix}/customers`,
  TRANSACTION_GROUP_SETTING: `${urlPrefix}/transaction-groups/{1}`,
  CUSTOMER_ORDERS: `${urlPrefix}/customers/{0}/orders`,
  DELIVERY_WINDOW: `${urlPrefix}/customers/{0}/delivery-windows`,
  SEARCH: `${urlPrefix}/search`,
  ELASTICSEARCH: `${urlPrefix}/dashboard/search`,
  MY_ORDER_ELASTICSEARCH: `${urlPrefix}/locations/search`,
  DRIVER_LIST_ELASTICSEARCH: `${urlPrefix}/dashboard/search`, // url will be updated after backend is finished
  SCHEMAS: `${urlPrefix}/schemas/{0}/{1}`,
  CUSTOMER_DRIVERS: `${urlPrefix}/customers/{0}/drivers`,
  EXPORT_CUSTOMER_DRIVERS: `${urlPrefix}/customers/{0}/drivers`,
  CUSTOMER_DRIVER_DETAIL: `${urlPrefix}/customers/{0}/identities/{1}/drivers/{2}`,
  DRIVER_LIVE_ROUTES: `${urlPrefix}/drivers/{0}/live-routes`,
  NOTIFICATIONS: `${urlPrefix}/users/{0}/notifications`,
  ROUTE_OPTIMIZE_SETTINGS: `${urlPrefix}/customers/{0}/routes`,
  STATUSES: `${urlPrefix}/dashboard/types`,
  GROUPING_LOCATIONS_ERRORS: `${urlPrefix}/customers/{0}/location/errors`,
  ORDER_WITH_ERRORS: `${urlPrefix}/grouping-location-error`,
  VEHICLES: `${urlPrefix}/vehicles`,
  CUSTOMER_SETTINGS: `${urlPrefix}/customers/{0}/settings`,
  API_V3: {
    BATCH_FILE_UPLOAD: `${laravelUrlPrefix}/${version}/customer/grouping-batch`,
    GROUPING_LOCATIONS: `${laravelUrlPrefix}/${version}/customer/grouping-location`,
    GROUPING_BATCH_PROGRESSION: `${laravelUrlPrefix}/${version}/customer/grouping-batch/show-recent-pending`,
    PICKUP_GROUP: `${laravelUrlPrefix}/${version}/customer/pickup-group`,
    DRIVER_LISTING: `${laravelUrlPrefix}/${version}/customer/driver`,
    JOB: `${urlPrefix}/customers/job/{0}`,
    RECOMMENDED_JOB: `${urlPrefix}/customers/job/{0}`,
    ROUTE: `${urlPrefix}/customers/job/{0}`,
    ROUTE_LOCATION: `${urlPrefix}/customers/route/{0}/route-location`,
  },
};

export default endpoints;
