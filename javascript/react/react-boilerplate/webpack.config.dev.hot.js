const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

devHotConfig = merge(baseConfig, {
  mode: 'development',
  devServer: {
    port: 9000,
  },
  devtool: 'source-maps',
})

module.exports = devHotConfig
