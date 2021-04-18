/*
 * @Author: your name
 * @Date: 2021-04-18 22:21:06
 * @LastEditTime: 2021-04-18 22:46:01
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

const sysUserService = new SysUserService()
const tag = tags(['系统设置——用户管理'])
const paramsList = (id=false,username = true, photo=false, phone = true, roles = true) =>{
  return {
    user: { type: 'object', 
      properties: {
        id: { type: 'number',required: id },
        username: { type: 'string',required: username,default: '阿泽', description: '用户名' },
        photo: { type: 'string',required: photo,default: '帅哥Or美女.jpg', description: '照片' },
        phone: { type: 'string',required: phone,default: '110', description: '手机号码' },
        roles: { type: 'string',required: roles,default: 'common', description: '角色' }
      } 
    }
  }
}



class SysUserController {
  @request('get', '/user/')
  @summary('获取列表，支持分页、排序')
  @description('在【系统设置——用户管理】使用')
  @tag
  static async getList(ctx, next) {
    ctx.response.body = await sysUserService.get(ctx.request.query) 
  }

  @request('post', '/user/')
  @summary('创建列表一行数据')
  @description('在【系统设置——用户管理】使用')
  @tag
  @body(paramsList(false))
  static async createList(ctx, next) {
    ctx.response.body = await sysUserService.create(ctx.request.body.user)
  }


  @request('put', '/user/ID')
  @summary('更新列表一行数据')
  @description('在【系统设置——用户管理】使用')
  @tag
  @body(paramsList(true))
  static async updateList(ctx, next) {
    ctx.response.body = await sysUserService.update(ctx.request.body.user)
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