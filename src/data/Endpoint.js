const urlPrefix = 'https://b2gp6sn1o4.execute-api.ap-southeast-1.amazonaws.com/staging';

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
    NEW_CUSTOMER:  `${urlPrefix}/customers`,
    TRANSACTION_GROUP_SETTING:  `${urlPrefix}/transaction-groups/{1}`,
    ORDERS_WITH_FILTERS: `${urlPrefix}/customers/{0}/orders?{1}`,
    ORDER_DETAIL: `${urlPrefix}/customers/{0}/orders/{1}`,
    DELIVERY_WINDOW: `${urlPrefix}/customers/{0}/delivery-windows`,
    CUSTOMER_DRIVERS: `${urlPrefix}/customers/{0}/drivers`,
    SEARCH: `${urlPrefix}/search`,
    NOTIFICATIONS: `${urlPrefix}/users/{0}/notifications`,
    SCHEMAS: `${urlPrefix}/schemas/{0}/{1}`,
    DRIVER_LIVE_ROUTES: `${urlPrefix}/drivers/{0}/live-routes`,
}

export default endpoints;
