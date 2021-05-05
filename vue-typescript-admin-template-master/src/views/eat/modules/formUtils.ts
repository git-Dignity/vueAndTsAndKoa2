/*
 * @Author: your name
 * @Date: 2021-05-05 12:48:42
 * @LastEditTime: 2021-05-05 13:26:20
 * @LastEditors: Please set LastEditors
 * @Description: Form工具方法
 * @FilePath: \vue-typescript-admin-template-master\src\views\eat\modules\formUtils.ts
 */

import { options } from './options';

/**
 * 设置表单的type类型的option
 * @param type 类别（美食：1；）
 */
const setType = (type:number, Form:any) =>{
    switch(type){
        case 1:
            Form.info.type.options = options
            break
        default:
            Form.info.type.options = options
    }
}



export {
    setType
}