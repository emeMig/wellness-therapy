const CompressionPlugin = require("compression-webpack-plugin")
const productionGzipExtensions = ["js", "css"]

// vue.config.js
module.exports = {
  pwa: {
    name: "Wellness_Therapy",
    themeColor: "#00ACBF",
    display: "standalone",
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
  },
  transpileDependencies: ["vuetify","vuex-persist"],
  configureWebpack: {
    plugins: [
      new CompressionPlugin({
        algorithm: "gzip",
        test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
        threshold: 10240,
        minRatio: 0.8,
      }),
    ],
  },
  chainWebpack(config) {
    config.plugin("html").tap((args) => {
      args[0].title = "Wellness Therapy";
      return args;
    });
  },
  // Change build paths to make them Maven compatible
  // see https://cli.vuejs.org/config/
  outputDir: 'dist',
  assetsDir: 'static'
}
