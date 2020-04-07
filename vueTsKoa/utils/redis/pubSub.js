/*example:
* let channel="ryan";
 redis.pubSub.registerHandlers("ryan",msg=> console.log(msg));
 redis.pubSub.subscribe(channel);

 redis.pubSub.publish(channel,"hello from chen");*/
 const redisInfo = require('../../config/redisInfo')
 const redis = require('redis')

 class PubSub
 {
     constructor(){
         this.sub=this.initialclient()
         this.sub.auth(redisInfo.RDS_PASS);  
         this.handlers=new Map();
         this.subAction=(channle,message)=>{
             let actions= this.handlers.get(channle)||new Set();
             for(let action of actions)
             {
                 action(message);
             }
         }
         this.alredyPublishs=[];
         this.subConnected=false;
     }

     initialclient() {
        
        return redis.createClient(redisInfo.RDS_PORT, redisInfo.RDS_HOST)
    }
     publish(channel,message)
     {
         let action=()=>{
             let pub=this.initialclient();
             pub.auth(redisInfo.RDS_PASS);  
             pub.publish(channel,message);
         };
         if(this.subConnected===false)
         {
             this.alredyPublishs.push(action);
         }
         else
             action();
     }
     registerHandlers(channel,action)
     {
        var actions=this.handlers.get(channel)||new Set();
        actions.add(action);
        this.handlers.set(channel,actions);
     }
     subscribe(channel)
     {
         let self=this;
         this.sub.subscribe(channel,function (err,reply) {
             if(err)
                 log.error(err);
             self.subConnected=true;
             for(let publish of self.alredyPublishs)
                 publish();
             console.log(reply);
         });
 
         this.sub.on("message", function (channel, message) {
             self.subAction(channel,message);
         });
     }
 
     tearDown()
     {
         this.sub.quit();
        //  客户端断开redis连接(如果当前有正在执行的命令，则等待这些命令都执行完成后才会真正断开)
     }
 }


let pubsub = new PubSub()
module.exports = pubsub;