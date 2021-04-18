/*
 * @Author: zemin zheng
 * @Date: 2021-04-18 16:47:59
 * @LastEditTime: 2021-04-18 16:55:35
 * @LastEditors: Please set LastEditors
 * @Description: sql语句的执行封装
 * @FilePath: \vueTsKoa\utils\sql\sqlModel.js
 */
var DB = require('@utils/sql/mysqlDB')

class sqlModel{
    constructor(tableName,tableWhere){
        this.tableName = tableName
        if(tableWhere){
            this.tableWhere = tableWhere
        }else{
            this.tableWhere = `''=''`
        }
    }

    async getTotal(){
        // console.log(this.tableWhere)
        let _sql = `select count(*) as count from ${this.tableName} where ${this.tableWhere}`
        // console.log(_sql)
        let result_sql = await DB.query( _sql)
        return result_sql[0].count
    }
}


module.exports = sqlModel