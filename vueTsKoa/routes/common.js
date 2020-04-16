var DB = require('../utils/mysqlDB')

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
        console.log(this.tableWhere)
        let _sql = `select count(*) as count from ${this.tableName} where ${this.tableWhere}`
        console.log(_sql)
        let result_sql = await DB.query( _sql)
        return result_sql[0].count
    }
}


module.exports = sqlModel