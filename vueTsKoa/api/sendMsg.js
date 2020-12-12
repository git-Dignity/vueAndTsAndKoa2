const { barkUrl, push_wx_url } = require('@config/config.js')
const querystring = require('querystring');
const { get } = require('@utils/request.js')


/**
 * 发送到Bark
 * @param {String} title  标题 
 */
const barkSend = (title="send") => {
    return new Promise( async (resolve, reject) => {
        const result = await get({
            uri: `${barkUrl}/${querystring.escape(title)}`,
            qs: {
                sound:'minuet', // 铃声类型
                automaticallyCopy: 1,   // 会自动复制推送内容
                copy: 'optional'    // 只会复制copy参数的值（锁屏左滑查看推送时）
            }
        })

        result.code === 200 ?  resolve(result) : reject(result)
    });
}


/**
 * 发送到微信（方糖）
 * @param {Object} qs 参数对象
 */
const serverJiangSend = (qs) => {
    return new Promise( async (resolve, reject) => {
        const result = await get({
            uri: push_wx_url,
            qs
        })


        result.errno === 0 ?  resolve(result) : reject(result)
    });
}









module.exports = {
    barkSend,
    serverJiangSend
}

