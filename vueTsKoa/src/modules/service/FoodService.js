/*
 * @Author: your name
 * @Date: 2021-05-05 13:08:31
 * @LastEditTime: 2021-05-05 15:58:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vueTsKoa\src\modules\service\FoodService.js
 */

const config = require('@config/config');
const BaseService = require('@src/common/service/BaseService')

class FeaturesDevService {
  constructor(table){
    this.baseService = new BaseService(table)
  }
 
  async get(params) {
      let result = await this.baseService.get(params)
     
      if(result.data.items){
        result.data.items.forEach(food =>{
            food.photo = food.photo ? config.url+ food.photo : null
        })
    }
      
    return result
  }

 
  async create(params) {
    return await this.baseService.upAndPost(params)
  }

  
  async update(params) {
    return await this.baseService.upAndPut(params)
  }

 
  async destroy(id) {
    return await this.baseService.del(id)
  }
}


module.exports = FeaturesDevService