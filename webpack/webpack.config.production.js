//路径
var path = require("path");
//打包html
var HtmlWebpackPlugin = require("html-webpack-plugin");
//打包css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//
const base = require("./webpack.config.base.js");
module.exports = {
  mode: "production",
  ...base,
  plugins: [
    ...base.plugins,
    //打包CSS 抽成文件
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].css",
    }),
  ],
  module: {
    rules: [
      ...base.module.rules,
      {
        test: /\.css$/,
        //production中使用
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "/public/path/to/",
            },
          },
          "css-loader",
        ],
      },
    ],
  },
};
