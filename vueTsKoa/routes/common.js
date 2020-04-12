var DB = require('../utils/mysqlDB')

class sqlModel{
    constructor(tableName){
        this.tableName = tableName
    }

    async getTotal(){
        let _sql = `select count(*) as count from ${this.tableName}`
        let result_sql = await DB.query( _sql)
        return result_sql[0].count
    }
}


module.exports = sqlModel