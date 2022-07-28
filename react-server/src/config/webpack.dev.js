const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const apiMocker = require('@bike/api-mocker')

const getPaths = require('../utils/paths')

const paths = getPaths()

const DEFAULT_PORT = process.env.PORT || '8888'

const getPort = (config) => {
  return config.port || DEFAULT_PORT
}

const getProxy = (config) => {
  const port = getPort(config)
  const proxy = {
    '/api': {
      // 使用ip访问指向该target
      target: 'http://api.bike.test.sankuai.com',
      // target: 'http://api.bike.st.sankuai.com',
      // target: 'http://11.1.90.244:8086',
      // pathRewrite: { '^/api/galaxy': '' },
      // pathRewrite: { '^/api': '/api' },
      changeOrigin: true,
      router: {
        ['a.local.sankuai.com:' + port]: 'http://testa-sl-api.bike.test.sankuai.com',
        ['b.local.sankuai.com:' + port]: 'http://testb-sl-api.bike.test.sankuai.com',
        ['c.local.sankuai.com:' + port]: 'http://testc-sl-api.bike.test.sankuai.com',
        ['d.local.sankuai.com:' + port]: 'http://testd-sl-api.bike.test.sankuai.com',
        ['e.local.sankuai.com:' + port]: 'http://teste-sl-api.bike.test.sankuai.com',
        ['st.local.sankuai.com:' + port]: 'http://api.bike.st.sankuai.com',
      },
    },
  }
  return proxy
}

module.exports = (config) => {
  const common = require('./webpack.common.js')(config)

  return merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    cache: {
      type: 'filesystem',
    },
    devServer: {
      port: getPort(config),
      proxy: merge(getProxy(config), config.proxy ? config.proxy : {}),
      onBeforeSetupMiddleware(devServer) {
        apiMocker(devServer.app, {
          watch: config.mock?.watch || '/gov/*',
          api: paths.resolveApp(config.mock?.api || './src/utils/api.js'),
        })
      },
      historyApiFallback: true,
      allowedHosts: 'all',
      hot: true,
      watchFiles: {
        paths: [paths.appSrc + '/*'],
        options: {
          usePolling: false,
        },
      },
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
  })
}
