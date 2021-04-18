/*
 * @Author: your name
 * @Date: 2021-04-18 21:58:46
 * @LastEditTime: 2021-04-18 22:07:19
 * @LastEditors: Please set LastEditors
 * @Description: API接口 Service层
 * @FilePath: \vueTsKoa\src\modules\service\ApiInterfaceService.js
 */
const { getMobile } = require('@api/phoneAttribute')
 
class ApiInterfaceService {
    constructor(){}
   
    /**
     * 获取手机号码归属地
     * @param {*} params 
     */
    async getMobile(params) {
        let data = {}
        const  mobileData =  await getMobile(params)

        data = {
            code: 20000,
            data: mobileData
        }
        return data
    }
  
   
    async create(params) {
      
    }
  
   
    async update(params) {
     
    }
  
   
    async destroy(id) {
     
    }
  
  }
  
  
  module.exports = ApiInterfaceService