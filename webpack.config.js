const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: '../mile-tracker-server/public',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new ExtractTextPlugin('/styles/bundle.css')
  ],
  module: {
    preLoader: [{
      test: /\.js$/,
      loader: 'eslint-loader',
      exclude: /node_modules/
    }],
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015'],
        cacheDirectory: true
      }
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style!',
      'css?sourceMap!sass?sourceMap')
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style!',
      'css')
    },
    {
      test: /\.html$/,
      loader: 'html'
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
        'file?hash=sha512&digest=hex&name=[hash].[ext]',
        'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
      ]
    }]
  },
  sassLoader: {
    includePaths: ['./src/scss/includes']
  }
};