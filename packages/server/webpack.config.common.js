const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

const vendor = [
  'react',
  'react-dom',
  'react-redux',
  'react-router-dom',
  'redux',
  'redux-form',
  'moment',
  'moment-timezone',
  'emojione',
  'highcharts',
  'immutable',
  'pusher-js',
  'bn.js',
  'jszip',
  'lodash-es',
  'core-js',
  'pako',
  'twitter-text',
];
const bufferapp = [
  '@bufferapp/components',
  '@bufferapp/composer',
  '@bufferapp/draft-js',
  '@bufferapp/analyze-date-picker',
  '@bufferapp/analyze-profile-selector',
  '@bufferapp/analyze-png-export',
  '@bufferapp/draft-js-emoji-plugin',
  '@bufferapp/draft-js-plugins-editor',
  '@bufferapp/posts-table',
  '@bufferapp/publish-parsers',
];
const { analyzePackagesWhitelist, analyzeLessLoader } = require('../../analyze.config.js');


module.exports = {
  context: __dirname,
  entry: {
    // vendor,
    // bufferapp,
    bundle: ['babel-polyfill', '../web/index.jsx'],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: new RegExp(`/node_modules(?!/@bufferapp/*)${analyzePackagesWhitelist}/`),
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /node_modules\/@bufferapp\/draft-js-emoji-plugin\/lib\/plugin\.css/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.css$/,
        exclude: /node_modules\/@bufferapp\/draft-js-emoji-plugin\/lib\/plugin\.css/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
        ],
      },
      analyzeLessLoader,
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css',
    }),
    new MomentLocalesPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            if (packageName.indexOf('@bufferapp') >= 0) {
              return 'bufferapp';
            }

            // npm package names are URL-safe, but some servers don't like @ symbols
            return 'vendor';
          },
        },
      },
    },
  },
  output: {
    path: __dirname,
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  stats: {
    children: false, // Disable logging from child plugins
  },
};
