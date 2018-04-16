const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './client/src/js/index.js',
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
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new HtmlWebpackPlugin({
      template: 'client/src/index.html',
    }),
    new CleanWebpackPlugin('client/build'),
  ],
};
