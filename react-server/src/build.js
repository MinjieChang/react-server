#!/usr/bin/env node

process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const webpack = require('webpack')
const chalk = require('chalk')
const getConfig = require('./utils/getConfig')

const config = getConfig()

const webpackConfig = require('./config/webpack.prod')(config)

console.log(chalk.yellow('Start building...'))

webpack(
  {
    ...webpackConfig,
  },
  (err, stats) => {
    if (err) {
      console.error(err.stack || err)
      if (err.details) {
        console.error(err.details)
      }
      return
    }

    const info = stats.toJson()

    if (stats.hasErrors()) {
      console.error(info.errors)
    }

    if (stats.hasWarnings()) {
      // console.warn(info.warnings)
    }

    // Done processing
    console.log(stats.toString({ chunks: false, colors: true }))
  }
)
