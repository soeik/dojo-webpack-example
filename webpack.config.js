const DojoWebpackPlugin = require("dojo-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

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
        test: /\.tsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  resolveLoader: {
    modules: ["node_modules"]
  },
  plugins: [
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
      { from: "./public/index.jsp", to: "index.jsp" },
      { from: "./public/index.html", to: "index.html" }
    ])
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
