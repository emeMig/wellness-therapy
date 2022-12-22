const CompressionPlugin = require("compression-webpack-plugin")
const productionGzipExtensions = ["js", "css"]

// vue.config.js
module.exports = {
  // proxy all webpack dev-server requests starting with /api
  // to our Spring Boot backend (localhost:8080) using http-proxy-middleware
  // see https://cli.vuejs.org/config/#devserver-proxy

  // devServer: {
  //   public: 'localhost',
  //   host: '0.0.0.0',
  //   port: 8081,
  //   disableHostCheck: true,
  //   proxy: {
  //     '/*': {
  //       target: 'http://localhost:8080',
  //       //target: 'http://10.32.4.4:8080',
  //       changeOrigin: true,
  //       ws: true
  //     }
  //   }
  // },

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
