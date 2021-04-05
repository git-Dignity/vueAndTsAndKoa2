# koa2后台node
1. node生成id ["node-uuid", "node-machine-id"]
1-1: node-uuid（生成唯一标识）看了下npm官网，下载量1,227,641
1-2：node-machine-id（唯一设备），下载量66,364
最后对比了一下，差了几十倍，最终选择node-uuid生成id
后面换版本，node-uuid废弃，使用uuid

2. SQL 注入和 XSS 攻击
2.1 SQL 注入:escape(username)
2.2 XSS 攻击: node-xss插件解决
使用：xss(sql)




# 项目结构

