/*
 * @Author: your name
 * @Date: 2020-04-27 19:12:15
 * @LastEditTime: 2021-08-30 00:18:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vueTsKoa\routes\index.js
 */
const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/transactions', async (ctx, next) => {
  
  ctx.body = data = {
    code: 20000,
    data: {
      
    }
  }
})



router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json 哈哈'
  }
})

module.exports = router
