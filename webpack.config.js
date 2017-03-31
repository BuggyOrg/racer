const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const config = {
  devtool: 'eval',
  entry: [
    path.join(path.join(__dirname, 'src', 'client'), 'Index.jsx')
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.jsx', '.js', '.css'],
    modulesDirectories: ['node_modules', 'resources'],
    alias: {}
  },
  plugins: [
    new FaviconsWebpackPlugin({
      logo: path.join(__dirname, 'src', 'client', 'res', 'logo.png'),
      prefix: 'icons-[hash]/',
      background: '#00bcd4',
      emitStats: false,
      persistentCache: false
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'client', 'index.tpl.html'),
      inject: 'body',
      filename: 'index.html'
    }),
    new ExtractTextPlugin('[name].css', { allChunks: true }),
    new CopyWebpackPlugin([{
      from: 'node_modules/monaco-editor/min/vs',
      to: 'vs'
    }])
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src', 'client')
      },
      {
        test: /\.css$/,
        exclude: /\.import\.css$/,
        loader: 'style!css',
        include: path.resolve(__dirname, 'src', 'client')
      },
      {
        test: /\.import\.css$/,
        loader: 'style!css',
        include: path.resolve(__dirname, 'src', 'client')
      },
      {
        test: /\.(jpg|png|jpg|png|woff|eot|ttf|svg|gif)$/,
        loader: 'file'
      },
      {
        test: /manifest.json$/,
        loader: 'file-loader?name=manifest.json!web-app-manifest-loader'
      }
    ]
  },
  eslint: {
    configFile: path.join(__dirname, '.eslintrc'),
    failOnWarning: false,
    failOnError: false
  }
}

if (process.env.NODE_ENV === 'production') {
  delete config.devtool
  config.plugins.push(new webpack.optimize.DedupePlugin())
  config.plugins.push(new webpack.optimize.AggressiveMergingPlugin())
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    compress: {
      sequences: true,
      dead_code: true,
      conditionals: true,
      booleans: true,
      unused: true,
      if_return: true,
      join_vars: true,
      drop_console: true
    },
    mangle: {
      except: ['exports', 'require']
    },
    output: {
      comments: false
    }
  }))
  config.plugins.push(new webpack.DefinePlugin({
    'process.env': { NODE_ENV: '"production"' }
  }))
} else {
  config.entry.push('webpack-hot-middleware/client')
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config
