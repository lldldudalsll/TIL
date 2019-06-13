const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// html-webpack-plugin은 웹팩이 html 파일을 읽어서 html 파일을 빌드할 수 있게 해줌
// 로더는 html 파일을 읽었을 때 html-loader를 실행하여 
// 웹팩이 이해할 수 있게 하고 options 으로는 minimize 라는 코드 최적화 옵션을 사용

module.exports = {
  entry: './src/test.js', 
  // webpack 이 빌드할 파일을 알려주는 역할. 
  // 이렇게 한다면 src/test.js 파일 기준으로 import 되어 있는 모든 파일들을 찾아 하나의 파일로 합치게 됩니다.
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname + '/build')
  },
  devServer: {
    contentBase: path.resolve("./build"),
    index: "index.html",
    port: 9000
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: "/node_modules",
        use: ['babel-loader']
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: false }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'] //오른쪽에서 왼쪽 순서로 실행된다. css-loader로 파일을 읽고 플러그인으로 읽은 css를 파일로 추출하는것.
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      }
    ]
  },
  resolve: { //resolve는 웹팩이 모듈을 import 하는 설정들을 변경할 수 있는 옵션
    extensions: [".jsx", ".js"] //extensions 옵션은 아래와 같이 해당 경로에 있는 확장자가 생략된 파일을 import 할 시 웹팩이 어떤 확장자로 모듈을 가지고 올 지 결정하는 역할을 합니다.
  },
  //또한, introduce.jsx와 introduce.js가 있다면 extensions 배열에 첫 번째에 있는 .jsx 파일로된 
  // introduce.jsx를 먼저 가지고 오고 나머지 확장자로된 파일들을 전부 생략합니다.
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',  // public/index.html 파일을 읽는다.
      filename: 'index.html'   // output으로 출력할 파일은 index.html
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    new CleanWebpackPlugin()
  ]
};