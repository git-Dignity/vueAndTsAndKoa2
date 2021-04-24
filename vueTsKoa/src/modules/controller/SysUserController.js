/*
 * @Author: zemin zheng
 * @Date: 2021-04-18 22:21:06
 * @LastEditTime: 2021-04-24 16:18:19
 * @LastEditors: Please set LastEditors
 * @Description: 系统设置——用户管理 Controller层
 * @FilePath: \vueTsKoa\src\modules\controller\SysUserController.js
 */

const SysUserService = require('../service/SysUserService')
const {
  request,
  summary,
  body,
  tags,
  description,
  query
} = require('koa-swagger-decorator')

const sysUserService = new SysUserService('login')
const tag = tags(['系统设置——用户管理'])
const paramsList = (info=true,file = false, current = false, size = false) =>{
  return {
    info:{
      type: 'string',
      required: info,
      default: `{"id":"ec6977c4-9835-4762-95a3-842779f387d0","username":"烘干机放入个0","photo":"http://localhost:3333/node/upload/image/user/1517_微信图片_20210117000229.gif","phone":"15915549153","roles":"23"}`,
      description: '用户的信息'
    },
    file:{
      type:"file",
      required: file,
      description: '头像文件'
    },
    current:{
      type:"number",
      required: current,
      default: 1,
      description: '当前页码'
    },
    size:{
      type:"number",
      required: size,
      default: 10,
      description: '当前页数'
    }
  }
}



class SysUserController {
  @request('get', '/user/')
  @summary('获取列表，支持分页、排序')
  @description('在【系统设置——用户管理】使用')
  @tag
  @query(paramsList(false, false, true,true))
  static async getList(ctx, next) {
    ctx.response.body = await sysUserService.get(ctx.request.query) 
  }

  @request('post', '/user/')
  @summary('创建列表一行数据')
  @description('在【系统设置——用户管理】使用')
  @tag
  @body(paramsList(true))
  static async createList(ctx, next) {
    ctx.response.body = await sysUserService.create(ctx.request)
  }


  @request('put', '/user/ID')
  @summary('更新列表一行数据')
  @description('在【系统设置——用户管理】使用')
  @tag
  @body(paramsList(true))
  static async updateList(ctx, next) {
    ctx.response.body = await sysUserService.update(ctx.request)
  }

  @request('post', '/user/del')
  @summary('删除一行数据')
  @description('在【系统设置——用户管理】使用')
  @tag
  @body({ id: { type: 'string', required: true } })
  static async destroyList(ctx, next) {
    ctx.response.body = await sysUserService.destroy(ctx.request.body.id)
  }
}


module.exports = SysUserController