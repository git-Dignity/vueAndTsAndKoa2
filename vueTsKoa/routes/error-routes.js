/*
 * @Author: zemin zheng
 * @Date: 2021-04-10 17:27:15
 * @LastEditTime: 2021-04-10 17:28:53
 * @LastEditors: Please set LastEditors
 * @Description: 对路由进行拦截
 * @FilePath: \vueTsKoa\routes\error-routes.js
 */

module.exports = function () {
    return function (ctx, next) {
      switch (ctx.status) {
        case 404:
          ctx.body = '没有找到内容 - 404'
          break
      }
      return next()
    }
  }
  