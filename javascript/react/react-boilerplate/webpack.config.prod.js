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

prodConfig.module.rules[0].options.presets[0] = ['@babel/preset-env', {
  targets: [
    'last 2 versions',
    'not < 2%',
    'not dead',
    'not ie 11'
  ],
  useBuiltIns: 'entry'
}]

module.exports = prodConfig
