const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const prodConfig = merge(baseConfig, {
  mode: 'production',
  plugins: [new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer: false,
    reportFilename: 'bundle_sizes.html'
  })],
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  }
})

module.exports = prodConfig
