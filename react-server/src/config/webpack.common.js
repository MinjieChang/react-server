const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const getPaths = require('../utils/paths')

const paths = getPaths()

const checkTs = (config) => {
  if (config.typescript && !fs.existsSync(paths.appTsConfig)) {
    fs.writeFileSync(
      paths.appDirectory + '/tsconfig.json',
      fs.readFileSync(path.resolve(__dirname, '../../template/tsconfig.json'), 'utf-8')
    )
  }
}

module.exports = (config) => {
  const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: paths.resolveApp(config.html),
    filename: 'index.html',
    inject: 'body',
  })

  const MiniCssExtractPluginConfig = new MiniCssExtractPlugin({
    filename: process.env.NODE_ENV === 'development' ? '[name].css' : '[name].[fullhash].css',
  })

  const ForkTsCheckerWebpackPluginConfig = new ForkTsCheckerWebpackPlugin()

  checkTs(config)

  return {
    entry: paths.resolveApp(config.entry),
    output: {
      path: paths.resolveApp(config.outputPath || paths.appBuild),
      filename: '[name].[fullhash].js',
      chunkFilename: '[name].[chunkhash].js',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /(node_modules)/,
          use: {
            loader: require.resolve('babel-loader'),
            options: {
              presets: [require.resolve('@babel/preset-env'), require.resolve('@babel/preset-react')].concat(
                config.typescript ? require.resolve('@babel/preset-typescript') : []
              ),
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: require.resolve('css-loader'),
              options: {
                modules: !!config.cssModules,
              },
            },
          ],
        },
        {
          test: /\.less$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: require.resolve('css-loader'),
              options: {
                modules: !!config.cssModules,
              },
            },
            {
              loader: require.resolve('less-loader'),
              options: {
                lessOptions: {
                  javascriptEnabled: true,
                },
              },
            },
          ],
        },
        {
          test: /\.(jpe?g|png|svg|gif)/i,
          type: 'asset',
          generator: {
            filename: 'img/[hash][ext][query]',
          },
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024, // 限制于 8kb
            },
          },
        },
        {
          test: /\.(ttf|eot|woff2)/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name][hash][ext]',
          },
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '...'],
      alias: {
        '@': paths.appSrc,
        _root: paths.appDirectory,
      },
    },
    plugins: [HTMLWebpackPluginConfig, MiniCssExtractPluginConfig].concat(
      config.typescript ? ForkTsCheckerWebpackPluginConfig : []
    ),
  }
}
