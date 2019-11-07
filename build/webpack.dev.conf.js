'use strict'
const merge = require('webpack-merge')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = require('./webpack.base.conf.js')
config.mode('development')
// devtool
config.devtool('cheap-module-eval-source-map')

config.module.rule('sass')
.use('style-loader')
.loader('style-loader').before('css').end()

config.module.rule('less')
.use('style-loader')
.loader('style-loader').before('css').end()

config.module.rule('css')
.use('style-loader')
.loader('style-loader').before('css').end()

// plugin
config.plugin('htmlwebpackplugin')
    .use(HtmlWebpackPlugin, [
    Object.assign(
        {},
        {
          inject: true,
          template: path.resolve(__dirname, '../index.html')
        }
    )
    ]).end()
  .plugin('HotModuleReplacementPlugin')
  .use(webpack.HotModuleReplacementPlugin).end()

config.performance.hints(false)

// devServer
// config.devServer.contentBase('../dist')
//   .port(8080)
//   .inline(true)
//   .historyApiFallback(true)
//   .hot(true)
//   .compress(true)

const options = {
  contentBase: '../dist',
  hot: true,
  host: 'localhost',
  historyApiFallback: true,
  compress: true
}

const result = merge({}, config.toConfig())
webpackDevServer.addDevServerEntrypoints(result, options)
const compiler = webpack(result)
const server = new webpackDevServer(compiler, options)
server.listen(5000, 'localhost', () => {
  console.log('dev server listening on port 5000');
})

module.exports = merge({}, config.toConfig())