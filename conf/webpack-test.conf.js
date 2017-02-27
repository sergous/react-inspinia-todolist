const webpack = require('webpack');

module.exports = {
  module: {
    preLoaders: [
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        loader: 'tslint'
      }
    ],

    loaders: [
      {
        test: /.json$/,
        loaders: [
          'json'
        ]
      },
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        loaders: [
          'ts'
        ]
      },
      {
          test: /\.(css|scss)$/,
          loaders: [
              'style',
              'css',
              'sass',
              'postcss'
          ]
      },
      {
          test: /\.(png|jpg|gif)(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader?limit=100000'
      },
      {
          test: /\.(eot|com|json|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },
  plugins: [
      new webpack.ProvidePlugin({
          '$': "jquery",
          'jQuery': "jquery",
          'window.jQuery': "jquery",
          'window.$': 'jquery'

      })
  ],
  debug: true,
  devtool: 'source-map',
  resolve: {
    extensions: [
      '',
      '.webpack.js',
      '.web.js',
      '.js',
      '.ts',
      '.tsx'
    ]
  },
  externals: {
    'jsdom': 'window',
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window',
    'text-encoding': 'window'
  },
  ts: {
    configFileName: 'tsconfig.json'
  },
  tslint: {
    configuration: require('../tslint.json')
  }
};
