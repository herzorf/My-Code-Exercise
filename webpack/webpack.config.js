//路径
var path = require("path");
//打包html
var HtmlWebpackPlugin = require("html-webpack-plugin");
//打包css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//继承base
const base = require("./webpack.config.base.js");
module.exports = {
  ...base,
  mode: "development",
  //加载dev-server

  module: {
    rules: [
      ...base.module.rules,
      {
        test: /\.css$/,
        //开发中使用
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
