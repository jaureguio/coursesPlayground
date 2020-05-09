const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

devHotConfig = merge(baseConfig, {
  mode: 'development',
  devServer: {
    port: 9000
  },
  devtool: 'source-maps'
})

devHotConfig
  .module
  .rules[0]
  .options
  .plugins.push('react-hot-loader/babel')

module.exports = devHotConfig