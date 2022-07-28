#!/usr/bin/env node
"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const Webpack = require('webpack');

const chokidar = require('chokidar');

const chalk = require('chalk');

const WebpackDevServer = require('webpack-dev-server');

const openBrowser = require('react-dev-utils/openBrowser');

const inquirer = require('inquirer');

const clearConsole = require('react-dev-utils/clearConsole');

const getPaths = require('./utils/paths');

const getConfig = require('./utils/getConfig');

const _require = require('./utils/util'),
      checkRcFile = _require.checkRcFile,
      writeRcFile = _require.writeRcFile;

const paths = getPaths();
const isInteractive = process.stdout.isTTY;

const clearConsoleWrapped = () => {
  if (isInteractive) {
    clearConsole();
  }
};

const setupProgressPlugin = compiler => {
  const _ref = compiler.webpack || require('webpack'),
        ProgressPlugin = _ref.ProgressPlugin;

  const progressPlugin = Boolean(compiler.options.plugins.find(plugin => plugin instanceof ProgressPlugin));

  if (!progressPlugin) {
    new ProgressPlugin({
      profile: false
    }).apply(compiler);
  }
};

const initCompiler = webpackConfig => {
  const compiler = Webpack(webpackConfig);
  setupProgressPlugin(compiler);
  return compiler;
};

const initServer = webpackConfig => {
  const compiler = initCompiler(webpackConfig);

  const devServerOptions = _objectSpread(_objectSpread({}, webpackConfig.devServer), {}, {
    open: false
  });

  const server = new WebpackDevServer(devServerOptions, compiler);
  return server;
};

const setupWatch = server => {
  const files = [paths.resolveApp('.serverrc'), paths.resolveApp('.serverrc.js'), paths.resolveApp('webpack.config.js')];
  const watcher = chokidar.watch(files, {
    ignored: /node_modules/,
    persistent: true
  });
  watcher.on('change', path => {
    console.log(chalk.green(`File ${path.replace(paths.appDirectory, '.')} changed, try to restart server`));
    watcher.close();
    server.close();
    process.send('RESTART');
  });
};

const realRun = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* () {
    const rcConfig = getConfig();

    const webpackConfig = require('./config/webpack.dev')(rcConfig);

    const server = initServer(webpackConfig);
    clearConsoleWrapped();
    console.log('Starting server...');
    yield server.start();

    if (openBrowser('http://localhost:' + webpackConfig.devServer.port)) {// console.log('The browser tab has been opened!')
    } else {
      openBrowser('http://localhost:' + webpackConfig.devServer.port);
    }

    setupWatch(server);
  });

  return function realRun() {
    return _ref2.apply(this, arguments);
  };
}();

const runDev = () => {
  if (!checkRcFile()) {
    const questions = [{
      type: 'confirm',
      name: 'createRc',
      message: chalk.yellow(`.serverrc file is not found. \n\nWould you like to create .serverrc file and run the app ?`),
      default: true
    }];

    if (isInteractive) {
      clearConsoleWrapped();
      inquirer.prompt(questions, true).then(answers => {
        if (answers.createRc) {
          writeRcFile();
          realRun();
        }
      });
    } else {
      console.log(chalk.red(`.serverrc file is not found.`));
    }
  } else {
    realRun();
  }
};

runDev();