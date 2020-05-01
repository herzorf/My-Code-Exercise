//路径
var path = require("path");
//打包html
var HtmlWebpackPlugin = require("html-webpack-plugin");
//打包css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  //加载dev-server
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist/",
  },
  //加载index.js
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
  },

  plugins: [
    //打包HTML
    new HtmlWebpackPlugin({
      //网页的标题
      title: "my-Page",
      //输入文件的地址
      template: "src/assets/index.html",
      //输出文件的名字
      filename: "index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: { implementation: require("dart-sass") },
          },
        ],
      },
      {
        test: /\.less$/,
        loader: ["style-loader", "css-loader", "less-loader"], // 将 Less 编译为 CSS
      },
      {
        test: /\.styl$/,

        loader: ["style-loader", "css-loader", "stylus-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
    ],
  },
};
