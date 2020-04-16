const router = require('koa-router')()
var uuid = require('node-uuid');
const formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var minioClient = require('../../config/minio.js');
var DB = require('../../utils/mysqlDB')
const sqlModel = require('../common')

router.prefix('/music')



router.post('/get', async (ctx, next) => {
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





    ctx.response.body = req
})



router.post('/upload', async (ctx, next) => {
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
                    code:20001,
                    msg:'err'
                }
            };
            console.log(etag)
            data = {
                code:20000,
                msg:'ok'
            }
        });

        console.log(data)
   

    ctx.response.body = data
})




module.exports = router
