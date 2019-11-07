'use strict'
const merge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const safePostCssParser = require('postcss-safe-parser')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PurifyCSS = require('purifycss-webpack')
const PreloadWebpackPlugin = require('preload-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const glob = require('glob-all')

const config = require('./webpack.base.conf.js')

config.mode('production')

config.module.rule('sass')
.use('mini')
.loader(MiniCssExtractPlugin.loader).options({
  hmr: process.env.NODE_ENV === 'development',
  fallback: {
    loader: require.resolve('style-loader'),
    options: {
      singleton: true
    }
  }
}).before('css').end()

config.module.rule('less')
.use('mini')
.loader(MiniCssExtractPlugin.loader).options({
  hmr: process.env.NODE_ENV === 'development',
  fallback: {
    loader: require.resolve('style-loader'),
    options: {
      singleton: true
    }
  }
}).before('css').end()

config.module.rule('css')
.use('mini')
.loader(MiniCssExtractPlugin.loader).options({
  hmr: process.env.NODE_ENV === 'development',
  fallback: {
    loader: require.resolve('style-loader'),
    options: {
      singleton: true
    }
  }
}).before('css').end()


// plugin
config  
  .plugin('progress')
    .use(webpack.ProgressPlugin).end()
  .plugin('IgnorePlugin')
    .use(webpack.IgnorePlugin, [/^\.\/locale$/, /moment$/]).end()
  .plugin('htmlwebpackplugin')
    .use(HtmlWebpackPlugin, [
      Object.assign(
        {},
        {
          inject: true,
          template: path.resolve(__dirname, '../index.html')
        },
        {
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          }
        }
      )
    ]).end()
  .plugin('PreloadWebpackPlugin')
    .use(PreloadWebpackPlugin, [{
      rel: 'preload',
      as: 'script'
    }]).end()
  .plugin('ScriptExtHtmlWebpackPlugin')
    .use(ScriptExtHtmlWebpackPlugin, [{
      preload: /\.js$/,
      defaultAttribute: 'defer'
    }]).end()
  .plugin('HardSourceWebpackPlugin')
    .use(HardSourceWebpackPlugin).end()
  .plugin('ModuleConcatenationPlugin')
    .use(webpack.optimize.ModuleConcatenationPlugin).end()
  .plugin('HashedModule')
    .use(webpack.HashedModuleIdsPlugin).end()
  .plugin('Compression')
    .use(CompressionPlugin, [{
      algorithm: 'gzip',
      threshold: 10240,
      minRatio: 0.7
    }]).end()
  .plugin('PurifyCSS')
    .use(PurifyCSS, [{
      paths: glob.sync([
        path.resolve(__dirname, '../src/*.js')
      ])
    }]).end()
  .plugin('MiniCssExtractPlugin')
    .use(MiniCssExtractPlugin, [{
      filename: "[name].[contenthash:8].css",
      chunkFilename: "[name].[contenthash:8].css"
    }]).end()
  .plugin('OptimizeCssAssetsPlugin')
    .use(OptimizeCssAssetsPlugin, [{ 
      cssProcessorOptions: { 
        parser: safePostCssParser
      } }]).end()
  .plugin('NamedModulesPlugin')
    .use(webpack.NamedModulesPlugin).end()
  .plugin('clean')
    .use(CleanWebpackPlugin).end()
  .plugin('BundleAnalyzerPlugin')
    .use(BundleAnalyzerPlugin)
    .end()

// devtool
config.devtool('source-map')
config.optimization
    .minimize(true)
    .minimizer('OptimizeCssAssetsPlugin')
    .use(OptimizeCssAssetsPlugin, [{ cssProcessorOptions: { safe: true } }])
    .end()
    .minimizer('TerserPlugin')
    .use(TerserPlugin)
    .end()
    .namedChunks(true)
    .runtimeChunk({name: 'runtime'})
    .splitChunks({
    minSize: 3000,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    name: false,
    cacheGroups: {
        vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendor',
        chunks: 'initial',
        reuseExistingChunk: true
        }
    }
    })
    .removeEmptyChunks(true)

const result = merge({}, config.toConfig())
const compiler = webpack(result);
compiler.run((err, stats) => {
  console.log('Successful')
});
module.exports = merge({}, config.toConfig())