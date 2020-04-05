const path = require('path')
const name = 'Vue Typescript Admin'


module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-typescript-admin-template/' : '/', // TODO: Remember to change this to fit your need
  lintOnSave: false,  // process.env.NODE_ENV === 'development',  //关闭效验
  pwa: {
    name: name
  },
  devServer: {
    port: 8081,
    host:'0.0.0.0', //指定使用地址，可以被外界访问 
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    progress: false
    // proxy: {
    //   // change xxx-api/login => /mock-api/v1/login
    //   // detail: https://cli.vuejs.org/config/#devserver-proxy
    //   '/api': {
    //     target: `http://localhost:3000`,
    //     changeOrigin: true, // needed for virtual hosted sites
    //     ws: true, // proxy websockets
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
  },
  pluginOptions: {
    //全局scss样式
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/_variables.scss'),
        path.resolve(__dirname, 'src/styles/_mixins.scss')
      ]
    }
  },
  chainWebpack(config) {
    // Provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.set('name', name)
  }
}
