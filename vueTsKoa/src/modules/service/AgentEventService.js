/*
 * @Author: zemin zheng
 * @Date: 2021-04-18 17:20:24
 * @LastEditTime: 2021-04-18 18:26:02
 * @LastEditors: Please set LastEditors
 * @Description: 我的——代办事项 Service层
 * @FilePath: \vueTsKoa\src\modules\service\AgentEventService.js
 */
const qs = require('qs');
const config = require('@config/config.js')
const { get, post, put, del } = require('@utils/request.js')
const { specifiedTime } = require('@src/common/utils/schedule')
const { specifiedTimeFormat } = require('@utils/date')
const { barkSend, serverJiangSend, qqMailSend } = require('@api/sendMsg')

class AgentEventService {
  constructor(){
    this.tmpTime = null; // 全局定时器
  }
 
  async get(params) {
    let data = {}

    const result = await get({
        uri: config.javaUrl + '/agentEvent/get',
        qs: params
    })

    data = {
        code: 20000,
        data: result
    }
    return data
  }

 
  async create(params) {
    let data = {}

    // 在指定时间执行方法
    let j = this.specifiedTimeSend(params)
  



    const result = await post({
        uri: config.javaUrl + '/agentEvent/save',
        qs: params
    })



    data = {
        code: 20000,
        data: {
            msg: "添加成功",
            msgData: result
        }
    }

    return data
  }

 
  async update(params) {
    let data = {}
    
    // 执行定时器
    this.tmpTime = this.executeTimeout(params, this.tmpTime)    
    

    // save data
    const result = await put({
        uri: config.javaUrl + '/agentEvent/edit',
        qs: qs.stringify(params)
    })

    data = {
        code: 20000,
        data: {
            msg: "修改成功",
            msgData: result
        }
    }

    return data
  }

 
  async destroy(id) {
    let data = {}
    const result = await del({
      uri: config.javaUrl + '/agentEvent/delete',
      qs: id
  })

  data = {
      code: 20000,
      data: {
          msg: "删除成功",
          msgData: result
      }
  }

    return data
  }

  /**
 * 
 * @param {Object} params 参数对象
 * @param {*} tmpTime 全局定时器
 */
 executeTimeout  (params, tmpTime) {
  if(params.schedule != '100' || params.schedule != 100){
      // 在指定时间执行方法
      console.log('进入定时器...')
      return this.specifiedTimeSend(params)
  }else if(tmpTime!=null){
      tmpTime.cancel();  
      console.log('取消定时器') 
  }
}


/**
 * 判断如果传进来的schedule进度是100的话，分两种情况，已经有定时器就关掉，没有就不需要启动定时器了，不是就启动，还要将他的date存数据库，方便以后关闭
 * 在指定时间发送信息
 * @param {Object} params 
 */
 specifiedTimeSend  (params)  {
  let date = specifiedTimeFormat(params.endTime)  // 格式化时间
  

  // 调用定时器
  return specifiedTime(date, async () =>{
      console.log("已执行定时器...")
      if(params.noticeWay===1){
          // Bark
          await barkSend(params.title)
      }else if(params.noticeWay===2){
           // 发送给微信方糖
          await serverJiangSend({
              text: `【音乐博客】通知亲爱的，你${params.agent}即将要做：【${params.title}】事情已到期，还没有完成吧，答应我做个自律的后生仔啦`,
              desp: `
              内容：${params.content} <br> 
              类型：${params.type} <br />
              进度：${params.schedule} <br />
              开始时间：${params.startTime} <br />
              结束时间：${params.endTime} <br />
              详情请登录:zhengzemin.cn:3000`
          })
      }else if(params.noticeWay===3){
          // qq邮箱
          await qqMailSend(params.contact, `
              标题：【音乐博客】通知亲爱的，你${params.agent}即将要做：【${params.title}】事情已到期，还没有完成吧，答应我做个自律的后生仔啦
              内容：${params.content} 
              类型：${params.type} 
              进度：${params.schedule}
              开始时间：${params.startTime}
              结束时间：${params.endTime} 
              详情请登录:zhengzemin.cn:3000
          `)
      }
  })
}

}


module.exports = AgentEventService