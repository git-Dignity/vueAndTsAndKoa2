//文件名为mysqlDB.js
var mysql = require('mysql');
var dbInfo = require('../config/dbInfo.js')

//建立连接的方法


function __connection(){

   var connection = mysql.createConnection(dbInfo);
   connection.connect();
   return connection;
}

exports.query=function(sql,parmas=null){
   //1.获取数据库连接对象
   var connection=__connection();
   return new Promise(function(reject,resolve){
   
   //2执行sql语句
 console.log('sql' + sql)
   connection.query(sql,parmas, function (error, results, fields) {
       if (error) {
          console.log(error)
          console.log('报错啦')
         // throw error
         reject("")
       };
       reject(results);
   
   });
   //3关闭连接
   connection.end();
   })
}

//这样就可以直接引入了
// const DB = require('./mysqlDB'); //引入上面封装的方法
// DB(sql); //参数为要用的sql语句
