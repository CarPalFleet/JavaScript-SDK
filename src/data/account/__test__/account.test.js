// REVIEW I'm not sure those eslint disable are useful
import {
  resetPasswordRequestAsync,
  resetPasswordAsync,
  getDriverJobsAsync, // eslint-disable-line no-use-before-define
  getDriverLegsAsync, // eslint-disable-line no-use-before-define
  validateResetPasswordTokenAsync,
} from '../Account';
import {getTokenAsync} from '../Auth';
import CONFIG from './Config';

// REVIEW try staying consistent using it or test
// REVIEW if using test there is no need to write test as the first word
// REVIEW a better naming (and I am sure you can find better =D) here could be test('for a succeful request when resetting a password')

test('Test for reset password request', async () => {
  const response = resetPasswordRequestAsync(CONFIG.email);
  const result = await response;
  expect(result).toBe(true);
});

test('Test for reset password', async () => {
  const response = resetPasswordAsync(
    'af56e63633f278c59c15e5ebc55427ccf9d79da3698362d3c59c29bf6a257879',
    CONFIG.email,
    'carpaldemo',
    'carpaldemo'
  );
  const result = await response;
  expect(result).toBe(true);
});

test('Test for reset password token validation', async () => {
  const result = validateResetPasswordTokenAsync(makeid(32));
  await expect(result).rejects.toHaveProperty('statusCode', 404);
});

test('Test for getting my jobs.', async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  const result = getTokenAsync(
    CONFIG.demail,
    CONFIG.dpassword,
    CONFIG.clientId,
    CONFIG.token
  );
  const token = await result;
  const response = getDriverJobsAsync(1, token.accessToken, CONFIG.date);
  const myJobs = await response;
  // REVIEW (NP) you could use Array.isArray() https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/isArray
  // REVIEW you could also use a snapshot here because testing if the response is an array doesn't prove the result is the expected behavior
  expect(myJobs instanceof Array).toBe(true);
});

test('Test for getting my legs.', async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  const result = getTokenAsync(
    CONFIG.demail,
    CONFIG.dpassword,
    CONFIG.clientId,
    CONFIG.token
  );
  const token = await result;
  const response = getDriverLegsAsync(1, token.accessToken, CONFIG.date);
  const myLegs = await response;
  // REVIEW same as previously
  expect(myLegs instanceof Array).toBe(true);
});

/**
 * Generate an email address
 * @param {int} size
 * @return {string} text
 */
function makeid(size) {
  let text = '';
  let possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < size; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}
