/*
 * @Author: your name
 * @Date: 2021-04-18 22:24:54
 * @LastEditTime: 2021-04-18 22:49:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vueTsKoa\src\modules\service\SysUserService.js
 */
var uuid = require('uuid');
var DB = require('@utils/sql/mysqlDB')
const sqlModel = require('@utils/sql/sqlModel')
const config = require('../../../config/config');

/**
 * TODO
 * 前端还有问题
 */
class SysUserService {
    constructor(){}
   
    async get(params) {
        let data = {}
        let sqlM = new sqlModel("login")
        const pageNumLeft = (params.page - 1) * params.limit;
        let total = await sqlM.getTotal()
       
        const userName =  params.userName==undefined?'':params.userName
        let result = await DB.query(`
            select * from login 
            where  username =  '${userName}' or '${userName} '=''
            limit ${pageNumLeft},${params.limit}
        `)
    
        result.forEach( user =>{
            user.photo = config.url+ user.photo
        })
    
      
        data = {
            code: 20000,
            status:1,
            data: {
                items: result,
                total: total
            },
            message:[]
        }
      
        return data
    }
  
   
    async create(params) {
      let data = {}

      if (params.id == "") {  // 添加
      
        if (params.id !='' && params.username !== '' && params.phone !== '' && params.roles !== '') {
          
            let result = await DB.query(`
                insert into login(id,username,phone,roles)
                values('${uuid.v4()}','${params.username}','${params.phone}','${params.roles}')
            `)

            data = {
                code: 20000,
                data: {
                    msg: "添加成功",
                    msgData: result
                }
            }

        } else {
            data = {
                code: 400,
                data: {
                    msg: "缺少参数",
                    msgData: 'err'
                }
            }
        }
    } else {
        //修改、更新
        consoel.log(555)
    }
  
     
  
      return data
    }
  
   
    async update(params) {
      let data = {}

      if (params.id !='' && params.username !== '' && params.phone !== '' && params.roles !== '') {
        let result = await DB.query(`
                update  login set username = '${params.username}' ,
                phone = '${params.phone}',
                roles = '${params.roles}'
                where id = '${params.id}'
            `)

            data = {
                code: 20000,
                data: {
                    msg: "更新成功",
                    msgData: result
                }
            }

    }else{
        data = {
            code: 400,
            data: {
                msg: "缺少参数",
                msgData: 'err'
            }
        }
    }
    
  
      return data
    }
  
   /**
    * TODO 该接口有问题，表名写错
    * @param {*} id 
    */
    async destroy(id) {
      let data = {}

      

    if (id != undefined && id != null && id != '') {


        let result = await DB.query(`
            delete from sys_role where id = '${id}'
        `)

        data = {
            code: 20000,
            data: {
                msg: "删除成功",
                msgData: result
            }
        }

    } else {
        data = {
            code: 400,
            data: {
                msg: "id不可为空",
                msgData: 'err'
            }
        }
    }

   
  
      return data
    }
  
  
  }
  
  
  module.exports = SysUserService