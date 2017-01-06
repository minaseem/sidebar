/**
 * Created by imamudin.naseem on 21/10/16.
 */

'use strict'
const webpack = require('webpack')

module.exports = {
  entry: ['./index.js'],
  devServer: {
    port: 5555
  },
  devtool: '#inline-source-map',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_modules)/,
        loader: 'babel'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.html$/
    })
  ]
}
