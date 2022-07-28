#!/usr/bin/env node

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const Webpack = require('webpack')
const chokidar = require('chokidar')
const chalk = require('chalk')
const WebpackDevServer = require('webpack-dev-server')
const openBrowser = require('react-dev-utils/openBrowser')
const inquirer = require('inquirer')
const clearConsole = require('react-dev-utils/clearConsole')

const getPaths = require('./utils/paths')
const getConfig = require('./utils/getConfig')
const { checkRcFile, writeRcFile } = require('./utils/util')

const paths = getPaths()
const isInteractive = process.stdout.isTTY

const clearConsoleWrapped = () => {
  if (isInteractive) {
    clearConsole()
  }
}

const setupProgressPlugin = (compiler) => {
  const { ProgressPlugin } = compiler.webpack || require('webpack')
  const progressPlugin = Boolean(compiler.options.plugins.find((plugin) => plugin instanceof ProgressPlugin))
  if (!progressPlugin) {
    new ProgressPlugin({ profile: false }).apply(compiler)
  }
}

const initCompiler = (webpackConfig) => {
  const compiler = Webpack(webpackConfig)
  setupProgressPlugin(compiler)
  return compiler
}

const initServer = (webpackConfig) => {
  const compiler = initCompiler(webpackConfig)
  const devServerOptions = { ...webpackConfig.devServer, open: false }
  const server = new WebpackDevServer(devServerOptions, compiler)
  return server
}

const setupWatch = (server) => {
  const files = [paths.resolveApp('.serverrc'), paths.resolveApp('.serverrc.js'), paths.resolveApp('webpack.config.js')]
  const watcher = chokidar.watch(files, {
    ignored: /node_modules/,
    persistent: true,
  })
  watcher.on('change', (path) => {
    console.log(chalk.green(`File ${path.replace(paths.appDirectory, '.')} changed, try to restart server`))
    watcher.close()
    server.close()
    process.send('RESTART')
  })
}

const realRun = async () => {
  const rcConfig = getConfig()
  const webpackConfig = require('./config/webpack.dev')(rcConfig)
  const server = initServer(webpackConfig)

  clearConsoleWrapped()

  console.log('Starting server...')

  await server.start()

  if (openBrowser('http://localhost:' + webpackConfig.devServer.port)) {
    // console.log('The browser tab has been opened!')
  } else {
    openBrowser('http://localhost:' + webpackConfig.devServer.port)
  }
  setupWatch(server)
}

const runDev = () => {
  if (!checkRcFile()) {
    const questions = [
      {
        type: 'confirm',
        name: 'createRc',
        message: chalk.yellow(
          `.serverrc file is not found. \n\nWould you like to create .serverrc file and run the app ?`
        ),
        default: true,
      },
    ]

    if (isInteractive) {
      clearConsoleWrapped()
      inquirer.prompt(questions, true).then((answers) => {
        if (answers.createRc) {
          writeRcFile()
          realRun()
        }
      })
    } else {
      console.log(chalk.red(`.serverrc file is not found.`))
    }
  } else {
    realRun()
  }
}

runDev()
