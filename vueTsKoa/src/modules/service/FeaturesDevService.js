/*
 * @Author: zemin zheng
 * @Date: 2021-04-17 20:42:03
 * @LastEditTime: 2021-04-18 17:12:26
 * @LastEditors: Please set LastEditors
 * @Description: 我的——功能开发 Service层
 * @FilePath: \vueTsKoa\src\service\FeaturesDevService.js
 */
const BaseService = require('@src/common/service/BaseService')

class FeaturesDevService {
  constructor(table){
    this.baseService = new BaseService(table)
  }
 
  async get(params) {
    return await this.baseService.get(params, 'create_time')
  }

 
  async create(params) {
    return await this.baseService.post(params)
  }

 
  async update(params) {
    return await this.baseService.put(params)
  }

 
  async destroy(id) {
    return await this.baseService.del(id)
  }
}


module.exports = FeaturesDevService