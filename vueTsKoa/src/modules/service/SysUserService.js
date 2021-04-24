/*
 * @Author: zemin zheng
 * @Date: 2021-04-18 22:24:54
 * @LastEditTime: 2021-04-24 15:54:35
 * @LastEditors: Please set LastEditors
 * @Description: 系统设置——用户管理 Service层
 * @FilePath: \vueTsKoa\src\modules\service\SysUserService.js
 */
var uuid = require("uuid");
var DB = require("@utils/sql/mysqlDB");
const sqlModel = require("@utils/sql/sqlModel");
const config = require("../../../config/config");
const BaseService = require("@src/common/service/BaseService");


class SysUserService {
  constructor(table) {
    this.baseService = new BaseService(table);
  }

  async get(params) {
      console.log(1111111111111222);
      
    let data = {};
    let sqlM = new sqlModel("login", `flag = '1'`);

    const pageNumLeft = (params.current - 1) * params.size;
    let total = await sqlM.getTotal();

    const userName = params.userName == undefined ? "" : params.userName;
    let result = await DB.query(`
            select * from login 
            where flag = '1' and  (username =  '${userName}' or '${userName} '='')
            limit ${pageNumLeft},${params.size}
        `);

    if (result) {
      result.forEach((user) => {
        user.photo = user.photo ? config.url + user.photo : null;
      });
    }

    data = {
      code: 20000,
      status: 1,
      data: {
        items: result,
        total: total,
      },
      message: [],
    };

    return data;
  }

  async create(params) {
    let data = {};
    let resultPhoto = {};
    const info = JSON.parse(params.body.info);
    let fileArr = Object.entries(params.files);

    if (fileArr.length != 0) {
      const resultPhoto = await this.baseService.uploadPhoto({
        file: fileArr,
        filePath: "user",
      });

      console.log(resultPhoto);

      const insertRes = await DB.query(`
              insert into login(id,username,phone,roles,photo,photo_name,random_num)
              values('${uuid.v4()}','${info.username}','${info.phone}','${
        info.roles
      }','${resultPhoto[0].fileUrl}','${resultPhoto[0].fileName}','${
        resultPhoto[0].randomNum
      }')
          `);

      if (resultPhoto && insertRes) {
        console.log("添加成功");
        data = {
          code: 20000,
          data: {
            msg: "添加成功",
            msgData: resultPhoto,
          },
        };
      } else {
        console.log(333);
        data = "添加失败！";
      }
    } else {
      console.log(4444);
      // 没有选择图片
      await DB.query(`
            insert into login(id,username,phone,roles)
               values('${uuid.v4()}','${info.username}','${info.phone}','${
        info.roles
      }')
          `);

      console.log("添加成功");
      data = {
        code: 20000,
        data: {
          msg: "添加成功",
          msgData: resultPhoto,
        },
      };
    }


    return data;
  }

  async update(params) {
    let data = {};
    let resultPhoto = {};
    const info = JSON.parse(params.body.info);
    let fileArr = Object.entries(params.files);
    if (fileArr.length != 0) {
      console.log(" update image");

      const resultPhoto = await this.baseService.uploadPhoto({
        file: fileArr,
        id: info.id,
        filePath: "user",
      });

      await DB.query(`
            update  login set username = '${info.username}' ,
            phone = '${info.phone}',
            roles = '${info.roles}',
            photo = '${resultPhoto[0].fileUrl}',
            photo_name = '${resultPhoto[0].fileName}',
            random_num = '${resultPhoto[0].randomNum}'
            where id = '${info.id}'
        `);
      if (resultPhoto) {
        console.log("更新成功");
        data = {
          code: 20000,
          data: {
            msg: "更新成功",
            msgData: resultPhoto,
          },
        };
      } else {
        data = "更新失败！";
      }
    } else {
      console.log("no update image");
      await DB.query(`
            update  login set username = '${info.username}',
            phone = '${info.phone}',
            roles = '${info.roles}'
            where id = '${info.id}'
          `);

      console.log("更新成功");
      data = {
        code: 20000,
        data: {
          msg: "更新成功",
          msgData: resultPhoto,
        },
      };
    }

    return data;
  }

  /**
   * @param {*} id
   */
  async destroy(id) {
    return await this.baseService.del(id)
  }
}

module.exports = SysUserService;
