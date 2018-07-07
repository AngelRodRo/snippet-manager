var path = require('path')
var webpack = require('webpack')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require("fs")
const { resolve } = require("path");

module.exports = {
  entry: {
    app: [
        "babel-polyfill",
        resolve(__dirname, "src/main.js")
    ]
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      inject: true,
      templateContent(templateParams) {
          const indexTemplate = fs.readFileSync(resolve(__dirname, "index.html"), "utf8");          
          const tmpl = require("blueimp-tmpl");

          return tmpl(indexTemplate, templateParams);
      },
      minify: {
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: false
          // more options:
          // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: "dependency"
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      inject: true,
      templateContent(templateParams) {
          const indexTemplate = fs.readFileSync(resolve(__dirname, "index.html"), "utf8");
          const tmpl = require("blueimp-tmpl");

          return tmpl(indexTemplate, templateParams);
      },
      chunksSortMode: "dependency"
    })
  ]
}

module.exports.devtool = '#source-map'
// http://vue-loader.vuejs.org/en/workflow/production.html
module.exports.plugins = (module.exports.plugins || []).concat([
  new webpack.DefinePlugin({
    'process.env.ROOT_HOST': process.env.ROOT_HOST
  })
])