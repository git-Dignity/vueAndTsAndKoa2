/*
 * @Author: your name
 * @Date: 2021-04-18 17:23:13
 * @LastEditTime: 2021-04-18 17:23:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vueTsKoa\src\common\utils\schedule.js
 */

var schedule = require('node-schedule');

/**
 * 在指定时间执行方法
 * @param {Date} date new Date(2017, 11, 16, 16, 43, 0);
 * @param {Function} callback 回调函数
 * ege: 2014年2月14日，15:40执行
 */
const specifiedTime = (date, callback) =>{
    return schedule.scheduleJob(date, function(){
        callback()
    });
}


// To Do
// 每天下午h点m分定时执行
// 指定时间间隔
// 每什么执行一次 
// 只能传一个参数
// 支持 second,minute,hour,date,dayOfWeek,month,year 要传两个参数，一个是数字，一个是标记类型
// 先这样子吧
const specifyTimeInterval = (h = 17, m = 21, callback) =>{
    h = parseInt(h)
    m = parseInt(m)
    return schedule.scheduleJob({hour:h, minute:m}, function(){
        callback()
    });

}



module.exports = {
    specifiedTime,
    specifyTimeInterval
}



// https://blog.csdn.net/ffzhihua/article/details/81564107?utm_medium=distribute.pc_relevant.none-task-blog-title-2&spm=1001.2101.3001.4242
// node定时任务——node-schedule模块使用说明：https://www.cnblogs.com/duhuo/p/4432921.html
// NodeJs实现定时任务的示例代码：https://blog.csdn.net/ffzhihua/article/details/81564107?utm_medium=distribute.pc_relevant.none-task-blog-title-2&spm=1001.2101.3001.4242
// node-schedule 全局内关闭定时器：https://segmentfault.com/a/1190000018849674