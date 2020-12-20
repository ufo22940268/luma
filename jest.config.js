/**
 * Created by cc on 2020/12/20.
 */
"use strict";

const {defaults} = require('jest-config');
module.exports = {
  moduleFileExtensions: [...defaults.moduleFileExtensions],
  setupFiles: ['./jestSetup.js']
};
