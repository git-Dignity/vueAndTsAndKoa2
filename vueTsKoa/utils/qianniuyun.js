var uuid = require('uuid');
var fs = require('fs');
// 上传到七牛
let qiniu = require('qiniu'); // 需要加载qiniu模块的
// 引入key文件
const QINIU = require('../config/qiniu.js')
const upToQiniu = (filePath, key) => {
    const accessKey = QINIU.accessKey
    const secretKey = QINIU.secretKey
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
    // bucket是存储空间名称
    const options = {
      scope: QINIU.bucket
    }
    const putPolicy =  new qiniu.rs.PutPolicy(options);
    // 生成token 作为个人七牛云账号的识别标识
    const uploadToken= putPolicy.uploadToken(mac);
  
    const config= new qiniu.conf.Config()
    // 空间对应的机房 一定要按自己属区Zone对象

    const localFile = filePath
    const formUploader = new qiniu.form_up.FormUploader(config)
    const putExtra = new qiniu.form_up.PutExtra()
    // 文件上传
    return new Promise((resolved, reject) => {
      // 以文件流的形式进行上传
      // uploadToken是token， key是上传到七牛后保存的文件名, localFile是流文件
      // putExtra是上传的文件参数，采用源码中的默认参数
      formUploader.putStream(uploadToken, key, localFile, putExtra, function (respErr, respBody, respInfo) {
        if (respErr) {
          reject(respErr)
        } else {
          resolved(respBody)
        }
      })
    })
  }


  

// 支持多文件上传到千牛云
const uploadToQiniu = (fileArr) => {
  var promiseTmp = []
  fileArr.forEach(element => {

    promiseTmp.push(new Promise((resolve, reject) => {
      // 命名文件
      const fileName = uuid.v1();
      // 创建文件可读流
      const reader = fs.createReadStream(element[1].path);
      // 获取上传文件扩展名
      const ext = element[1].name.split(".").pop();
      // 命名文件以及拓展名
      const fileUrl = `${fileName}.${ext}`;

      // 调用方法(封装在utils文件夹内)
      upToQiniu(reader, fileUrl).then(res => {
        let tmp = {
          id: fileName,
          hash: res.hash,
          key: res.key,
          fileType: element[1].type,
          fileName: element[1].name,
          fileSize: element[1].size,
          isSucess: 1
        }

        resolve(tmp)
      })
    }));

  });


  return Promise.all(promiseTmp).then((result) => {
    return result
  })
}


  module.exports = {
    upToQiniu,
    uploadToQiniu
    
}