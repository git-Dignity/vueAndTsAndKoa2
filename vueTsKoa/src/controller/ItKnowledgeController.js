/*
 * @Author: zemin zheng
 * @Date: 2021-04-17 20:30:46
 * @LastEditTime: 2021-04-18 15:47:44
 * @LastEditors: Please set LastEditors
 * @Description: IT知识（前端、后端、前后端、算法、工具） Controller层
 * @FilePath: \vueTsKoa\src\controller\ItKnowledgeController.js
 */
const {
  request,
  summary,
  body,
  tags,
  description,
  query
} = require('koa-swagger-decorator')
const ItKnowledgeService = require('../service/ItKnowledgeService')
const itKnowledgeService = new ItKnowledgeService()
const tag = tags(['IT知识'])

// 误区：关于对象，发现type写为object，一直提示我类型错误，最后才发现原来JSON并不是对象，而是string
const paramsList = () =>{
  return {
    info:{
      type: 'string',
      required: true,
      default: {"id":"","title":"","content":"","type":"","photo":"","remarks":"","auth":"zheng","category":1},
      description: 'IT知识的信息'
    },
    file:{
      type:"file",
      required: false,
      description: '图片文件'
    }
  }
}


class ItKnowledgeController {
  @request('get', '/itKnowledge/')
  @summary('获取列表，支持分页、排序')
  @description('在【IT知识】使用')
  @tag
  static async getList(ctx, next) {
    ctx.response.body = await itKnowledgeService.get(ctx.request.query) 
  }

  @request('post', '/itKnowledge/')
  @summary('创建列表一行数据')
  @description('在【IT知识】使用')
  @tag
  @body(paramsList())
  static async createList(ctx, next) {
    ctx.response.body = await itKnowledgeService.create(ctx.request)
  }


  @request('put', '/itKnowledge/')
  @summary('更新列表一行数据')
  @description('在【IT知识】使用，如果有修改图片，先把之前存在本地的图片删除')
  @tag
  @body(paramsList())
  static async updateList(ctx, next) {
    ctx.response.body = await itKnowledgeService.update(ctx.request)
  }

  @request('delete', '/itKnowledge/')
  @summary('删除一行数据')
  @description('在【IT知识】使用')
  @tag
  @query({ id: { type: 'number', required: true } })
  static async destroyList(ctx, next) {
    ctx.response.body = await itKnowledgeService.destroy(ctx.request.query.id)
  }
}


module.exports = ItKnowledgeController