/**
 * 文件上传 - 工具类 
 */

var fs = require('fs');
var path = require('path');


// 支持多文件上传到本地
const uploadFile = (fileArr,url) => {

  var resultArr = []
  fileArr.forEach(element => {

    // 防止文件命名一致，文件名后面加上时间的时分
    // const randomNum =  Math.floor((Math.random() * 9 + 1)*1000);
    const randomNum = new Date().getHours() + "" + new Date().getMinutes();

    // 创建可读流
    const reader = fs.createReadStream(element[1].path);
    let filePath = path.join(__dirname, `../public/node/upload/image/${url}/`) + `${randomNum}_${element[1].name}`;
    // let filePath = path.join(__dirname, '../public/upload/image/user/') + `/${element[1].name}`; 斜杆问题注意一下
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);

    resultArr.push({
      fileName: element[1].name,
      filePath: filePath.replace(new RegExp(/(\\)/, "g"), '\\/'),  // 上传到服务器上的真实路径（因为mysql插入反斜杠，会被吃掉）
      fileUrl: `/node/upload/image/${url}/${randomNum}_${element[1].name}`,  //给前端显示头像
      randomNum: randomNum
    })
  });

  return resultArr;
}


/**
 * 删除图片（单个）
 * @param {String} url 文件的路径，输入从`public/node/upload/image/`之后的路径
 * @param {String} name 文件名字
 */
const unlinkSync = (url, name) => {
  let filePath = path.join(__dirname, `../public/node/upload/image/${url}/`) + `${name}`;
  fs.unlinkSync(filePath);
}



module.exports = {
  uploadFile,
  unlinkSync
}




  // NodeJs koa2实现文件上传
  // 使用koa-body ：https://www.jianshu.com/p/34d0e1a5ac70

  // 删除图片
  // https://www.jb51.net/article/172779.htm

