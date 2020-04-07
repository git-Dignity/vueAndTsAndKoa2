var redis = require("redis");
const redisInfo = require('../../config/redisInfo')

var client = redis.createClient(redisInfo.RDS_PORT, redisInfo.RDS_HOST)
var client1 = redis.createClient(redisInfo.RDS_PORT, redisInfo.RDS_HOST)
client.auth(redisInfo.RDS_PASS);
client1.auth(redisInfo.RDS_PASS);

function zadd(key, score, member) {
    client.zadd(key, score, member, function () {
        client.publish("chat", member);//client将member发布到chat这个频道
        //然后订阅这个频道的订阅者就会收到消息
    });
    client1.zadd(key, score, member, function () {
        client1.publish("chat1", member);//client将member发布到chat这个频道
        //然后订阅这个频道的订阅者就会收到消息
    });
}
for (var i = 0; i < 3; i++) {
    zadd("z", i, "" + i);//发布3次
    console.log("第" + i + "次");
}




// 保存数据到 Redis，然后将 member 值 publish 到 chat 频道（publish.js 功能）
// readRedis.js 文件此前一直在监听 chat 频道，readRedis.js 文件接收到 member 后，用它作为条件去 Redis 中去查找，拿到 score 数据


// NodeJS 操作 Redis 发布订阅消息: https://hacpai.com/article/1439377533985