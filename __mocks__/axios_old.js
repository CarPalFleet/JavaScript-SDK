import isEqual from 'lodash.isequal';

import {
  getTokenAsyncCorrectParameters,
  getTokenAsyncMockForRightParameters,
  getTokenAsyncParametersWithWrongPassword,
} from '../src/data/account/__test__/stubs/Auth.js';

const axios = jest.fn();

axios.mockImplementation((parameters) => {
  if (isEqual(parameters, getTokenAsyncCorrectParameters)) {
    return Promise.resolve(getTokenAsyncMockForRightParameters);
  } else if (isEqual(parameters, getTokenAsyncParametersWithWrongPassword)) {
    return Promise.reject();
  } else {
    return Promise.resolve(
      'Problem with axios mock, please check your parameters'
    );
  }
});

export default axios;
