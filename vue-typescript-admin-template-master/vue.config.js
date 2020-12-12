// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
const PrerenderSPAPlugin = require("prerender-spa-plugin");
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, on Mac: sudo npm run / sudo yarn
const devServerPort = 9527; // TODO: get this variable from setting.ts
const mockServerPort = 9548; // TODO: get this variable from setting.ts
const name = "音乐博客"; // TODO: get this variable from setting.ts

module.exports = {
  publicPath: "/", // 打包后的静态文件路径
  // publicPath: process.env.NODE_ENV === 'production' ? '/' : '/vue-typescript-admin-template/',
  lintOnSave: process.env.NODE_ENV === "development", // false关闭效验
  productionSourceMap: false,
  devServer: {
    host: "localhost",
    port: devServerPort,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    progress: false,

    proxy: {
      "/bk": {
        target: "http://file.dev.zhengzemin.cn/bk/", // 对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/bk": ""
        }
      }
    }

    // proxy: {
    //   // change xxx-api/login => /mock-api/v1/login
    //   // detail: https://cli.vuejs.org/config/#devserver-proxy
    //   [process.env.VUE_APP_BASE_API]: {
    //     target: `http://localhost:${mockServerPort}/mock-api/v1`,
    //     changeOrigin: true, // needed for virtual hosted sites
    //     ws: true, // proxy websockets
    //     pathRewrite: {
    //       ['^' + process.env.VUE_APP_BASE_API]: ''
    //     }
    //   }
    // }
  },
  pwa: {
    name: name,
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: path.resolve(__dirname, "src/pwa/service-worker.js")
    }
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [
        path.resolve(__dirname, "src/styles/_variables.scss"),
        path.resolve(__dirname, "src/styles/_mixins.scss")
      ]
    }
  },
  chainWebpack(config) {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.set("name", name);

    // set Alias，tsconfig.json也要配置
    config.resolve.alias
      .set("@v", resolve("src/views"))
      .set("@c", resolve("src/components"));

    // https://webpack.js.org/configuration/devtool/#development
    config
      .when(process.env.NODE_ENV === "development",
        config => config.devtool("cheap-eval-source-map")
      );

    // remove vue-cli-service's progress output
    config.plugins.delete("progress");
    // replace with another progress output plugin to solve the this bug:
    // https://github.com/vuejs/vue-cli/issues/4557
    config.plugin("simple-progress-webpack-plugin")
      .use(require.resolve("simple-progress-webpack-plugin"), [{
        format: "compact"
      }]);

    config
      .when(process.env.NODE_ENV !== "development",
        config => {
          config
            .optimization.splitChunks({
              chunks: "all",
              cacheGroups: {
                libs: {
                  name: "chunk-libs",
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: "initial" // only package third parties that are initially dependent
                },
                elementUI: {
                  name: "chunk-elementUI", // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: "chunk-commons",
                  test: path.resolve(__dirname, "src/components"),
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            });
          config.optimization.runtimeChunk("single");
        }
      );
  },
  configureWebpack: config => { // 预编译
    if (process.env.NODE_ENV !== "production") return;
    return {
      plugins: [
        new PrerenderSPAPlugin({
          // 生成文件的路径，也可以与webpakc打包的一致。
          // 下面这句话非常重要！！！
          // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
          staticDir: path.join(__dirname, "dist"),
          // 对应自己的路由文件，比如a有参数，就需要写成 /a/param1。
          routes: ["/", "/product", "/about"],
          // 这个很重要，如果没有配置这段，也不会进行预编译
          renderer: new Renderer({
            inject: {
              foo: "bar"
            },
            headless: false,
            // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
            renderAfterDocumentEvent: "render-event"
          })
        })
      ]
    };
  }

};

function resolve(dir) {
  return path.join(__dirname, dir);
}
