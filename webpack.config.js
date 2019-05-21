const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
    'is-android': './src/is-android.js',
    'is-chrome': './src/is-chrome.js',
    'is-edge': './src/is-edge.js',
    'is-firefox': './src/is-firefox.js',
    'is-ie': './src/is-ie.js',
    'is-mobile': './src/is-mobile.js',
    'is-opera': './src/is-opera.js',
    'is-safari': './src/is-safari.js',
    index: './src/index.js',
  },
  output: {
    library: 'browser',
    libraryTarget: 'umd',
    filename: '[name].js',
    path: __dirname + '/dist',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {
              targets: {
                browsers: ['> 0.25%'],
              }
            }]]
          }
        }
      }
    ]
  }
}
