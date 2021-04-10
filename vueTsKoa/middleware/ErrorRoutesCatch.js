/*
 * @Author: zemin zheng
 * @Date: 2021-04-10 17:30:30
 * @LastEditTime: 2021-04-10 17:30:54
 * @LastEditors: Please set LastEditors
 * @Description: 路由 中间件
 * @FilePath: \vueTsKoa\middleware\ErrorRoutesCatch.js
 */
module.exports = function () {
    return function (ctx, next) {
      return next().catch((err) => {
        switch (err.status) {
          case 401:
            ctx.status = 200
            ctx.body = {
              status: 401,
              result: {
                err: 'Authentication Error',
                errInfo: 'Protected resource, use Authorization header to get access.'
              }
            }
            break
          default:
            throw err
        }
      })
    }
  }
  