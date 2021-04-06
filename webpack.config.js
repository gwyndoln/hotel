const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: './index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.pug',
      filename: '[name].html',
    }), //создаёт HTML на основе шаблона, помогает автоматически создавать html в dist и подключать туда скрипты
    //new CleanWebpackPlugin(), //очищает dist
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  module: {
    rules: [
        // изображения
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: 'asset/resource',
        },
        // шрифты и SVG
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
          type: 'asset/inline',
        },
        // стили
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        },
        //pug в html
        {
          test: /\.pug$/,
          loader: 'pug-loader',
          options: {
            pretty: true, 
          },
        },
    ],
  },
};