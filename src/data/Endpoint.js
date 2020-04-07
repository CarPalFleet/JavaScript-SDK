const urlPrefix =
  'https://b2gp6sn1o4.execute-api.ap-southeast-1.amazonaws.com/staging';
const laravelUrlPrefix = 'https://api-staging.carpalfleet.com';
const version = 'v1';

const endpoints = {
  // LANGUAGES: `${urlPrefix}/languages`,
  OAUTH: `${urlPrefix}/authentication`,
  CUSTOMER_JOBS: `${urlPrefix}/customers/{0}/jobs`,
  ELASTIC_SEARCH: `${urlPrefix}/dashboard/search`,
  GENERAL_SEARCH: `${urlPrefix}/search`,
  CUSTOMER_DRIVERS: `${urlPrefix}/customers/{0}/drivers`,
  DRIVER_LIVE_ROUTES: `${urlPrefix}/drivers/{0}/live-routes`,
  NOTIFICATIONS: `${urlPrefix}/users/{0}/notifications`,
  // USER_SETTINGS: `${urlPrefix}/users/{0}/settings`,
  API_V3: {
    DISPATCH_MODE: `${laravelUrlPrefix}/${version}/dispatch-mode`,
    DISPATCH_TYPE: `${laravelUrlPrefix}/${version}/dispatch-type`,
    NEW_CUSTOMER: `${laravelUrlPrefix}/${version}/customer`,
    BATCH_FILE_UPLOAD: `${laravelUrlPrefix}/${version}/customer/grouping-batch`,
    ORDER: `${laravelUrlPrefix}/${version}/customer/order`,
    ORDER_CREATE: `${laravelUrlPrefix}/${version}/customer/order/sync`,
    ORDER_ID: `${laravelUrlPrefix}/${version}/customer/order/{0}`,
    ORDER_SEARCH: `${laravelUrlPrefix}/${version}/customer/order/search`,
    ORDER_STATUS_REASON: `${laravelUrlPrefix}/${version}/customer/order-status-reason`,
    ORDER_COUNT: `${laravelUrlPrefix}/${version}/customer/order/total`,
    GROUPING_BATCH_TEMPLATE: `${laravelUrlPrefix}/${version}/customer/grouping-batch/template`,
    GROUPING_BATCH_PROGRESSION: `${laravelUrlPrefix}/${version}/customer/grouping-batch/show-recent-pending`,
    PICKUP_GROUP: `${laravelUrlPrefix}/${version}/customer/pickup-group`,
    DRIVER: `${laravelUrlPrefix}/${version}/customer/driver`,
    DRIVER_ROUTE: `${laravelUrlPrefix}/${version}/customer/driver-route`,
    DRIVER_PAYMENT: `${laravelUrlPrefix}/${version}/customer/driver-payment-batch`,
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
    CUSTOMER_SETTINGS_SHOW: `${laravelUrlPrefix}/${version}/customer/setting/first`,
    CUSTOMER_SETTINGS: `${laravelUrlPrefix}/${version}/customer/setting/{0}`,
    TRANSACTION_GROUP_SETTING: `${laravelUrlPrefix}/${version}/transaction-groups/{1}`,
    IDENTITIES: `${laravelUrlPrefix}/${version}/identities`,
    IDENTITY: `${laravelUrlPrefix}/${version}/identities/{0}`,
    VEHICLE_TYPE: `${laravelUrlPrefix}/${version}/vehicle-type`,
    NOTIFICATIONS: `${laravelUrlPrefix}/${version}/user/notification`,
    NOTIFICATIONS_COUNT: `${laravelUrlPrefix}/${version}/user/notification/count`,
    DISPATCH_3PL: `${laravelUrlPrefix}/${version}/customer/order/dispatch-3pl`,
    ASSIGN_TO_FREELANCER: `${laravelUrlPrefix}/${version}/customer/job/driver/{0}`,
    BROADCAST_TO_FREELANCERS: `${laravelUrlPrefix}/${version}/customer/order/broadcast`,
    DRIVER_SEARCH: `${laravelUrlPrefix}/${version}/customer/driver/search`,
    USER: `${laravelUrlPrefix}/${version}/user`,
    USER_SETTINGS: `${laravelUrlPrefix}/${version}/user/setting`,
    USER_SETTING_MY_ORDERS_COLUMN: `${laravelUrlPrefix}/${version}/user/setting/my_orders_columns`,
    SERVICE_PROVIDER: `${laravelUrlPrefix}/${version}/customer/service-provider/{0}/service`,
    SERVICE_PROVIDER_DRIVER_SERVICES: `${laravelUrlPrefix}/${version}/service-provider/driver-service`,
    SERVICE_PROVIDER_CUSTOMER: `${laravelUrlPrefix}/${version}/service-provider/customer/{0}`,
    SERVICE_PROVIDER_CUSTOMER_SEARCH: `${laravelUrlPrefix}/${version}/service-provider/customer/search`,
    SERVICE_PROVIDER_ORDER: `${laravelUrlPrefix}/${version}/service-provider/order`,
    SERVICE_PROVIDER_QUOTE: `${laravelUrlPrefix}/${version}/service-provider/quote`,
    LANGUAGES: `${laravelUrlPrefix}/${version}/languages`,
    ORDER_STATUS: `${laravelUrlPrefix}/${version}/order-status`,
    EXPORT_ORDER_ANALYTICS: `${laravelUrlPrefix}/${version}/customer/report/order-analytics`,
    REPORT_FIELDS: `${laravelUrlPrefix}/${version}/report/{0}/fields`,
  },
};

export default endpoints;
