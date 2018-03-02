'use strict';

const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  extends: ['eslint:recommended', 'plugin:jest/recommended', 'google'],
  plugins: ['jest'],
  env: {
    'jest/globals': true,
  },
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
  },
};
