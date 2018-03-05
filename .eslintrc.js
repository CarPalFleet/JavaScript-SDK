'use strict';

const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  extends: ['eslint:recommended', 'plugin:jest/recommended', 'google'],
  plugins: ['jest'],
  env: {
    es6: true,
    'jest/globals': true,
  },
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      templateStrings: true,
    },
  },
  rules: {
    'no-useless-escape': OFF, // For RegExp and String Escape
    'quote-props': OFF, // Handled by Prettier
    'max-len': OFF, // Handled by Prettier
  },
};
