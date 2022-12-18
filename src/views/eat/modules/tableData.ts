/*
 * @Author: zemin zheng
 * @Date: 2021-11-06 17:08:35
 * @LastEditTime: 2022-12-18 16:10:36
 * @LastEditors: zemin zheng
 * @Description: 头部注释
 * @FilePath: \vueAndTsAndKoa2\src\views\eat\modules\tableData.ts
 */


const columns = {
    "serialNum": {
        prop: "serialNum",
        label: "序号",
        width: "5%"
    },
    "title": {
        prop: "title",
        label: "标题",
        width: "5%"
    },
    "content": {
        prop: "content",
        label: "内容",
        width: "10%"
    },
    "type": {
        prop: "type",
        label: "类型",
        width: "5%"
    },
    "photo":{
        prop: "photo",
        label: "照片",
        width: "5%",
        isPhoto: true
    },
    "auth": {
        prop: "auth",
        label: "作者",
        width: "5%"
    },
    "remarks": {
        prop: "remarks",
        width: "10%",
        label: "备注"
    },
    "handSolt": {
        prop: "handSolt",   
        width: "20%", 
        label: "操作"
    }
}







export {
    columns,
   
}