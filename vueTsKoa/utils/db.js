var mysql = require('mysql');
var xss = require('node-xss').clean;
var dbInfo = require('../config/dbInfo.js')

var dbSql = mysql.createPool(dbInfo);
var db =  function(sql,callback){

    dbSql.getConnection(  function(err,conn){
        if(err){
            callback(err,null);
        }else{
            // console.log(xss(sql))
             conn.query(xss(sql),function(err,results){
                callback(err,results);
            });
            conn.release();
        }
    });
};



 
module.exports = db;


// 400错误请求：由于格式错误，服务器无法理解请求。 客户端不应该在没有修改的情况下重复请求。




// Node.js 项目中解决 SQL 注入和 XSS 攻击
// https://blog.csdn.net/weixin_34384557/article/details/93991777

// SQL 注入
// 符号 ‘--’ 后面的语句相当于被注释了
// select username from users where username='test -- ' and password='111';
// 对方输入username对上了，密码随便输，就可以登录成功
// 预防 sql 注入，escape(username)

// xss攻击
// 文本框中恶意输入：<script> alert(document.cookie) </script>
// 就可以获取用户 cookie 了。
// 使用xss在 input 输入框 恶意输入 <script> alert(1) </script>, 就会被转换为下面的语句并存入数据库：
// &lt;script&gt; alert(1) &lt;/script&gt;，已达到无法执行 <script> 的目的。