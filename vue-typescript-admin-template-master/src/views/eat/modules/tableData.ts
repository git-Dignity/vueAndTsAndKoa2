/*
 * @Author: your name
 * @Date: 2021-05-05 12:48:42
 * @LastEditTime: 2021-05-05 13:18:45
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue-typescript-admin-template-master\src\views\eat\modules\tableData.ts
 */
import { options } from './options';

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


/**
 * 将类型转为对应的中文
 * @param row 
 */
const formatterType = (row: any) => {  // row, column
    let type = ""
    switch (row.type) {
        case `${options[0].value}`:
            type = options[0].label
            break;
        case `${options[1].value}`:
            type = options[1].label
            break;
        case `${options[2].value}`:
            type = options[2].label
            break;
        default:
            type = options[1].label
    }

    return type;
}





export {
    columns,
    formatterType
   
}