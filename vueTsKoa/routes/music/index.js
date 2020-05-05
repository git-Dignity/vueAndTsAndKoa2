const router = require('koa-router')()
var uuid = require('uuid');
let func = require('../../utils/qianniuyun');  /*导入七牛文件   */
const formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var minioClient = require('../../config/minio.js');
var DB = require('../../utils/mysqlDB')
const sqlModel = require('../common')

router.prefix('/music')




router.post('/get', async (ctx, next) => {
  const req = ctx.request.body
  // console.log(req);
  let data = {}

  let result
  let sqlM
  const pageNumLeft = (req.pageNum - 1) * req.pageSize;

  if (req.form) {

    result = await DB.query(`
   select m.file_key, m.file_size, m.song_name, m.singer_name, m.song_type, s.file_key as songFileKey  from qiniu_music m inner join qiniu_song_img s on m.id=s.id 
   where m.singer_name = '${req.singerName}' and m.song_name like '%${req.form.song}%'
 limit ${pageNumLeft},${req.pageSize}
`)


    sqlM = new sqlModel("qiniu_music m inner join qiniu_song_img s on m.id=s.id ", `
m.singer_name = '${req.singerName}' and m.song_name like '%${req.form.song}%'
`)


  } else {
    
    result = await DB.query(`
   select m.file_key, m.file_size, m.song_name, m.singer_name, m.song_type, s.file_key as songFileKey  from qiniu_music m inner join qiniu_song_img s on m.id=s.id 
    where m.singer_name = '${req.singerName}' 
  limit ${pageNumLeft},${req.pageSize}
`)

    sqlM = new sqlModel("qiniu_music", `
singer_name = '${req.singerName}' 
`)


  }
  // console.log(result)

  let total = await sqlM.getTotal()
  // console.log(total);

  data = {
    code: 20000,
    data: {
      total: total,
      data: result
    }
  }



  ctx.body = data
})


router.post('/minio/get', async (ctx, next) => {
  const req = ctx.request.body

  // let sqlM = new sqlModel("sys_role")


  // let total = await sqlM.getTotal()
  // console.log(total);

  // let result = await DB.query(`
  //     select * from sys_role limit ${req.page},${req.limit}
  // `)


  // data = {
  //     code: 20000,
  //     data: {
  //         items: result,
  //         total: total
  //     }
  // }

  //列出全部文件夹
  // minioClient.listBuckets(function(err, buckets) {
  //     if (err) return console.log(err)
  //     console.log('buckets :', buckets)
  //   })

  //列出europetrip文件夹下的文件
  //       var stream = minioClient.listObjects('europetrip','', true)
  // stream.on('data', function(obj) { console.log(obj) } )
  // stream.on('error', function(err) { console.log(err) } )

  // var stream11 = minioClient.listObjectsV2('europetrip','', true,'')
  // stream11.on('data', function(obj) { console.log(obj) } )
  // stream11.on('error', function(err) { console.log(err) } )

  //创建
  // minioClient.makeBucket('asd', 'us-east-1', function(err) {
  //     if (err) return console.log('Error creating bucket.', err)
  //     console.log('Bucket created successfully in "us-east-1".')
  //   })

  //是否有这个文件夹
  // minioClient.bucketExists('mybucket', function(err, exists) {
  //     if (err) {
  //       return console.log(err)
  //     }
  //     if (exists) {
  //       return console.log('Bucket exists.')
  //     }
  //   })

  //下载文件
  // var size = 0
  // minioClient.fGetObject('europetrip', 'test.js', 'F:/tmp/test.js', function(err) {
  //   if (err) {
  //     return console.log(err)
  //   }
  //   console.log('success')
  // })

  // var file = 'F:/tmp/test.js'
  // var fileStream = Fs.createReadStream(file)
  // var fileStat = fs.stat(file, function(err, stats) {
  //   if (err) {
  //     return console.log(err)
  //   }
  //   minioClient.putObject('europetrip', '40mbfile', fileStream, stats.size, function(err, etag) {
  //     return console.log(err, etag) // err should be null
  //   })
  // })

  //获取文件信息
  // minioClient.statObject('europetrip', 'test.js', function(err, stat) {
  //     if (err) {
  //       return console.log(err)
  //     }
  //     console.log(stat)
  //   })


  // var objectsList = []

  // // List all object paths in bucket my-bucketname.
  // var objectsStream = minioClient.listObjects('europetrip', '', true)

  // objectsStream.on('data', function(obj) {
  //   objectsList.push(obj.name);
  //   console.log(objectsList)
  // })

  // objectsStream.on('error', function(e) {
  //   console.log(e);
  // })

  // objectsStream.on('end', function() {

  //     minioClient.removeObjects('europetrip',objectsList, function(e) {
  //     if (e) {
  //         return console.log('Unable to remove Objects ',e)
  //     }
  //     console.log('Removed the objects successfully')
  //   })

  // })

  //下载的临时url 7天
  // presigned url for 'getObject' method.
  // expires in a day.

  // minioClient.presignedUrl('GET', 'europetrip', '易燃易爆炸(Live) - 华晨宇.mp3', 24*60*60, function(err, presignedUrl) {
  //     if (err) return console.log(err)
  //     console.log(presignedUrl)
  //   })





  ctx.response.body = {
    code: 20000,
    data: req
  }
})



router.post('/upload', async (ctx, next) => {

  const musicInfo = JSON.parse(ctx.request.body.musicInfo);


  let result = {}

  try {
    // 前端必须以formData格式进行文件的传递
    // const file = ctx.request.files.file0; // 获取上传文件

    let fileArr = Object.entries(ctx.request.files)

    if (fileArr.length != 0) {
      result = await uploadToQiniu(fileArr)

      console.log(result)
      // 因为我现在是想插入到同一行，所以就不循环了
      // result.forEach(async element => {

      //   await DB.query(`
      //       insert into qiniu_music(id,file_hash,file_key,username,file_type,file_name,file_size,is_sucess, song_name, singer_name, song_type)
      //       values('${element.id}','${element.hash}','${element.key}','${ctx.request.body.username}','${element.fileType}','${element.fileName}','${element.fileSize}','${element.isSucess}', '${musicInfo.songName}', '${musicInfo.singerName}', '${musicInfo.songType}')
      //   `)
      // });

      // 插入到同一行
      // qiniu_music和qiniu_song_img，两个表的id是一样的，所以到时候可以做下关联
      await DB.query(`
                insert into qiniu_music(id,file_hash,file_key,username,file_type,file_name,file_size,is_sucess, song_name, singer_name, song_type)
                values('${result[0].id}','${result[0].hash}','${result[0].key}','${ctx.request.body.username}','${result[0].fileType}','${result[0].fileName}','${result[0].fileSize}','${result[0].isSucess}', '${musicInfo.songName}', '${musicInfo.singerName}', '${musicInfo.songType}')
            `)

      await DB.query(`
                insert into qiniu_song_img(id,file_hash,file_key,file_type,file_name,file_size,is_sucess)
                values('${result[0].id}','${result[1].hash}','${result[1].key}','${result[1].fileType}','${result[1].fileName}','${result[1].fileSize}','${result[1].isSucess}')
            `)



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



router.post('/minio/upload', async (ctx, next) => {
  let data = {}
  const req = ctx.request.files

  var fileName = req.file.name;
  var filePath = req.file.path;

  // Make a bucket called europetrip.
  // minioClient.makeBucket('europetrip', 'us-east-1', function (err) {
  // if (err) return console.log(err)

  // console.log('Bucket created successfully in "us-east-1".')

  var metaData = {
    'Content-Type': 'application/octet-stream',
    'X-Amz-Meta-Testing': 1234,
    'example': 5678
  }
  // Using fPutObject API upload your file to the bucket europetrip.
  //放在pic下的文件夹，可以在浏览器的minio那设置这个文件夹下的文件可读写
  minioClient.fPutObject('europetrip', `pic/${fileName}`, filePath, metaData, function (err, etag) {
    if (err) {
      data = {
        code: 20001,
        msg: 'err'
      }
    };
    console.log(etag)
    data = {
      code: 20000,
      msg: 'ok'
    }
  });

  console.log(data)


  ctx.response.body = data
})



//歌手
const { singerGet, singerUpload } = require('./singer/index')

router.post('/singer/get', singerGet)
router.post('/singer/upload', singerUpload)



module.exports = router
