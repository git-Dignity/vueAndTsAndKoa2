const router = require('koa-router')()
var uuid = require('uuid');
let func = require('../../../utils/qianniuyun');  /*导入七牛文件   */
const formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var minioClient = require('../../../config/minio.js');
var DB = require('../../../utils/mysqlDB')
const sqlModel = require('../../common')

// router.prefix('/music')


async function singerGet(ctx, next) {

    let sqlM = new sqlModel("qiniu_music")


    let total = await sqlM.getTotal()
    console.log(total);

    let  result = await DB.query(`
    select * from qiniu_music_singer 
  `)
  


    data = {
        code: 20000,
        data: {
            items: result,
            total: total
        }
    }



    ctx.response.body = data
}



async function singerUpload(ctx, next) {

    const singerInfo = JSON.parse(ctx.request.body.singerInfo);

    let result = {}

    try {
        // 前端必须以formData格式进行文件的传递
        // const file = ctx.request.files.file0; // 获取上传文件

        let fileArr = Object.entries(ctx.request.files)

        if (fileArr.length != 0) {
            result = await uploadToQiniu(fileArr)

            result.forEach(async element => {

                await DB.query(`
            insert into qiniu_music_singer(id,file_hash,file_key,file_type,file_name,file_size,is_sucess, singer_name)
            values('${element.id}','${element.hash}','${element.key}','${element.fileType}','${element.fileName}','${element.fileSize}','${element.isSucess}', '${singerInfo.singerName}')
        `)
            });


            if (result) {
                console.log("上传成功")
                ctx.response.body = result
            } else {
                console.log(333)
                ctx.response.body = "上传失败！"
            }
        } else {
            console.log(4444)
            ctx.response.body = "没有选择图片"
        }
    } catch (err) {
        console.log(err)
        console.log("err544")
        ctx.response.body = "err"
    }

    ctx.body = {
        code: 20000,
        result
    }
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
            func.upToQiniu(reader, fileUrl).then(res => {
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
    


module.exports = { singerGet, singerUpload }
