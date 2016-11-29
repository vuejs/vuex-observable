const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'main.js'),
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.common.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}
