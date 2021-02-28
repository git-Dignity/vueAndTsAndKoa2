import { setType } from './formUtils';


// 前端表单数据
const Form = {
    name: "searchFormData",
    position: "right",
    size: "medium",
    inline: true,
    info: {
        "title": {
            label: 'table.title',
            name: "title",
            value: "",
            disabled: false,
            hidden: false,
            // 规则必须也得定义在form绑定的model中
            rule: {
                required: false, message: ""
            }
        },
        "type": {
            label: 'table.type',
            name: "type",
            value: "",
            isSelect: true,
            options: [],
            disabled: false,
            hidden: false,
            rule: {
                required: false, message: ""
            }
        },
        "auth": {
            label: 'sys.auth',
            name: "auth",
            value: "",
            isSelect: true,
            options: [],
            disabled: false,
            hidden: false,
            rule: {
                required: false, message: ""
            }
        },
        "uploadTime":{
            label: 'sys.uploadTime',
            name: "uploadTime",
            value: "",
            isDate: true,
            valueFormat: 'yyyy-MM-dd',
            disabled: false,
            hidden: false,
            rule: {
                required: false, message: ""
            }
        },
        "remarks": {
            label: 'sys.remarks',
            name: "remarks",
            value: "",
            disabled: false,
            hidden: false,
            rule: {
                required: false, message: ""
            }
        }
    },
    isSlot:true // 一般显示查询重置按钮
}





const initForm = (title = "", auth = "", type = "",uploadTime="",remarks = "") =>{
    Form.info.title.value = title;
    Form.info.type.value = type;
    Form.info.auth.value = auth;
    Form.info.uploadTime.value = uploadTime;
    Form.info.remarks.value = remarks;
}


/**
 * 设置表单的type类型的option
 * @param type 类别（前端：1；后端：2）
 */
const setFormType = (type:number) =>{
    setType(type, Form)
}



export {
    Form,
    initForm,
    setFormType
}