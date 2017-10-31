const urlPrefix = 'https://b2gp6sn1o4.execute-api.ap-southeast-1.amazonaws.com/staging';

export const cid = 2;
export const secret = 'jWu9Qz4L3ha4SRgM5J6oBzAljg6f9zDzs2hIIIUh';

const endpoints = {
    LANGUAGES: `${urlPrefix}/languages`,
    IDENTITIES: `${urlPrefix}/identities`,
    COUNTRIES: `${urlPrefix}/countries`,
    ACCOUNTS: `${urlPrefix}/drivers`,
    OAUTH: `${urlPrefix}/authentication`,
    PASSWORD_RESET: `${urlPrefix}/users/password/reset`,
    MY_JOBS: `${urlPrefix}/drivers/{0}/my-jobs?date={1}`,
}

export default endpoints;