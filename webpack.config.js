const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, './public'),
    publicPath: '/public/',
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      test: /\.s[ac]ss$/i,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
      ],
    },
    {
      test: /\.js?$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
      },
    },
    ],
  },
  watch: true,
};