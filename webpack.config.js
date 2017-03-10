const webpack = require('webpack');

module.exports = {
  entry: ['whatwg-fetch', './client/src/index.js'],

  output: {
    path: './public',
    filename: 'bundle.js',
  },
  plugins: process.env.NODE_ENV === 'production' ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ] : [],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-2'
      },

      { test: /\.scss$/,                      loader: ['style-loader', 'css-loader', 'sass-loader'] },

      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,   loader: 'file-loader?mimetype=image/svg+xml' },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,  loader: "file-loader?mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,   loader: "file-loader?mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,   loader: "file-loader" }
    ],
  }
}
