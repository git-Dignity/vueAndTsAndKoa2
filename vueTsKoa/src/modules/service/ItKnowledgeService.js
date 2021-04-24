/* 
 * @Author: zemin zheng
 * @Date: 2021-04-17 22:16:07
 * @LastEditTime: 2021-04-18 16:56:16
 * @LastEditors: Please set LastEditors
 * @Description: IT知识（前端、后端、前后端、算法、工具） Service层
 * @FilePath: \vueTsKoa\src\service\ItKnowledgeService.js
 */ 
var DB = require('@utils/sql/mysqlDB')
const config = require('@config/config');
const { uploadFile, unlinkSync } = require('@utils/upload')
const sqlModel = require('@utils/sql/sqlModel')

class ItKnowledgeService {
  constructor(){}
 
  async get(params) {
    const auth =  params.auth==undefined?'':params.auth
    const title =  params.title==undefined?'':params.title
    const type =  params.type==undefined?'':params.type
    const remarks =  params.remarks==undefined?'':params.remarks
    const uploadTime =  params.uploadTime==undefined?'':params.uploadTime
    const category =  params.category==undefined?'':params.category
    
    console.log(uploadTime)
   

    const pageNumLeft = (params.current - 1) * params.size;
    let sqlM = new sqlModel("itknowledge",`flag = '1' 
    and (auth =  '${auth}' or '${auth} '='')  
    and (title like '%${title}%')
    and (type like '%${type}%')
    and (remarks like '%${remarks}%')
    and (date(upload_time)= '${uploadTime}' or '${uploadTime}'='')  
    and (category =  '${category}' or '${category} '='')  
    `)
   

    let total = await sqlM.getTotal()
    
    
    let result = await DB.query(`
        select * from itknowledge as i
        where i.flag = '1' 
        and (i.auth =  '${auth}' or '${auth} '='')  
        and (i.title like '%${title}%')
        and (i.type like '%${type}%')
        and (i.remarks like '%${remarks}%')
        and (date(i.upload_time)= '${uploadTime}' or '${uploadTime}'='')
        and (i.category =  '${category}' or '${category} '='')  
        limit ${pageNumLeft},${params.size}
    `)

    if(result){
        result.forEach( user =>{
            user.photo = user.photo ? config.url+ user.photo : null
        })
    }

    
    console.log(result)

  
    return {
        code: 20000,
        status:1,
        data: {
            items: result,
            total: total
        },
        message:[]
    }

  }

 
  async create(params) {
    let result = {}
    let dataRes = {}
    console.log(params);
    
    const info = JSON.parse(params.body.info);
    let fileArr = Object.entries(params.files)
    let uploadUrlName = ''    // 放到哪个文件夹中

  // 哪个类型就添加到对应的文件夹
  switch(info.category){
    case 1:
        uploadUrlName = 'frontEnd'
        break
    case 2:
        uploadUrlName = 'rearEnd'
        break
    case 3:
        uploadUrlName = 'algorithm'
        break
    case 4:
        uploadUrlName = 'frontRearEnd'
        break
    case 5:
        uploadUrlName = 'tool'
        break
    default:
        uploadUrlName = 'frontEnd'

  }
 
  
  if (fileArr.length != 0) {
    result = await uploadFile(fileArr, 'itKnowledge/' + uploadUrlName)
    console.log(result)
    console.log(info, info.type)
    
    await DB.query(`
              insert into itknowledge(title,content,type,auth,remarks,category,photo,photo_name,random_num)
              values('${info.title}','${info.content}','${info.type}','${info.auth}','${info.remarks}','${info.category}','${result[0].fileUrl}','${result[0].fileName}','${result[0].randomNum}')
          `)
    if (result) {
      console.log("添加成功")
      dataRes =   {
        code: 20000,
        data: {
            msg: "添加成功",
            msgData: result
        }
    }
    } else {
      console.log(333)
      dataRes =   "添加失败！"
    }
  } else {
    console.log(4444)
    // 没有选择图片
    await DB.query(`
              insert into itknowledge(title,content,type,auth,remarks,category)
              values('${info.title}','${info.content}','${info.type}','${info.auth}','${info.remarks}','${info.category}')
          `)
   
      console.log("添加成功")
      dataRes =   {
        code: 20000,
        data: {
            msg: "添加成功",
            msgData: result
        }
    }
   
  }

  return dataRes
  }

 
  /**
   * 如果有修改图片，先把之前存在本地的图片删除
   * @param {*} params 
   */
  async update(params) {
    let result = {}
    let dataRes = {}
    const info = JSON.parse(params.body.info);
    let fileArr = Object.entries(params.files)
    console.log(info, fileArr)
    
    if (fileArr.length != 0) {
        console.log(' update image')

        // 删除旧图片文件
        let selectOneRes = await DB.query(`
            select * from itknowledge 
            where flag = '1' and
            id = '${info.id}'
        `)
        unlinkSync('itKnowledge/frontEnd', `${selectOneRes[0].random_num}_${selectOneRes[0].photo_name}`)
     

       

        result = await uploadFile(fileArr, 'itKnowledge/frontEnd')
        console.log(result)
        
        await DB.query(`
        update  itknowledge set title = '${info.title}',
            content = '${info.content}',
            type = '${info.type}',
            auth = '${info.auth}',
            remarks = '${info.remarks}',
            category = '${info.category}',
            photo = '${result[0].fileUrl}',
            photo_name = '${result[0].fileName}',
            random_num = '${result[0].randomNum}'
        where id = '${info.id}'
              `)
        if (result) {
          console.log("修改成功")
          dataRes =    {
            code: 20000,
            data: {
                msg: "修改成功",
                msgData: result
            }
        }
        } else {
          dataRes =   "更新失败！"
        }
      } else {
          console.log('no update image')
        await DB.query(`
        update  itknowledge set title = '${info.title}' ,
            content = '${info.content}',
            type = '${info.type}',
            auth = '${info.auth}',
            remarks = '${info.remarks}',
            category = '${info.category}'
        where id = '${info.id}'
              `)
      
          console.log("修改成功")
          dataRes =   {
            code: 20000,
            data: {
                msg: "修改成功",
                msgData: result
            }
        }
      
      }

      return dataRes
  }

 
  async destroy(id) {
    let data = {}
    if (id != undefined && id != null && id != '') {


      let result = await DB.query(`
      update  itknowledge set flag = '0' 
      where id = '${id}'
      `)

      data = {
          code: 20000,
          data: {
              msg: "删除成功",
              msgData: result
          }
      }

  } else {
      data = {
          code: 400,
          data: {
              msg: "id不可为空",
              msgData: 'err'
          }
      }
  }



  return data
  }
}


module.exports = ItKnowledgeService