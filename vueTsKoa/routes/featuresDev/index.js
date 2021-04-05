const router = require('koa-router')()
var DB = require('../../utils/mysqlDB')
const sqlModel = require('../common')
const Base = require('./../common/base')
// const SwaggerClass = require("./../common/SwaggerClass.js")


router.prefix('/featuresDev')

/**
 * @swagger
 * /featuresDev/:
 *   get:
 *     summary: 获取功能开发列表
 *     description: 获取功能开发列表
 *     tags: [我的——功能开发模块]
 *     parameters: # 请求参数
 *       - name: current
 *         description: 页码
 *         in: query # 参数的位置，可能的值有 "query", "header", "path" 或 "cookie" 没有formData，但是我加了不报错
 *         required: false
 *         type: number
 *       - name: size
 *         description: 页条数
 *         in: query
 *         required: false
 *         type: number # 可能的值有string、number、file（文件）等
 *       - name: title
 *         description: 标题（搜索）
 *         in: query
 *         required: false
 *         type: string # 可能的值有string、number、file（文件）等
 *       - name: front_end
 *         description: 前端（搜索）
 *         in: query
 *         required: false
 *         type: string # 可能的值有string、number、file（文件）等
 *       - name: node
 *         description: Node（搜索）
 *         in: query
 *         required: false
 *         type: string # 可能的值有string、number、file（文件）等
 *       - name: java
 *         description: Java（搜索）
 *         in: query
 *         required: false
 *         type: string # 可能的值有string、number、file（文件）等
 *       - name: database_sql
 *         description: SQL（搜索）
 *         in: query
 *         required: false
 *         type: string # 可能的值有string、number、file（文件）等
 *       - name: uploadTime
 *         description: 更新时间（搜索）
 *         in: query
 *         required: false
 *         type: string # 可能的值有string、number、file（文件）等
 *       - name: remarks
 *         description: 备注（搜索）
 *         in: query
 *         required: false
 *         type: string # 可能的值有string、number、file（文件）等
 *     responses:
 *       '200':
 *         description: Ok
 *         schema:
 *           type: 'object'
 *           properties:
 *             code:
 *               type: 'number'
 *               description: 状态码
 *             data:
 *               type: 'string'
 *               description: 加密公钥
 *             message:
 *               type: 'string'
 *               description: 消息提示
 *             status:
 *               type: 'number'
 *               description: 状态
 *       '400':
 *         description: 请求参数错误
 *       '404':
 *         description: not found
 */
router.get('/', async (ctx, next) => {
    // new SwaggerClass().get('/featuresDev/')
    
    const req = ctx.request.query
    console.log(req)
    
    

    
    ctx.response.body = await new Base("features").get(req, 'create_time')
})




/**
 * @swagger
 * /featuresDev/:
 *   post:
 *     summary: 添加功能开发
 *     description: 添加功能开发
 *     tags: [我的——功能开发模块]
 *     parameters: # 请求参数
 *       - name: body
 *         description: "{'id':'','title':'标题','front_end':'前端','node':'node','java':'java','database_sql':'数据库','remarks':'备注','auth':'创建者'}"
 *         in: body # 参数的位置，可能的值有 "query", "header", "path", "body" 或 "cookie" 没有formData，但是我加了不报错
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Ok
 *         schema:
 *           type: 'object'
 *           properties:
 *             code:
 *               type: 'number'
 *               description: 状态码
 *             data:
 *               type: 'object'
 *               properties:
 *                 msg:
 *                  type: 'string'
 *                  description: 消息
 *                 msgData:
 *                  type: 'object'
 *                  description: 数据
 *       '400':
 *         description: 请求参数错误
 *       '404':
 *         description: not found
 */
router.post('/', async (ctx, next) => {
    const params = ctx.request.body
    console.log(params);
  
    ctx.response.body = await new Base("features").post(params)
})



/**
 * @swagger
 * /featuresDev/:
 *   put:
 *     summary: 修改功能开发
 *     description: 修改功能开发
 *     tags: [我的——功能开发模块]
 *     parameters: # 请求参数
 *       - name: body
 *         description: "{'id':520, 'title':'标题','front_end':'前端','node':'node','java':'java','database_sql':'数据库','remarks':'备注','auth':'创建者'}"
 *         in: body # 参数的位置，可能的值有 "query", "header", "path", "body" 或 "cookie" 没有formData，但是我加了不报错
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Ok
 *         schema:
 *           type: 'object'
 *           properties:
 *             code:
 *               type: 'number'
 *               description: 状态码
 *             data:
 *               type: 'object'
 *               properties:
 *                 msg:
 *                  type: 'string'
 *                  description: 消息
 *                 msgData:
 *                  type: 'object'
 *                  description: 数据
 *       '400':
 *         description: 请求参数错误
 *       '404':
 *         description: not found
 */
router.put('/', async (ctx) => {
    const params = ctx.request.body;
    console.log(params)

    ctx.response.body = await new Base("features").put(params)
})



/**
 * @swagger
 * /featuresDev/:
 *   delete:
 *     summary: 删除功能开发
 *     description: 删除功能开发
 *     tags: [我的——功能开发模块]
 *     parameters: # 请求参数
 *       - name: id
 *         description: id
 *         in: query # 参数的位置，可能的值有 "query", "header", "path" 或 "cookie" 没有formData，但是我加了不报错
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Ok
 *         schema:
 *           type: 'object'
 *           properties:
 *             code:
 *               type: 'number'
 *               description: 状态码
 *             data:
 *               type: 'object'
 *               properties:
 *                 msg:
 *                  type: 'string'
 *                  description: 消息
 *                 msgData:
 *                  type: 'object'
 *                  description: 数据
 *       '400':
 *         description: 请求参数错误
 *       '404':
 *         description: not found
 */
router.delete('/', async (ctx, next) => {
    const id = ctx.request.query.id
    console.log(id);

    ctx.response.body = await new Base("features").del(id)
})








module.exports = router







// *       - name: id
// *         description: ID
// *         in: body
// *         required: false
// *         type: string # 可能的值有string、number、file（文件）等
// *       - name: auth
// *         description: 创建者
// *         in: body
// *         required: false
// *         type: string # 可能的值有string、number、file（文件）等
// *       - name: front_end
// *         description: 前端
// *         in: body
// *         required: false
// *         type: string # 可能的值有string、number、file（文件）等
// *       - name: node
// *         description: Node
// *         in: body
// *         required: false
// *         type: string # 可能的值有string、number、file（文件）等
// *       - name: java
// *         description: Java
// *         in: body
// *         required: false
// *         type: string # 可能的值有string、number、file（文件）等
// *       - name: database_sql
// *         description: SQL
// *         in: body
// *         required: false
// *         type: string # 可能的值有string、number、file（文件）等
// *       - name: remarks
// *         description: 备注
// *         in: body
// *         required: false
// *         type: string # 可能的值有string、number、file（文件）等