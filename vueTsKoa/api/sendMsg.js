const { barkUrl, push_wx_url } = require('@config/config.js')
const { pass } = require('@config/qqMail.js')
const querystring = require('querystring');
const nodemailer = require("nodemailer");
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


/**
 * 发送qq邮件（支持多人）
 * @param {String} qq 对方qq邮箱 ege:1830803049@qq.com,1638153584@qq.com
 * @param {String} text 发送内容
 */
const qqMailSend = async (qqMail, text) => {
  var user = "1830803049@qq.com";//自己的邮箱
  var to = qqMail;  //对方的邮箱
  let transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 587,
    secure: false,
    auth: {
      user, // 用户账号
      pass, //授权码,通过QQ获取
    },
  });

  let qqMailArr = qqMail.split(",")
 

  qqMailArr.forEach(async (t) =>{
    await transporter.sendMail({
      from: `<${user}>`, // sender address
      to: `<${t}>`, // list of receivers
      subject: "喂，有好消息来了", // Subject line
      text: text, // plain text body
    });
  })


  
  console.log("发送QQ邮箱成功");
}











module.exports = {
    barkSend,
    serverJiangSend,
    qqMailSend
}

