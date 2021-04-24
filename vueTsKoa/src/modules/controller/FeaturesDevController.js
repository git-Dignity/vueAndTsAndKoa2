/*
 * @Author: zemin zheng
 * @Date: 2021-04-11 18:28:33
 * @LastEditTime: 2021-04-24 16:39:17
 * @LastEditors: Please set LastEditors
 * @Description: 我的——功能开发 Controller层
 * @FilePath: \vueTsKoa\src\controller\featuresDevController.js
 */
const FeaturesDevService = require('../service/FeaturesDevService')
const {
  request,
  summary,
  body,
  tags,
  description,
  query
} = require('koa-swagger-decorator')

const featuresDevService = new FeaturesDevService("features")
const tag = tags(['我的——功能开发'])
const paramsList = (id=false, title=false, front_end = false, node = false, java = false, database_sql = false, remarks = false, auth = false) =>{
  return {
    id: { type: 'string', required: id, description: 'id'  },
    title: { type: 'string', required: title, default: '干饭', description: '标题' },
    front_end: { type: 'string', required: front_end, default: 'div', description: '前端内容' },
    node: { type: 'string', required: node, default: 'console.log(1314)', description: 'node内容' },
    java: { type: 'string', required: java, default: 'system.out.print(520)', description: 'java内容' },
    database_sql: { type: 'string', required: database_sql, default: 'select * from love', description: '数据库内容' },
    remarks: { type: 'string', required: remarks, default: '干饭', description: '备注' },
    auth: { type: 'string', required: auth, default: '阿泽', description: '作者' }
  }
}



class FeaturesDevController {
  @request('get', '/featuresDev/')
  @summary('获取列表，支持分页、排序')
  @description('在【我的-功能开发】使用')
  @tag
  static async getList(ctx, next) {
    ctx.response.body = await featuresDevService.get(ctx.request.query) 
  }

  @request('post', '/featuresDev/')
  @summary('创建列表一行数据')
  @description('在【我的-功能开发】使用')
  @tag
  @body(paramsList(false, true))
  static async createList(ctx, next) {
    ctx.response.body = await featuresDevService.create(ctx.request.body)
  }


  @request('put', '/featuresDev/')
  @summary('更新列表一行数据')
  @description('在【我的-功能开发】使用')
  @tag
  @body(paramsList(true, false))
  static async updateList(ctx, next) {
    ctx.response.body = await featuresDevService.update(ctx.request.body)
  }

  @request('delete', '/featuresDev/')
  @summary('删除一行数据')
  @description('在【我的-功能开发】使用')
  @tag
  @query({ id: { type: 'number', required: true } })
  static async destroyList(ctx, next) {
    ctx.response.body = await featuresDevService.destroy(ctx.request.query.id)
  }
}


module.exports = FeaturesDevController