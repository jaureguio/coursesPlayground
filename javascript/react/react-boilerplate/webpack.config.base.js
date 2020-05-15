const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: './src'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    // [name].bundle.js will become app.bundle.js in this case, just as the 'app' entry name
    filename: '[name].bundle.js',
    // This allows to control the naming for lazily loaded modules (using dynamic imports)
    chunkFilename: '[name].chunk.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
}
