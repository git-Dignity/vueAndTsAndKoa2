const util = require('util');
const redis = require('redis')
const redisInfo = require('../../config/redisInfo')
// const readRedis = require('./readRedis');
const pubSub = require('./pubSub')  // 封装好的订阅模式

var redisDB = {};

var client = redis.createClient(redisInfo.RDS_PORT, redisInfo.RDS_HOST)
client.auth(redisInfo.RDS_PASS);  
client.on('error', function (err) {
  console.log('Error ' + err);
});

client.on('connect',function () {
    console.log('redis连接成功...')
});

// monitor事件可以监听到redis收到的所有客户端命令
client.monitor(function(err, res) {
    // console.log(res);   // ok
})
client.on("monitor", function (time, args) {
    // console.log(time + ": " + util.inspect(args));            
});









/**
 * string(字符串)
 * @param dbNum 库号，如果不传，默认库号为1
 * @param key 键
 * @param value 值
 * @param expire 过期时间（单位：秒，可为空，为空则不过期）
 * @param callback 回调
 * 在Redis使用set方法设置key-value时，设置成功则result返回OK。
 */
redisDB.set = function (key, value, callback, expire, dbNum) {
    // Redis有16个库，上述代码中的client.select()中的参数就是选择库号。
    dbNum = dbNum==null?redisInfo.RDS_DBNUM:dbNum;

    client.select(dbNum,function (err) {
        if (err){
            console.log('redis set 选库失败：'+err);
        }else {
            client.set(key,value,function (err,result) {
                if (err){
                    console.log('redis set 插入失败：'+err);
                    callback(err,null);
                    return
                }
                if (!isNaN(expire) && expire>0){
                    client.expire(key, parseInt(expire));
                }
                callback(null,result);
            })
        }

    })
};


/**
 * string(字符串)
 * @param key 键
 * @param callback 回调
 * @param dbNum 库号，如果不传，默认库号为1
 * 在Redis使用get方法获取value时，当key不存在的时候，result返回null
 */
redisDB.get = function (key, callback, dbNum) {
    dbNum = dbNum==null?redisInfo.RDS_DBNUM:dbNum;

    client.select(dbNum,function (err) {
        if (err){
            console.log('redis get 选库失败：'+err);
        }else {
            client.get(key,function (err,result) {
                if (err){
                    console.log('redis get 获取失败：'+err);
                    callback(err,null);
                    return
                }
                callback(null,result);
            })
        }
    })
};


/**
 * hash(哈希)
 * @param dbNum 库号，如果不传，默认库号为1
 * @param key 键
 * @param value 值
 * @param expire 过期时间（单位：秒，可为空，为空则不过期）
 * @param callback 回调
 * 哈希表有点类似ES6中的Map。{age: '2-year-old', sex: 'male'}
 * 注意：对象数组map这些集合都不能是嵌套的关系，如果要嵌套，请序列化转string
 * JSON.stringify(data)、 JSON.parse(result)
 */
redisDB.hmset = function (key, value, callback, expire, dbNum) {
 
    // Redis有16个库，上述代码中的client.select()中的参数就是选择库号。
    dbNum = dbNum==null?redisInfo.RDS_DBNUM:dbNum;
    
    client.select(dbNum,function (err) {
        if (err){
            console.log('redis hmset 选库失败：'+err);
        }else {
            client.hmset(key,value,function (err,result) {
                if (err){
                    console.log('redis hmset 插入失败：'+err);
                    callback(err,null);
                    return
                }
                if (!isNaN(expire) && expire>0){
                    client.expire(key, parseInt(expire));
                }
                callback(null,result);
            })
        }

    })
};


/**
 * hash(哈希)
 * @param key 键
 * @param callback 回调
 * @param dbNum 库号，如果不传，默认库号为1
 * 通过key获取对象值
 */
redisDB.hkeys  = function (key, callback, dbNum) {
    dbNum = dbNum==null?redisInfo.RDS_DBNUM:dbNum;

    client.select(dbNum,function (err) {
        if (err){
            console.log('redis hkeys 选库失败：'+err);
        }else {
            client.hkeys(key,function (err,result) {
                if (err){
                    console.log('redis hkeys 获取失败：'+err);
                    callback(err,null);
                    return
                }
                callback(null,result);
            })
        }
    })
};



/**
 * sets(集合)
 * @param dbNum 库号，如果不传，默认库号为1
 * @param key 键
 * @param value 值
 * @param expire 过期时间（单位：秒，可为空，为空则不过期）
 * @param callback 回调
 * 对数组去重，然后合并成数组返回
 * 类似JS中的Set，集合中的元素必须是唯一的，其性能: 大O表示法中的O(1)
 * sadd('ip','192.168.3.7')、sadd('ip','192.168.3.7')、sadd('ip','192.168.3.17')  => smembers('ip') => [ '192.168.3.7', '192.168.3.17' ]
 */
redisDB.sadd = function (key, value, callback, expire, dbNum) {
 
    // Redis有16个库，上述代码中的client.select()中的参数就是选择库号。
    dbNum = dbNum==null?redisInfo.RDS_DBNUM:dbNum;
    
    client.select(dbNum,function (err) {
        if (err){
            console.log('redis sadd 选库失败：'+err);
        }else {
            client.sadd(key,value,redis.print)
        }

    })
};


/**
 * sets(集合)
 * @param key 键
 * @param callback 回调
 * @param dbNum 库号，如果不传，默认库号为1
 * 通过key获取去重数组
 * sadd('ip','192.168.3.7')、sadd('ip','192.168.3.7')、sadd('ip','192.168.3.17')  => smembers('ip') => [ '192.168.3.7', '192.168.3.17' ]
 */
redisDB.smembers  = function (key, callback, dbNum) {
    dbNum = dbNum==null?redisInfo.RDS_DBNUM:dbNum;

    client.select(dbNum,function (err) {
        if (err){
            console.log('redis smembers 选库失败：'+err);
        }else {
            client.smembers(key,function (err,result) {
                if (err){
                    console.log('redis smembers 获取失败：'+err);
                    callback(err,null);
                    return
                }
                callback(null,result);
            })
        }
    })
};


/**
 * sets(集合)
 * @param obj1 数组1
 * @param obj2 数组2
 * @param callback 回调
 * @param dbNum 库号，如果不传，默认库号为1
 * 通过obj1、obj2获取交集，返回数组
 */
redisDB.sinter  = function (obj1, obj2, callback, dbNum) {
    let objName1 = obj1
    let obj2Name = obj2
    dbNum = dbNum==null?redisInfo.RDS_DBNUM:dbNum;

    client.select(dbNum,function (err) {
        if (err){
            console.log('redis sinter 选库失败：'+err);
        }else {
            client.sadd('objName1',obj1, function(err,data) {
                client.sadd('obj2Name', obj2, function(err, data) {
                    client.sinter('objName1','obj2Name', function(err,result) {
                        if (err){
                            console.log('redis sinter 获取失败：'+err);
                            callback(err,null);
                            return
                        }
                        callback(null,result); 
                    });
                  
                })
            });
        }
    })
};


/**
 * sets(集合)
 * @param obj1 数组1
 * @param obj2 数组2
 * @param callback 回调
 * @param dbNum 库号，如果不传，默认库号为1
 * 通过obj1、obj2获取补集（obj1是大的集合，obj2是小的集合，返回obj1除掉obj2和obj1的交集的数据），返回数组
 */
redisDB.sdiff  = function (obj1, obj2, callback, dbNum) {
    let objName1 = obj1
    let obj2Name = obj2
    dbNum = dbNum==null?redisInfo.RDS_DBNUM:dbNum;

    client.select(dbNum,function (err) {
        if (err){
            console.log('redis sdiff 选库失败：'+err);
        }else {
            client.sadd('objName1',obj1, function(err,data) {
                client.sadd('obj2Name', obj2, function(err, data) {
                    client.sdiff('objName1','obj2Name', function(err,result) {
                        if (err){
                            console.log('redis sdiff 获取失败：'+err);
                            callback(err,null);
                            return
                        }
                        callback(null,result); 
                    });
                  
                })
            });
        }
    })
};




// 发布订阅消息

// clientA订阅了main_chat_room，这时clientA捕获到订阅事件，执行回调函数，clientB向main_chat_room发送了一条信息Hello world!
// clientA接受到信息后，在控制台打印出了相关信息。

// var clientA = redis.createClient(redisInfo.RDS_PORT, redisInfo.RDS_HOST)
// var clientB = redis.createClient(redisInfo.RDS_PORT, redisInfo.RDS_HOST)
// clientA.auth(redisInfo.RDS_PASS);
// clientB.auth(redisInfo.RDS_PASS);

// clientA.on('message', function(channel, message) {
//   console.log('Client A got message from channel %s: %s', channel, message);
// });
// clientA.on('subscribe', function(channel, count) {
//   clientB.publish('main_chat_room', 'Hello world!');
// });

// clientA.subscribe('main_chat_room');

// result => Client A got message from channel main_chat_room: Hello world!





// let sub = redis.createClient(6379, '127.0.0.1');   // 监听消费者
//  let pub = redis.createClient(6379, '127.0.0.1');   // 生产者
//  let pub1 = redis.createClient(6379, '127.0.0.1');   // 生产者
 
//  // 在sub开始监听时允许触发subscribe事件进行操作,类似连接数据库的connect事件
//  sub.on('subscribe', function(channel, count) {
//      console.log(`${channel}:${count}`);               //  test channel:1
    
//  })
//  sub.on('message', function(channel, message) {
  
//      console.log(`${channel}-message:${JSON.stringify(message)}`)    // test channel-message:"channel message test"
//  })


//  sub.subscribe(["testl"]);
// pub.publish('testl', "BBQ IS HERE"); //发布消息
// pub1.publish('testl', "BBQ IS HERE1111"); //发布消息







//这里建立了三个redis的客户端，为什么是3个呢？
//一个是发布，一个是订阅，一个是处理正常的req,res
//本来是想用订阅的client来处理的req,res,但是却报错
//后来查了以后才知道，原来如果此客户端订阅就不能下CRUD命令

// var clientSub = redis.createClient(6379, '127.0.0.1');
// var clientPub = redis.createClient(6379, '127.0.0.1');
// var clientPub1 = redis.createClient(6379, '127.0.0.1');
// var clientRes = redis.createClient(6379, '127.0.0.1');

// clientRes.on('ready', function(err){
//     console.log('hello, i handle req/res');
// });

// clientPub.on('ready', function (err) {
//     console.log('hello, i publish');
// });

// clientSub.on('ready', function (err) {
//     console.log('hello, i subscribe');
// });

// clientSub.subscribe('channel1'); //订阅channel1

// clientSub.on('subscribe', function (channel, count) {
//     console.log(`got subscribe event: ${channel} and count is ${count}`);
//     // setInterval(()=>{
//         clientPub.publish('channel1', `hi, i am channel one, message at ${new Date()}`);
//        console.log(9999)
//         clientPub1.publish('channel1', `hi, i am channel one, message at ${new Date()}`);
//     // }, 2000); //每2秒钟发个消息
// });

// clientSub.on('connect', function () {
//     clientSub.on('message', function (channel, message) {
//         var response = `received message from ${channel}:${message}`; //订阅客户端接收到消息
//         clientRes.lpush('myResponse11', response,redis.print); //接收到消息以后，由req/res客户端来存储消息
//     });
// });


// clientRes.lrange('myResponse11',0,-1, function(err, result){
//     console.log(11122453)
//     console.log(result);//拿出所有消息发到浏览器
// })  






// 在程序启动时，调用

// registerHandlers  注册特定通道的处理逻辑，然后调用
// subscribe  订阅通道。

// 在合适时机调用publish，这个机制可以实现分布式下所有客户端watch 同一个数据的更改。

// let channel="ryan";
//  pubSub.registerHandlers("ryan",msg=> console.log(msg));
//  pubSub.subscribe(channel);

//  pubSub.publish(channel,"hello from chen");








module.exports = redisDB;





// 接口使用
// 引入：var redisDB=require('../utils/redis');


// set
// redisDB.set('color','red',function(err,result){
//     if(err){
//         console.log(err)
//     }else{
//         console.log(result)
//     }
// }, 5000,1)


// get
// redisDB.get('color',function(err,result){
//     if(err){
//         console.log(err)
//     }else{
//         console.log(result)
//     }
// })


// hmset    存对象，不可嵌套对象
// redisDB.hmset('dfgh',{
//     age: '2-year-old',
//     sex: 'male'
//     }, function(err,result){
//     if(err){
//         console.log(err)
//     }else{
//         console.log(result)
//     }
// },50000,1)


// hkeys
// redisDB.hkeys('dfgh',function(err,result){
//     if(err){
//         console.log(err)
//     }else{
//         console.log(result)
//     }
// })


// sadd     对数组去重，然后合并成数组返回
// redisDB.sadd('ip','192.168.3.7', function(err,result){
//     if(err){
//       console.log(err)
//     }else{
//       console.log(result)
//     }
//   },50000,1)
//   redisDB.sadd('ip','192.168.3.19', function(err,result){
//     if(err){
//       console.log(err)
//     }else{
//       console.log(result)
//     }
//   },50000,1)
//   redisDB.sadd('ip','192.168.3.7', function(err,result){
//     if(err){
//       console.log(err)
//     }else{
//       console.log(result)
//     }
//   },50000,1)


// smembers     
// redisDB.smembers('ip',function(err,result){
//     if(err){
//       console.log(err)
//     }else{
//       console.log(result)
//     }
//   })

// result =>  ["192.168.3.7", "192.168.3.19"]  


// sinter   交集
// let db111 = ['mysql','redis','a','b'];
// let db222 = ['mongo','redis','s','a','d'];

// redisDB.sinter(db111, db222,function(err,result){
//     if(err){
//         console.log(err)
//     }else{
//         console.log(result)   
//     }
// })

// result =>  [ 'redis','a' ]


// sunion 并集
// let db111 = ['mysql','redis','a','b'];
// let db222 = ['mongo','redis','s','a','d'];

// redisDB.sunion(db111, db222,function(err,result){
//     if(err){
//         console.log(err)
//     }else{
//         console.log(result)   
//     }
// })

// result =>  [ 'redis', 'b', 'mysql', 'd', 'a', 'mongo', 's' ]


// sdiff 补集
// var aaaaa = ['11','2','3','b'];
// var db211sd22 = ['11','b','d'];

// redisDB.sdiff(aaaaa, db211sd22,function(err,result){
//     if(err){
//         console.log(err)
//     }else{
//         console.log(result)  
//     }
// })

// result => ['2', '3']




// 相关网站
// 安装redis：https://segmentfault.com/a/1190000015882650
// 下载redis：https://github.com/MicrosoftArchive/redis/releases
// redis使用：https://blog.csdn.net/wb_001/article/details/84856264
         //   https://www.cnblogs.com/zhaowinter/p/10776868.html





// watch函数：
// 在批量操作某个key过程中，如果有其他人也操作这个key，会使原本正常的命令变得异常。
// 为了解决这个问题，可以使用watch函数，把批量操作命令包裹到watch函数中。
// 例如：
// client.watch("koa",watchErr => {
// if(watchErr) throw watchErr;
// client.multi(.......
// });
