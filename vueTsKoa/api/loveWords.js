const { barkUrl, push_wx_url } = require('@config/config.js')
const { pass } = require('@config/qqMail.js')
const querystring = require('querystring');
const nodemailer = require("nodemailer");
const { get } = require('@utils/request.js')


/**
 * 获取情话
 * @param {String} title  标题 
 */
const getLoveWords = () => {
    return new Promise( async (resolve, reject) => {
        const result = await get({
            uri: "https://chp.shadiao.app/api.php",
            qs: {}
        })

        resolve(result)
    });
}

getLoveWords()










module.exports = {
    getLoveWords
}

