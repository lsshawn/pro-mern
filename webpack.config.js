const webpack = require('webpack');
var path = require('path');

module.exports = {
   // two bundles: 1 for application code, 1 for other libraries
  entry: {
    app: './src/App.jsx',
    vendor: ['react', 'react-dom', 'whatwg-fetch', 'react-router'],
  },
  output: {
    path: path.resolve(__dirname, 'static'),
    filename: 'app.bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.bundle.js'})
  ],
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        query: {
          presets: ['react','es2015']
        }
      },
    ]
  },
  
  devServer: {
    port: 8000,
    contentBase: 'static',
    proxy: {
      '/api/*': {
        target: 'http://localhost:3000',
      },
    },
    historyApiFallback: true,
  },
  devtool: 'source-map',
};