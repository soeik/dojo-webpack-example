const HtmlWebpackPlugin = require("html-webpack-plugin")
const DojoWebpackPlugin = require("dojo-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

//const webpack = require("webpack")
const path = require("path")

require("@babel/polyfill")

const getDefaultConfig = env => ({
  mode: "development",
  entry: ["whatwg-fetch", "@babel/polyfill", "./src/main.ts"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js"
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader, // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader?limit=100000"
      },
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
      },

    ]
  },
  resolve: {
    extensions: [".ts", ".js", ".json"]
  },
  resolveLoader: {
    modules: ["node_modules"]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        cache: true,
        sourceMap: true,
        extractComments: true,
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({
        filename: "[name].css"
      })
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
    new DojoWebpackPlugin({
      loaderConfig: require.resolve("./src/loader-config.js"),
      locales: ["de", "en"],
      environment: {
        dojoRoot: "/",
        production: env && env.production
      }, // used at run time for non-packed resources (e.g. blank.gif)
      buildEnvironment: { dojoRoot: "./src", build: true } // used at build time
    }),
    new CopyWebpackPlugin([
      { from: "./public/index.jsp", to: "index.jsp" }
    ]),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i
    })
  ]
})

module.exports = env => {
  console.log("Production: ", (env && env.production) || false)
  let config = getDefaultConfig(env)

  if (!(env && env.production)) {
    config.devtool = "source-map"
    config.devServer = {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      host: "localhost",
      port: 9090,
      hot: false
    }
  } else {
    config.devtool = "none"
  }

  return config
}
