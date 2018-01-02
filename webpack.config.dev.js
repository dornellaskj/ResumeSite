import webpack from 'webpack';
import path from 'path';
let ExtractTextPlugin = require('extract-text-webpack-plugin');

let Config = {
  debug: true,
  devtool: 'inline-source-map',
  noInfo: false,
  entry: 
    {
      home: path.resolve(__dirname, 'source/index'),
      resume: path.resolve(__dirname, 'source/resume')
    },
  target: 'web',
  output: {
    path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: '[name]-bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'source')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('index.css')
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'source'),
        loader: 'babel',
        query: {
          plugins: [
            ['react-transform', {
              transforms: [
                {
                  transform: 'react-transform-hmr',
                  imports: ['react'],
                  locals: ['module']
                }
              ]
            }]
          ]
        }
      },
      {test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!sass')},
      {test: /(\.css)$/, loader: ExtractTextPlugin.extract('style','css')},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
    ]
  }
};

export default Config;