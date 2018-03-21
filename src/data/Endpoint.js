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
  ELASTIC_SEARCH: `${urlPrefix}/dashboard/search`,
  GENERAL_SEARCH: `${urlPrefix}/search`,
  DRIVER_LIST_ELASTIC_SEARCH: `${urlPrefix}/dashboard/search`, // url will be updated after backend is finished
  SCHEMAS: `${urlPrefix}/schemas/{0}/{1}`,
  CUSTOMER_DRIVERS: `${urlPrefix}/customers/{0}/drivers`,
  CUSTOMER_DRIVER_DETAIL: `${urlPrefix}/customers/{0}/identities/{1}/drivers/{2}`,
  DRIVER_LIVE_ROUTES: `${urlPrefix}/drivers/{0}/live-routes`,
  NOTIFICATIONS: `${urlPrefix}/users/{0}/notifications`,
  ROUTE_OPTIMIZE_SETTINGS: `${urlPrefix}/customers/{0}/routes`,
  STATUSES: `${urlPrefix}/dashboard/types`,
  GROUPING_LOCATIONS_ERRORS: `${urlPrefix}/customers/{0}/location/errors`,
  ORDER_WITH_ERRORS: `${urlPrefix}/grouping-location-error`,
  BATCH_ORDER_WITH_ERRORS: `${urlPrefix}/grouping-location-errors`,
  VEHICLES: `${urlPrefix}/vehicles`,
  CUSTOMER_SETTINGS: `${urlPrefix}/customers/{0}/settings`,
  API_V3: {
    BATCH_FILE_UPLOAD: `${laravelUrlPrefix}/${version}/customer/grouping-batch`,
    GROUPING_LOCATIONS: `${laravelUrlPrefix}/${version}/customer/grouping-location`,
    GROUPING_BATCH_PROGRESSION: `${laravelUrlPrefix}/${version}/customer/grouping-batch/show-recent-pending`,
    PICKUP_GROUP: `${laravelUrlPrefix}/${version}/customer/pickup-group`,
    DRIVER: `${laravelUrlPrefix}/${version}/customer/driver`,
    JOB: `${laravelUrlPrefix}/${version}/customers/job/{0}`,
    RECOMMENDED_JOB: `${laravelUrlPrefix}/${version}/customers/job/{0}`,
    ROUTE: `${laravelUrlPrefix}/${version}/customers/route/{0}`,
    OPTIMIZE_ROUTE: `${laravelUrlPrefix}/${version}/customers/route/optimization`,
    ROUTE_LOCATION: `${laravelUrlPrefix}/${version}/customer/route/{0}/route-location`,
    DRIVER_SCHEDULE: `${laravelUrlPrefix}/${version}/customer/driver-schedule/{0}`,
    EXPORT_DRIVER_LIST: `${laravelUrlPrefix}/${version}/customer/driverlist/export`, // url will be updated after backend is finished
    EXPORT_ROUTE: `${laravelUrlPrefix}/${version}/customer/route/export`, // url will be updated after backend is finished
  },
};

export default endpoints;
