

if (process.env.NODE_ENV == "production") {
    // 线上接口地址
    //远程47.107.103.41
    module.exports = {
        host: '47.107.103.41', // 'localhost', //主机名，此处为本机
        user: 'root', //mysql 用户名
        password: 'root', //mysql 密码
        database: 'qynbgl' //连接的数据库
    };
}else{
    //公司的mysql
    module.exports = {
        host: 'localhost', //主机名，此处为本机
        user: 'root', //mysql 用户名
        password: 'root123', //mysql 密码
        database: 'qynbgl' //连接的数据库
    };
}








