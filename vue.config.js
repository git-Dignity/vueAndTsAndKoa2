// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
const PrerenderSPAPlugin = require("prerender-spa-plugin");
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const webpack = require("webpack");
const servesIP = "http://zhengzemin.cn:8527/";

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
      "/aaaasas": {
        target: servesIP,
        changeOrigin: true,
        ws: true
        // pathRewrite: {
        //   "^/bk": ""
        // }
      }
    }

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
        // 在什么文件都可以用，而如果在main中引入全局，只能在vue文件可使用
        new webpack.ProvidePlugin({
          urls: "src/const/urls.js"
        }),
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
  },
  // 样式插件
  css: {
    // module:true,
    loaderOptions: (() => {
      // if (process.env.NODE_ENV === "production" || true) {
        return {
          postcss: {
            plugins: [
              require("postcss-plugin-px2rem")({
                rootValue: 16 // 换算基数，默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
                // unitPrecision:5,// 允许REM单位增长到的十进制数字。
                // propWhiteList:["cen-column-arrow"],// 默认值是一个空数组，这意味着禁用白名单并启用所有属性。
                // propBlackList:[/\.cen-column-arrow.*/], // 黑名单
                // exclude:/(node_module)/,//默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
                // selectorBlackList:[".cen-column-arrow", ".reservoir-monitor .cn-body"],// 要忽略并保留为px的选择器
                // ignoreIdentifier:false,// （boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
                // replace:true,//（布尔值）替换包含REM的规则，而不是添加回退。
                // mediaQuery:false,//（布尔值）允许在媒体查询中转换px。
                // minPixelValue:3//设置要替换的最小像素值(3px会被转rem)默认 0

              })
            ]
          }
        };
      // }
    })()

  }

};

function resolve(dir) {
  return path.join(__dirname, dir);
}
