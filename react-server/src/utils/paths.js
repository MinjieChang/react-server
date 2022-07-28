const { resolve } = require('path')
const { realpathSync } = require('fs')

function resolveOwn(relativePath) {
  return resolve(__dirname, relativePath)
}

function getPaths(cwd) {
  cwd = cwd || process.cwd()

  const appDirectory = realpathSync(cwd)

  function resolveApp(relativePath) {
    return resolve(appDirectory, relativePath)
  }

  return {
    appBuild: resolveApp('build'),
    appPublic: resolveApp('public'),
    appPackageJson: resolveApp('package.json'),
    appSrc: resolveApp('src'),
    appRcFile: resolveApp('.serverrc'),
    appTsConfig: resolveApp('tsconfig.json'),
    appNodeModules: resolveApp('node_modules'),
    ownNodeModules: resolveOwn('../../node_modules'),
    appBabelCache: resolveApp('node_modules/.cache/babel-loader'),
    resolveApp,
    appDirectory,
  }
}

module.exports = getPaths
