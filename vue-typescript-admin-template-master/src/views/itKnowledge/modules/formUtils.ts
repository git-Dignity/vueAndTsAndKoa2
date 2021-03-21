// Form工具方法

import { frontEndTypeOptions, rearEndTypeOptions, algorithmTypeOptions, frontRearEndTypeOptions, toolTypeOptions } from './options';

/**
 * 设置表单的type类型的option
 * @param type 类别（前端：1；后端：2；算法：3；前后端：4；工具：5）
 */
const setType = (type:number, Form:any) =>{
    switch(type){
        case 1:
            Form.info.type.options = frontEndTypeOptions
            break
        case 2:
            Form.info.type.options = rearEndTypeOptions
            break
        case 3:
            Form.info.type.options = algorithmTypeOptions
            break
        case 4:
            Form.info.type.options = frontRearEndTypeOptions
            break
        case 5:
            Form.info.type.options = toolTypeOptions
            break
        default:
            Form.info.type.options = frontEndTypeOptions
    }
}



export {
    setType
}