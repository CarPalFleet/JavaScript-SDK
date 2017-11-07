const urlPrefix = 'https://b2gp6sn1o4.execute-api.ap-southeast-1.amazonaws.com/staging';

const endpoints = {
    LANGUAGES: `${urlPrefix}/languages`,
    IDENTITIES: `${urlPrefix}/identities`,
    COUNTRIES: `${urlPrefix}/countries`,
    ACCOUNTS: `${urlPrefix}/drivers`,
    OAUTH: `${urlPrefix}/authentication`,
    PASSWORD_RESET: `${urlPrefix}/users/password/reset`,
    MY_JOBS: `${urlPrefix}/drivers/{0}/jobs?date={1}`,
    MY_LEGS: `${urlPrefix}/drivers/{0}/legs?date={1}`,
    NEW_CUSTOMER:  `${urlPrefix}/customers`,
    WHITE_LABEL:  `${urlPrefix}/transaction-groups/{1}`,
}

export default endpoints;
