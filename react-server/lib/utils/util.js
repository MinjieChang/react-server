"use strict";

const fs = require('fs');

const path = require('path');

const getPaths = require('./paths');

const paths = getPaths();

exports.checkRcFile = () => {
  return fs.existsSync(paths.appRcFile);
};

exports.writeRcFile = () => {
  fs.writeFileSync(paths.appDirectory + '/.serverrc', fs.readFileSync(path.resolve(__dirname, '../../template/.serverrc'), 'utf-8'));
};