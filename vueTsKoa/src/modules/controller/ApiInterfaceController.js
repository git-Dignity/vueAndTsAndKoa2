/*
 * @Author: your name
 * @Date: 2021-04-18 21:57:00
 * @LastEditTime: 2021-04-18 22:10:11
 * @LastEditors: Please set LastEditors
 * @Description: API接口 Controller层
 * @FilePath: \vueTsKoa\src\modules\controller\ApiInterfaceController.js
 */

const ApiInterfaceService = require('../service/ApiInterfaceService')
const {
  request,
  summary,
  body,
  tags,
  description,
  query
} = require('koa-swagger-decorator')

const apiInterfaceService = new ApiInterfaceService()
const tag = tags(['API接口'])
const paramsList = (key=true,phone = true) =>{
  return {
    key:  { type: 'string', required: key, default: '069589f49277521d8332b74d715e533a', description: 'key'  },
    phone: { type: 'number', required: phone, default: '110', description: '手机号码' }
  }
}



class ApiInterfaceController {
  @request('get', '/apiInterface/mobile')
  @summary('获取手机号码归属地')
  @description('在【API接口】使用')
  @tag
  @query(paramsList())
  static async getMobile(ctx, next) {
    ctx.response.body = await apiInterfaceService.getMobile(ctx.request.query) 
  }

}


module.exports = ApiInterfaceController