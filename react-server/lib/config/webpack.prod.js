"use strict";

const path = require('path');

const _require = require('webpack-merge'),
      merge = _require.merge;

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const getPaths = require('../utils/paths'); // const getConfig = require('../utils/getConfig')


const paths = getPaths(); // const config = getConfig()

module.exports = config => {
  const common = require('./webpack.common.js')(config);

  return merge(common, {
    mode: 'production',
    devtool: 'source-map',
    output: {
      path: paths.resolveApp(config.outputPath) || paths.appBuild,
      filename: '[name].[fullhash].js',
      clean: true,
      // publicPath:
      //   'https://s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:457261e8/',
      publicPath: config.outputPath ? config.outputPath : process.env.PUBLIC_PATH ? process.env.PUBLIC_PATH + '/' : '/'
    },
    optimization: {
      minimizer: [`...`, new CssMinimizerPlugin()]
    }
  });
};