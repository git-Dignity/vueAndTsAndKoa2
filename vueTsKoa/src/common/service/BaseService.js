/*
 * @Author: zemin zheng
 * @Date: 2021-04-18 16:52:55
 * @LastEditTime: 2021-05-05 16:20:54
 * @LastEditors: Please set LastEditors
 * @Description: 集成增删改查的Controller层简单处理
 * @FilePath: \vueTsKoa\src\common\service\BaseService.js
 */

var DB = require("@utils/sql/mysqlDB");
const sqlModel = require("@utils/sql/sqlModel");
const { uploadFile, unlinkSync, createFold } = require("@utils/upload");
const featuresEntity = require("../entity/FeaturesEntity");
const itknowledgeEntity = require("../entity/ItknowledgeEntity");
const foodEntity = require("../entity/FoodEntity");

/**
 * 封装增删改查
 */
class BaseService {
  constructor(tableName) {
    this.tableName = tableName;
    this.getEntity();
  }

  /**
   * 获取当前实体类
   */
  getEntity() {
    switch (this.tableName) {
      case "features":
        this.entity = featuresEntity;
        break;
      case "itknowledge":
        this.entity = itknowledgeEntity;
        break;
      case "food":
        this.entity = foodEntity;
        break;
    }
  }

  /**
   * 查询（支持分页，条件搜索）
   * orderCondition：order排序条件
   */
  async get(params, orderCondition = "") {
    let dataResult = {};
    const promiseRes = new Promise(async (resolve, reject) => {
      const pageNumLeft = (params.current - 1) * params.size;
      let condition = ""; // 条件
      let vars = {}; //批量定义变量
      // console.log(pageNumLeft);

      // 拼接实体中字段（拼成sql语句）
      for (const key in this.entity) {
        if (this.entity.hasOwnProperty(key)) {
          vars[key] = params[key] == undefined ? "" : params[key];
          let attr = ` and (${key} like '%${vars[key]}%' or '${vars[key]} '='') `;
          condition += attr;
        }
      }

      let sqlM = new sqlModel(this.tableName, `flag = '1' ${condition}`);
      let total = await sqlM.getTotal();
      orderCondition = orderCondition
        ? `order by i.${orderCondition} desc`
        : "";

      let result = null;
      // 如果该值为不是数字，则视为不分页
      if (isNaN(pageNumLeft)) {
        result = await DB.query(`
                    select * from ${this.tableName} as i
                    where i.flag = '1' 
                    ${condition}
                    ${orderCondition}
                `);
      } else {
        result = await DB.query(`
                    select * from ${this.tableName} as i
                    where i.flag = '1' 
                    ${condition}
                    ${orderCondition}
                    limit ${pageNumLeft},${params.size}
                `);
      }

      return resolve({
        code: 20000,
        status: 1,
        data: {
          items: result,
          total: total,
        },
        message: [],
      });
    });

    await promiseRes.then(
      (res) => {
        dataResult = res;
      },
      (err) => {
        dataResult = err;
      }
    );

    return dataResult;
  }

  /**
   * 添加
   */
  async post(params) {
    console.log(params);

    let dataResult = {};
    const promiseRes = new Promise(async (resolve, reject) => {
      let condition = "("; // 条件
      let k = "";
      let v = "";

      // 拼接实体中字段（拼成sql语句）
      for (const key in this.entity) {
        if (this.entity.hasOwnProperty(key)) {
          k += `${key},`;
          v += `'${params[key]}',`;
        }
      }
      k = k.substring(0, k.length - 1); // del  最后一个逗号
      v = v.substring(0, v.length - 1); // del  最后一个逗号
      condition += k + ") values(" + v + ")";

      const result = await DB.query(`
            insert into ${this.tableName}  ${condition}
            `);

      if (result) {
        return resolve({
          code: 20000,
          data: {
            msg: "添加成功",
            msgData: result,
          },
        });
      } else {
        return reject({
          code: 40002, // 参数约束请检查（参数不是期望的类型）
          data: {
            msg: "添加失败",
            msgData: result,
          },
        });
      }
    });

    await promiseRes.then(
      (res) => {
        dataResult = res;
      },
      (err) => {
        dataResult = err;
      }
    );

    return dataResult;
  }

  /**
   * 修改
   */
  async put(params) {
    let dataResult = {};
    const promiseRes = new Promise(async (resolve, reject) => {
      let condition = ""; // 条件

      if (!params.id) {
        console.log(111);

        return reject({
          code: 40002, // 参数约束请检查（参数不是期望的类型）
          data: {
            msg: "修改失败",
            msgData: "err",
          },
        });
      }

      console.log(2222);

      // 拼接实体中字段（拼成sql语句）
      for (const key in this.entity) {
        if (this.entity.hasOwnProperty(key)) {
          let attr = `${key} = '${params[key]}'`;
          condition += attr + ",";
        }
      }
      condition = condition.substring(0, condition.length - 1); // del  最后一个逗号
      const result = await DB.query(`
                update ${this.tableName} set ${condition}
                where id = '${params.id}'
            `);

      if (result) {
        return resolve({
          code: 20000,
          data: {
            msg: "修改成功",
            msgData: result,
          },
        });
      } else {
        return reject({
          code: 40002, // 参数约束请检查（参数不是期望的类型）
          data: {
            msg: "修改失败",
            msgData: result,
          },
        });
      }
    });

    await promiseRes.then(
      (res) => {
        dataResult = res;
      },
      (err) => {
        dataResult = err;
      }
    );

    return dataResult;
  }

  /**
   * 添加 && 上传图片
   * @param {*} params
   */
  async upAndPost(params) {
    console.log(params);
    const info = JSON.parse(params.body.info);
    let fileArr = Object.entries(params.files);

    let resultPhoto = {};
    let dataResult = {};
    const promiseRes = new Promise(async (resolve, reject) => {
      let condition = "("; // 条件
      let k = "";
      let v = "";

      // 拼接实体中字段（拼成sql语句）
      for (const key in this.entity) {
        if (this.entity.hasOwnProperty(key)) {
          k += `${key},`;
          v += `'${info[key]}',`;
        }
      }

      if (fileArr.length != 0) {
        await createFold(this.tableName);

        resultPhoto = await this.uploadPhoto({
          file: fileArr,
          filePath: this.tableName,
        });

        k += `photo,`;
        k += `photo_name,`;
        k += `random_num`;
        v += `'${resultPhoto[0].fileUrl}',`;
        v += `'${resultPhoto[0].fileName}',`;
        v += `'${resultPhoto[0].randomNum}'`;

        condition += k + ") values(" + v + ")";
        console.log(condition);

        const insertRes = await DB.query(`
            insert into ${this.tableName}  ${condition}
            `);

        if (resultPhoto && insertRes) {
          return resolve({
            code: 20000,
            data: {
              msg: "添加成功",
              msgData: resultPhoto,
            },
          });
        } else {
          return reject({
            code: 40002, // 参数约束请检查（参数不是期望的类型）
            data: {
              msg: "添加失败",
              msgData: result,
            },
          });
        }
      } else {
        console.log("没有选择图片");

        k = k.substring(0, k.length - 1); // del  最后一个逗号
        v = v.substring(0, v.length - 1); // del  最后一个逗号
        condition += k + ") values(" + v + ")";
        await DB.query(`
            insert into ${this.tableName}  ${condition}
          `);

        return resolve({
          code: 20000,
          data: {
            msg: "添加成功",
            msgData: resultPhoto,
          },
        });
      }
    });

    await promiseRes.then(
      (res) => {
        dataResult = res;
      },
      (err) => {
        dataResult = err;
      }
    );

    return dataResult;
  }

  /**
   * 修改 && 上传图片
   * @param {*} params 
   */
  async upAndPut(params) {
    let dataResult = {};
    let resultPhoto = {};
    const info = JSON.parse(params.body.info);
    let fileArr = Object.entries(params.files);
    const promiseRes = new Promise(async (resolve, reject) => {
      let condition = ""; // 条件

      console.log(info);
      

      if (!info.id) {
        console.log(111);

        return reject({
          code: 40002, // 参数约束请检查（参数不是期望的类型）
          data: {
            msg: "修改失败",
            msgData: "err",
          },
        });
      }

      // 拼接实体中字段（拼成sql语句）
      for (const key in this.entity) {
        if (this.entity.hasOwnProperty(key)) {
          let attr = `${key} = '${info[key]}'`;
          condition += attr + ",";
        }
      }

      if (fileArr.length != 0) {
        console.log(" update image");

        resultPhoto = await this.uploadPhoto({
          file: fileArr,
          id: info.id,
          filePath: this.tableName,
        });

        condition += `photo = '${resultPhoto[0].fileUrl}'` + ",";
        condition += `photo_name = '${resultPhoto[0].fileName}'` + ",";
        condition += `random_num = '${resultPhoto[0].randomNum}'`;

        const result = await DB.query(`
                update ${this.tableName} set ${condition}
                where id = '${info.id}'
            `);

        if (resultPhoto) {
          return resolve({
            code: 20000,
            data: {
              msg: "修改成功",
              msgData: result,
            },
          });
        } else {
          return reject({
            code: 40002, // 参数约束请检查（参数不是期望的类型）
            data: {
              msg: "修改失败",
              msgData: result,
            },
          });
        }
      } else {
        condition = condition.substring(0, condition.length - 1); // del  最后一个逗号
        const result = await DB.query(`
                update ${this.tableName} set ${condition}
                where id = '${info.id}'
            `);

        if (result) {
          return resolve({
            code: 20000,
            data: {
              msg: "修改成功",
              msgData: result,
            },
          });
        } else {
          return reject({
            code: 40002, // 参数约束请检查（参数不是期望的类型）
            data: {
              msg: "修改失败",
              msgData: result,
            },
          });
        }
      }
    });

    await promiseRes.then(
      (res) => {
        dataResult = res;
      },
      (err) => {
        dataResult = err;
      }
    );

    return dataResult;
  }

  /**
     * 上传图片（替换本地图片文件）
     * 支持添加上传图片、修改图片
     * @param {*} params 
     * params：{
     *  file: 文件对象,
        id: 该文件对应数据库存放id,
        filePath: 文件存放在本地哪个目录下（以：public\node\upload\image\xxx；该xxx就是传进来的值）
     * }
     */
  async uploadPhoto({ file, id, filePath }) {
    if (id) {
      let selectOneRes = await DB.query(`
                select * from ${this.tableName} 
                where flag = '1' and
                id = '${id}'
            `);

      // 删除旧图片文件
      if (selectOneRes[0].random_num && selectOneRes[0].photo_name) {
        unlinkSync(
          filePath,
          `${selectOneRes[0].random_num}_${selectOneRes[0].photo_name}`
        );
      }
    }

    // 上传文件到本地目录下
    const resultPhoto = await uploadFile(file, filePath);
    console.log(resultPhoto);

    return resultPhoto;
  }

  /**
   * 删除
   */
  async del(id) {
    let dataResult = {};
    const promiseRes = new Promise(async (resolve, reject) => {
      if (id != undefined && id != null && id != "") {
        let result = await DB.query(`
                    update  ${this.tableName} set flag = '0' 
                    where id = '${id}'
                `);

        return resolve({
          code: 20000,
          data: {
            msg: "删除成功",
            msgData: result,
          },
        });
      } else {
        return reject({
          code: 40002, // 参数约束请检查（参数不是期望的类型）
          data: {
            msg: "id不可为空",
            msgData: "err",
          },
        });
      }
    });

    await promiseRes.then(
      (res) => {
        dataResult = res;
      },
      (err) => {
        dataResult = err;
      }
    );

    return dataResult;
  }
}

module.exports = BaseService;
