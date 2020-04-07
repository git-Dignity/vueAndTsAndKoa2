var redis = require("redis");
const redisInfo = require('../../config/redisInfo')

var client = redis.createClient(redisInfo.RDS_PORT, redisInfo.RDS_HOST)
var client1 = redis.createClient(redisInfo.RDS_PORT, redisInfo.RDS_HOST)
client.auth(redisInfo.RDS_PASS);
client1.auth(redisInfo.RDS_PASS);

function getRedisData() {
    //客户端连接redis成功后执行回调
    client.on("ready", function () {
        //订阅消息
        client.subscribe("chat");
        client.subscribe("chat1");
        console.log("订阅成功。。。");
    });

    client.on("error", function (error) {
        console.log("Redis Error " + error);
    });

    //监听订阅成功事件
    client.on("subscribe", function (channel, count) {
        console.log("client subscribed to " + channel + "," + count + "total subscriptions");
    });

    //收到消息后执行回调，message是redis发布的消息
    client.on("message", function (channel, message) {
        console.log("我接收到信息了" + message);
        dealWithMsg(message);
    });

    client.on("error", function ( err) {
        console.log("redis error: " + JSON.stringify(err));
    });

    //监听取消订阅事件
    client.on("unsubscribe", function (channel, count) {
        console.log("client unsubscribed from" + channel + ", " + count + " total subscriptions")
    });
}

function dealWithMsg(message) {
    //按照message查询内容
    client1.zscore("z", message, function (err, reply) {
        console.log(message + "的内容是：" + reply);
    });
}


getRedisData();
