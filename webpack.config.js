const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './client/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client', 'build'),
  },
  mode: 'development',
  devServer: {
    contentBase: false,
    port: 3000,
    open: true,
    proxy: { '/api': 'http://localhost:3001' },
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'client'),
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new HtmlWebpackPlugin({
      template: 'client/index.html',
    }),
    new CleanWebpackPlugin('client/build'),
  ],
};
