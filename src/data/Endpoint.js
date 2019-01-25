const urlPrefix =
  'https://b2gp6sn1o4.execute-api.ap-southeast-1.amazonaws.com/staging';
const laravelUrlPrefix = 'https://api-test.carpal.me';
const version = 'v3';

const endpoints = {
  LANGUAGES: `${urlPrefix}/languages`,
  IDENTITIES: `${urlPrefix}/identities`,
  OAUTH: `${urlPrefix}/authentication`,
  NEW_CUSTOMER: `${urlPrefix}/customers`,
  TRANSACTION_GROUP_SETTING: `${urlPrefix}/transaction-groups/{1}`,
  CUSTOMER_JOBS: `${urlPrefix}/customers/{0}/jobs`,
  ELASTIC_SEARCH: `${urlPrefix}/dashboard/search`,
  GENERAL_SEARCH: `${urlPrefix}/search`,
  DRIVER_LIST_ELASTIC_SEARCH: `${urlPrefix}/dashboard/search`, // url will be updated after backend is finished
  CUSTOMER_DRIVERS: `${urlPrefix}/customers/{0}/drivers`,
  DRIVER_LIVE_ROUTES: `${urlPrefix}/drivers/{0}/live-routes`,
  NOTIFICATIONS: `${urlPrefix}/users/{0}/notifications`,
  ORDER_ERRORS: `${urlPrefix}/customers/{0}/order/errors`,
  ORDER_WITH_ERRORS: `${urlPrefix}/order-error`,
  BATCH_ORDER_WITH_ERRORS: `${urlPrefix}/order-errors`,
  VEHICLES: `${urlPrefix}/vehicles`,
  USER_SETTINGS: `${urlPrefix}/users/{0}/settings`,
  CUSTOMER_SETTINGS: `${urlPrefix}/settings`,
  CUSTOMER_SETTINGS_SHOW: `${urlPrefix}/settings/{0}`,
  API_V3: {
    BATCH_FILE_UPLOAD: `${laravelUrlPrefix}/${version}/customer/grouping-batch`,
    ORDER: `${laravelUrlPrefix}/${version}/customer/order`,
    ORDER_COUNT: `${laravelUrlPrefix}/${version}/customer/order/total`,
    GROUPING_BATCH_TEMPLATE: `${laravelUrlPrefix}/${version}/customer/grouping-batch/template`,
    GROUPING_BATCH_PROGRESSION: `${laravelUrlPrefix}/${version}/customer/grouping-batch/show-recent-pending`,
    PICKUP_GROUP: `${laravelUrlPrefix}/${version}/customer/pickup-group`,
    DRIVER: `${laravelUrlPrefix}/${version}/customer/driver`,
    DRIVER_ROUTE: `${laravelUrlPrefix}/${version}/customer/driver-route`,
    JOB: `${laravelUrlPrefix}/${version}/customer/job/{0}`,
    JOB_FROM_ROUTE: `${laravelUrlPrefix}/${version}/customer/job/private`,
    JOB_TIMELINE: `${laravelUrlPrefix}/${version}/customer/job/{0}/timeline/{1}`,
    JOB_DRIVER_LOCATIONS: `${laravelUrlPrefix}/${version}/customer/job/{0}/driver/location`,
    ROUTE: `${laravelUrlPrefix}/${version}/customer/route/{0}`,
    STORE_ROUTE: `${laravelUrlPrefix}/${version}/customer/route`,
    OPTIMIZE_ROUTE: `${laravelUrlPrefix}/${version}/customer/route/optimization`,
    ROUTE_LOCATION: `${laravelUrlPrefix}/${version}/customer/route/{0}/route-location`,
    DRIVER_SCHEDULE: `${laravelUrlPrefix}/${version}/customer/driver-schedule/{0}`,
    DRIVER_UPDATE: `${laravelUrlPrefix}/${version}/customer/driver/{0}`,
    EXPORT_DRIVER_LIST: `${laravelUrlPrefix}/${version}/customer/driverlist/export`, // url will be updated after backend is finished
    EXPORT_ROUTE: `${laravelUrlPrefix}/${version}/customer/report/routes-export`,
    CUSTOMER_DRIVER: `${laravelUrlPrefix}/${version}/customer/driver`,
    REQUEST_PASSWORD_RESET: `${laravelUrlPrefix}/${version}/user/password/email`,
    VALIDATE_PASSWORD_RESET_TOKEN: `${laravelUrlPrefix}/${version}/user/password/{token}`,
    LATEST_BACKGROUND_JOB: `${laravelUrlPrefix}/${version}/customer/background-job/latest/{0}`,
    COUNTRIES: `${laravelUrlPrefix}/${version}/countries/{0}`,
    ORDER_ERRORS: `${laravelUrlPrefix}/${version}/customer/order/validation-error`,
    DEPOTS: `${laravelUrlPrefix}/${version}/customer/depot`,
  },
};

export default endpoints;
