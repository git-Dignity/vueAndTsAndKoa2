const config = {
    url: "http://localhost:3333"
}

// 注意 配置  set NODE_ENV=production&&nodemon node bin/www && 前边不可以有空格，否则比较不相等
if (process.env.NODE_ENV == "production") {
    // 线上接口地址
    config.url = "http://zhengzemin.cn:3333"
} else {
    // 测试接口地址
    config.url = "http://localhost:3333"
}



module.exports = config