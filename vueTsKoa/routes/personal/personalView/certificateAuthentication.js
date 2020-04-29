const router = require('koa-router')()
var uuid = require('uuid');
let func = require('../../../utils/qianniuyun');  /*导入七牛文件   */
const formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var DB = require('../../../utils/mysqlDB')
const sqlModel = require('../../common')

router.prefix('/certificateAuthentication')


router.post('/getCertificate', async (ctx, next) => {
  const req = ctx.request.body
  let data = {}
  // let reqArr = Object.entries(req)
  console.log(req)
  // console.log(reqArr)
  // 6-(2-1)   6*2

  let result 
  let sqlM 

  if(req.form){
    startDate =  req.form.date[0]==undefined?'':req.form.date[0]
    endDate =  req.form.date[1]==undefined?'':req.form.date[1]

     result = await DB.query(`
    select * from qiniu_photo where username = '${req.username}' 
    and ( file_name = '${req.form.fileName}' or '${req.form.fileName}'='')
    and ( upload_time > STR_TO_DATE('${startDate}','%Y-%m-%d') or '${startDate}'='')
    and ( upload_time < STR_TO_DATE('${endDate}','%Y-%m-%d') or '${endDate}'='')
    limit ${6 * (req.pageNum - 1)},${6 * (req.pageNum)}
`)

 sqlM = new sqlModel("qiniu_photo",`
 username = '${req.username}' 
    and ( file_name = '${req.form.fileName}' or '${req.form.fileName}'='')
    and ( upload_time > STR_TO_DATE('${startDate}','%Y-%m-%d') or '${startDate}'='')
    and ( upload_time < STR_TO_DATE('${endDate}','%Y-%m-%d') or '${endDate}'='')
 `)
  }else{
     result = await DB.query(`
    select * from qiniu_photo where username = '${req.username}' 
    limit ${6 * (req.pageNum - 1)},${6 * (req.pageNum)}
`)

 sqlM = new sqlModel("qiniu_photo",`
 username = '${req.username}' 
 `)
  }


  
//   SELECT * from qiniu_photo where username = 'zheng' 
//   and ( file_type = 'image/png' or 'image/png'='')




// select *
// from (select t.*,case when '7d68cf76c8dde6e0cd30ea1a1c7c68f.png' = t.file_name then 1
// when '7d68cf76c8dde6e0cd30ea1a1c7c68f.png' = '' then 1 else 0 end idx
// from qiniu_photo t) view1
// where view1.username = 'zheng'
// and view1.idx = 1;

// SELECT * from qiniu_photo where username = 'zheng' 
// and upload_time > STR_TO_DATE('2020-04-10','%Y-%m-%d') AND upload_time < STR_TO_DATE('2020-04-17','%Y-%m-%d') 

    

    
    let total = await sqlM.getTotal()
    console.log(total);

    data = {
      code: 20000,
      data: {
        total: total,
        data: result
      }
    }
 


  ctx.body = data
})


router.post('/upload', async (ctx, next) => {

  let result = {}


  //存在本地文件
  // const file = ctx.request.files.file; // 获取上传文件
  // // console.log(file)
  // // 创建可读流
  // const reader = fs.createReadStream(file.path);
  // let filePath = path.join(__dirname, '../../../public/upload/') + `/${file.name}`;
  // // 创建可写流
  // const upStream = fs.createWriteStream(filePath);
  // // 可读流通过管道写入可写流
  // reader.pipe(upStream);

  try {
    // 前端必须以formData格式进行文件的传递
    // const file = ctx.request.files.file0; // 获取上传文件

    let fileArr = Object.entries(ctx.request.files)

    if (fileArr.length != 0) {
      result = await uploadToQiniu(fileArr)

      result.forEach(async element => {

        await DB.query(`
            insert into qiniu_photo(id,file_hash,file_key,username,file_type,file_name,file_size,is_sucess)
            values('${element.id}','${element.hash}','${element.key}','${ctx.request.body.username}','${element.fileType}','${element.fileName}','${element.fileSize}','${element.isSucess}')
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
})



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



module.exports = router
