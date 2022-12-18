/*
 * @Author: your name
 * @Date: 2021-10-06 14:50:44
 * @LastEditTime: 2021-10-06 18:38:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vueAndTsAndKoa2\src\views\usualWebsite\modules\formUtils.ts
 */
// Form工具方法

import { programTypeOptions, designTypeOptions, toolTypeOptions, movieTypeOptions, otherTypeOptions } from "./options";

/**
 * 设置表单的type类型的option
 * @param type 类别（前端：1；后端：2）
 */
const setType = (type: number, Form: any) => {
    switch (type) {
        case 1:
            Form.info.type.options = programTypeOptions;
            break;
        case 2:
            Form.info.type.options = designTypeOptions;
            break;
        case 3:
            Form.info.type.options = toolTypeOptions;
            break;
        case 4:
            Form.info.type.options = movieTypeOptions;
            break;
        case 5:
            Form.info.type.options = otherTypeOptions;
            break;
        default:
            Form.info.type.options = programTypeOptions;
    }
};

export {
    setType
};
