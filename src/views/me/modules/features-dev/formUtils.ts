// Form工具方法

import { frontEndTypeOptions, rearEndTypeOptions, algorithmTypeOptions } from "./options";

/**
 * 设置表单的type类型的option
 * @param type 类别（前端：1；后端：2）
 */
const setType = (type: number, Form: any) => {
    switch (type) {
        case 1:
            Form.info.type.options = frontEndTypeOptions;
            break;
        case 2:
            Form.info.type.options = rearEndTypeOptions;
            break;
        case 3:
            Form.info.type.options = algorithmTypeOptions;
            break;
        default:
            Form.info.type.options = frontEndTypeOptions;
    }
};

export {
    setType
};
