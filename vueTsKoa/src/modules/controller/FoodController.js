/*
 * @Author: your name
 * @Date: 2021-05-05 13:08:09
 * @LastEditTime: 2021-05-05 16:21:20
 * @LastEditors: Please set LastEditors
 * @Description: 美食分享
 * @FilePath: \vueTsKoa\src\modules\controller\FoodController.js
 */

const {
  request,
  summary,
  body,
  tags,
  description,
  query
} = require('koa-swagger-decorator')
const FoodService = require('../service/FoodService')
const foodService = new FoodService("food")
const tag = tags(['吃啥--美食分享'])

const paramsList = () =>{
  return {
    info:{
      type: 'string',
      required: true,
      default: {"id":"","title":"","content":"","type":"","photo":"","remarks":"","auth":"zheng"},
      description: '吃啥--美食分享的信息'
    },
    file:{
      type:"file",
      required: false,
      description: '图片文件'
    }
  }
}


class ItKnowledgeController {
  @request('get', '/food/')
  @summary('获取列表，支持分页、排序')
  @description('在【吃啥--美食分享】使用')
  @tag
  static async getList(ctx, next) {
    ctx.response.body = await foodService.get(ctx.request.query) 
  }

  @request('post', '/food/')
  @summary('创建列表一行数据')
  @description('在【吃啥--美食分享】使用')
  @tag
  @body(paramsList())
  static async createList(ctx, next) {
    ctx.response.body = await foodService.create(ctx.request)
  }


  @request('put', '/food/')
  @summary('更新列表一行数据')
  @description('在【吃啥--美食分享】使用，如果有修改图片，先把之前存在本地的图片删除')
  @tag
  @body(paramsList())
  static async updateList(ctx, next) {
    ctx.response.body = await foodService.update(ctx.request)
  }

  @request('delete', '/food/')
  @summary('删除一行数据')
  @description('在【吃啥--美食分享】使用')
  @tag
  @query({ id: { type: 'number', required: true } })
  static async destroyList(ctx, next) {
    ctx.response.body = await foodService.destroy(ctx.request.query.id)
  }
}


module.exports = ItKnowledgeController