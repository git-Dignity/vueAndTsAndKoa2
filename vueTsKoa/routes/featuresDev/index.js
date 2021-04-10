const router = require('koa-router')()
var DB = require('../../utils/mysqlDB')
const sqlModel = require('../common')
const Base = require('./../common/base')


router.prefix('/featuresDev')



router.get('/', async (ctx, next) => {
    // new SwaggerClass().get('/featuresDev/')
    
    const req = ctx.request.query
    console.log(req)
    
    ctx.response.body = await new Base("features").get(req, 'create_time')
})




router.post('/', async (ctx, next) => {
    const params = ctx.request.body
    console.log(params);
  
    ctx.response.body = await new Base("features").post(params)
})



router.put('/', async (ctx) => {
    const params = ctx.request.body;
    console.log(params)

    ctx.response.body = await new Base("features").put(params)
})


router.delete('/', async (ctx, next) => {
    const id = ctx.request.query.id
    console.log(id);

    ctx.response.body = await new Base("features").del(id)
})




module.exports = router