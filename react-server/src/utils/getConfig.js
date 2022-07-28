const { existsSync, readFileSync } = require('fs')
const stripJsonComments = require('strip-json-comments')
const { isPlainObject } = require('is-plain-object')
const parseJSON = require('parse-json-pretty')
const getPaths = require('./paths')

function merge(oldObj, newObj) {
  for (const key in newObj) {
    if (Array.isArray(newObj[key]) && Array.isArray(oldObj[key])) {
      oldObj[key] = oldObj[key].concat(newObj[key])
    } else if (isPlainObject(newObj[key]) && isPlainObject(oldObj[key])) {
      oldObj[key] = Object.assign(oldObj[key], newObj[key])
    } else {
      oldObj[key] = newObj[key]
    }
  }
}

function getConfig(configFile, paths) {
  const rcConfig = paths.resolveApp(configFile)
  const jsConfig = paths.resolveApp(`${configFile}.js`)

  if (existsSync(rcConfig)) {
    return parseJSON(stripJsonComments(readFileSync(rcConfig, 'utf-8')), './serverrc')
  } else if (existsSync(jsConfig)) {
    return require(jsConfig) // eslint-disable-line
  } else {
    return {}
  }
}

function replaceNpmVariables(value, pkg) {
  if (typeof value === 'string') {
    return value.replace('$npm_package_name', pkg.name).replace('$npm_package_version', pkg.version)
  } else {
    return value
  }
}

function realGetConfig(configFile, env, pkg = {}, paths) {
  env = env || 'development'
  const config = getConfig(configFile, paths)
  if (config.env) {
    if (config.env[env]) merge(config, config.env[env])
    delete config.env
  }

  return Object.keys(config).reduce((memo, key) => {
    memo[key] = replaceNpmVariables(config[key], pkg)
    return memo
  }, {})
}

module.exports = function (env, cwd) {
  env = env || process.env.NODE_ENV || 'development'
  const paths = getPaths()
  const pkg = JSON.parse(readFileSync(paths.appPackageJson, 'utf-8'))
  return realGetConfig('.serverrc', env, pkg, paths)
}
