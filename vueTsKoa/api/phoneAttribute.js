/*
 * @Author: zemin zheng
 * @Date: 2021-04-18 21:50:01
 * @LastEditTime: 2021-04-18 22:08:27
 * @LastEditors: Please set LastEditors
 * @Description: 手机号码归属地
 * @FilePath: \vueTsKoa\api\phoneAttribute.js
 */
const { juheUrl } = require('@config/config.js')
const { get } = require('@utils/request.js')
 
/**
 * 获取手机号码归属地
 */
const getMobile = (req) => {
    return new Promise( async (resolve, reject) => {
        const result = await get({
            uri: juheUrl + '/mobile/get',
            qs: req
        })

        resolve(result)
    });
}




module.exports = {
    getMobile
}
