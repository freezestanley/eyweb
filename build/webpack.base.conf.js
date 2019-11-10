'use strict'
const Config = require('webpack-chain')
const path = require('path')
const config = new Config()
const webpack = require('webpack')
const cwd = process.cwd()
// entry output 
config
  .entry('index')
    .add(path.resolve(cwd, './src/index.js'))
    .end()
  .output
    .path(path.resolve(cwd, './dist'))
    .filename('[name].[hash:8].js')
    // .publicPath()
    .library('other')
    .libraryTarget('umd')



// extensions
const fileType = ['.ts', '.tsx', '.js', '.json', '.vue', '.jsx']
  fileType.map((ele) => {
    config.resolve.extensions.add(ele)
  })
config.resolve.extensions.end()

// alias
config.resolve.alias.set('react-native','react-native-web')

// externals
config.externals({
//   'react': 'react',
//   'react-dom': 'ReactDOM',
//   'react-router-dom': 'reactRouterDom',
//   'vue': 'vue',
//   'vue-router': 'vueRouter',
})

// module
config.module.rule('compile')
  .exclude.add(/(node_modules|bower_components)/)
  .end()
  .include.add(path.resolve(cwd, './src')).end()
  .test(/\.js|jsx|mjs$/)
  .use('babel')
  .loader('babel-loader').options({
    "presets": ["@babel/preset-env", "@babel/preset-react"],
    "plugins": [
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-object-rest-spread",
      "@babel/plugin-transform-react-jsx-self"
    ]
  }).end()
  .use('eslint-loader')
  .loader('eslint-loader')
  .options({
    formatter: require('eslint-friendly-formatter')
  }).end()


config.module.rule('eslint')
  .exclude.add(/(node_modules|bower_components)/).end()
  .include.add(path.resolve(cwd, './src')).end()
  .test(/\.js$/)
  .enforce('pre')
  .use('eslint-loader')
  .loader('eslint-loader')
  .options({
    formatter: require('eslint-friendly-formatter')
  }).end()


config.module.rule('ts')
  .exclude.add(/(node_modules|bower_components)/)
  .end()
  .include.add(path.resolve(cwd, './src')).end()
  .test(/\.tsx?$/)
  .use('ts-loader')
  .loader('ts-loader').options({
    happyPackMode: true
  }).end()


config.module.rule('less')
  .test(/\.less$/)
  .use('css')
  .loader('css-loader')
  .end()
  .use('postcss')
  .loader('postcss-loader')
  .options({
    ident: 'postcss',
    plugins: (loader) => [
      require('postcss-preset-env')(),
      require('postcss-normalize')({ forceImport: true }),
      require('postcss-cssnext')(),
      require('postcss-import')({ root: loader.resourcePath }),
      require('postcss-selector-namespace')({ selfSelector: ':namespace', namespace: `` })
    ]})
  .end()
  .use('less')
  .loader('less-loader')
  .end()

config.module.rule('css')
  .test(/\.css$/i)
  .use('css')
  .loader('css-loader').end()
  .use('postcss')
  .loader('postcss-loader')
  .options({
    ident: 'postcss',
    plugins: (loader) => [
      require('postcss-preset-env')(),
      require('postcss-normalize')({ forceImport: true }),
      require('postcss-cssnext')(),
      require('postcss-import')({ root: loader.resourcePath }),
      require('postcss-selector-namespace')({ selfSelector: ':namespace', namespace: `` })
    ]}).end()


  config.module.rule('sass')
  .test(/\.s[ac]ss$/i)
  .use('css')
  .loader('css-loader').end()
  .use('postcss')
  .loader('postcss-loader')
  .options({
    ident: 'postcss',
    plugins: (loader) => [
      require('postcss-preset-env')(),
      require('postcss-normalize')({ forceImport: true }),
      require('postcss-cssnext')(),
      require('postcss-import')({ root: loader.resourcePath }),
      require('postcss-selector-namespace')({ selfSelector: ':namespace', namespace: `` })
    ]}).end()
  .use('sass')
  .loader('sass-loader').end()


config.module.rule('images')
  .test(/\.(png|jpg|gif)$/i)
  .use('urlloader')
  .loader('url-loader').options({
    limit: 8192,
    quality: 85,
    name: '../dist/images/[name].[hash:8].[ext]',
  }).end()
  
config.plugin('DefinePlugin')
  .use(webpack.DefinePlugin, [
  {
    
  }]).end()

  // config.node.set('module', 'empty')
  // config.node.set('dgram', 'empty')
  // config.node.set('fs', 'empty')
  // config.node.set('http2', 'empty')
  // config.node.set('net', 'empty')
  // config.node.set('tls', 'empty')
  // config.node.set('child_process', 'empty')

module.exports = config