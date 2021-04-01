const path = require('path')

module.exports = {
  entry: './indexTippy.js',
  mode: 'development',
  target: ['web', 'es5'],
  output: {
    filename: 'btnqrcode.js',
    path: path.resolve(__dirname, 'dist'),
    libraryExport: 'default',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
}
