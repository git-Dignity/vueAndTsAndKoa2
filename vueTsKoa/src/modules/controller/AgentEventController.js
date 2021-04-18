/*
 * @Author: your name
 * @Date: 2021-04-18 17:18:55
 * @LastEditTime: 2021-04-18 18:25:35
 * @LastEditors: Please set LastEditors
 * @Description: 我的——代办事项 Controller层
 * @FilePath: \vueTsKoa\src\modules\controller\AgentEventController.js
 */
const AgentEventService = require('../service/AgentEventService')
const {
  request,
  summary,
  body,
  tags,
  description,
  query
} = require('koa-swagger-decorator')

const agentEventService = new AgentEventService()
const tag = tags(['我的——代办事项'])
const paramsList = (id=false,title = true, content=true, type = true, agent = true, schedule = true, noticeWay = true, contact = true, startTime = true, endTime = true,  remarks = false) =>{
  return {
    id:  { type: 'string', required: id, description: 'id'  },
    title: { type: 'string', required: title, default: '标题', description: '标题' },
    content: { type: 'string', required: content, default: '内容', description: '内容' },
    type: { type: 'string', required: type, default: 'two-days', description: '类型（1：这两天；2：近期；3：延后）' },
    agent: { type: 'string', required: agent, default: '阿泽', description: '代办者' },
    schedule: { type: 'number', required: schedule, default: 10, description: '进度' },
    noticeWay: { type: 'number', required: noticeWay, default: 1, description: '通知方式（1：Bark；2：微信方糖；3：qq邮箱）' },
    contact: { type: 'string', required: contact, default: '110', description: '联系方式（noticeWay值的1、2：存的是手机号码； 3：存qq邮箱）' },
    startTime: { type: 'string', required: startTime, default: '开始时间', description: '开始时间' },
    endTime: { type: 'string', required: endTime, default: '结束时间', description: '结束时间' },
    remarks: { type: 'string', required: remarks, default: '干饭', description: '备注' }
  }
}



class AgentEventController {
  @request('get', '/agentEvent/get')
  @summary('获取列表，支持分页、排序')
  @description('在【我的-代办事项】使用')
  @tag
  static async getList(ctx, next) {
    ctx.response.body = await agentEventService.get(ctx.request.query) 
  }

  @request('post', '/agentEvent/save')
  @summary('创建列表一行数据')
  @description('在【我的-代办事项】使用')
  @tag
  @body(paramsList(false))
  static async createList(ctx, next) {
    ctx.response.body = await agentEventService.create(ctx.request.body)
  }


  @request('put', '/agentEvent/edit')
  @summary('更新列表一行数据')
  @description('在【我的-代办事项】使用')
  @tag
  @body(paramsList(true))
  static async updateList(ctx, next) {
    ctx.response.body = await agentEventService.update(ctx.request.body)
  }

  @request('delete', '/agentEvent/delete')
  @summary('删除一行数据')
  @description('在【我的-代办事项】使用')
  @tag
  @query({ id: { type: 'string', required: true } })
  static async destroyList(ctx, next) {
    ctx.response.body = await agentEventService.destroy(ctx.request.query.id)
  }
}


module.exports = AgentEventController