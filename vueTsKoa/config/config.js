const config = {
    url: "http://localhost:3333",
    juheUrl: "http://apis.juhe.cn",
    javaUrl: 'http://zhengzemin.cn:8527/bk',
    push_wx_url: `https://sc.ftqq.com/SCU65367Tb142190d7d317c8d414738b1cca181fa5db93f74ea127.send`, // 微信通知（Server酱）
    barkUrl: 'https://api.day.app/uUmq8uxvBivZWNM56UvpVT'   // Bark
}

// 注意 配置  set NODE_ENV=production&&nodemon node bin/www && 前边不可以有空格，否则比较不相等
if (process.env.NODE_ENV == "production") {
    // 线上接口地址
    config.url = "http://zhengzemin.cn:3333"
    config.javaUrl = "http://zhengzemin.cn:8527/bk"
} else {
    // 测试接口地址
    config.url = "http://localhost:3333"
    config.javaUrl = "http://localhost:8627/bk"
}



module.exports = config