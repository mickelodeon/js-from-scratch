const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

const basePath = __dirname;
const distPath = 'dist';

const indextInput = './index.html';
const indexOutput = 'index.html';
const webpackInitConfig = {
  mode: 'development',
  resolve: {
    extensions: ['.js'],
    alias: {
      '@fonts': path.join(__dirname, 'src', 'fonts'),
      '@img': path.join(__dirname, 'src', 'img'),
      '@styles': path.join(__dirname, 'src', 'styles'),
      '@jsons': path.join(__dirname, 'src', 'jsons'),
      '@partials': path.join(__dirname, 'src', 'scripts', 'partials'),
    },
  },
  entry: {
    app: ['@babel/polyfill', './src/scripts/main.js'],
  },
  output: {
    path: path.join(basePath, distPath),
    filename: 'main.js'
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: indexOutput,
      template: indextInput,
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css',
      chunkFilename: '[id].css',
    }),
    new FaviconsWebpackPlugin('src/img/siroko_favicon.svg'),
    new ImageMinimizerPlugin({
      minimizerOptions: {
        plugins: [
          ["jpegtran", { progressive: true }],
          ["optipng", { optimizationLevel: 5 }],
        ],
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader']
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader?name=img/[name].[ext]'
          },
        ],
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        use: 'file-loader?name=fonts/[name].[ext]'
      },
    ]
  }
};
module.exports = webpackInitConfig;