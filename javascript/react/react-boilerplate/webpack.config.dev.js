const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

const devConfig = merge(baseConfig, {
  mode: 'development',
  devServer: {
    port: 9000
  },
  devtool: 'source-maps'
})

module.exports = devConfig
