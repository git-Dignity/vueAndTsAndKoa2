/*
 * @Author: your name
 * @Date: 2021-10-06 14:50:44
 * @LastEditTime: 2021-10-06 18:09:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vueAndTsAndKoa2\src\views\usualWebsite\modules\formData.ts
 */
import { setType } from './formUtils';


// 常用图层表单数据（添加、修改）
const Form = {
    name: "usualWebsiteForm",
    position: "right",
    labelWidth: 140, 
    size: "medium",
    info: {
        "id": {
            label: 'id',
            name: "id",
            value: "",
            disabled: true,
            hidden: true,
            rule: {
                required: false, message: ""
            }
        },
        "title": {
            label: 'table.title',
            name: "title",
            value: "",
            disabled: false,
            hidden: false,
            // 规则必须也得定义在form绑定的model中
            rule: {
                required: true, message: "标题不能为空"
            }
        },
        "content": {
            label: 'route.desc',
            name: "content",
            value: "",
            disabled: false,
            isTextarea: true,
            hidden: false,
            rule: {
                required: false, message: ""
            }
        },
        "photo_url": {
            label: 'sys.photo',
            name: "photo_url",
            value: "",
            isTextarea: true,
            disabled: false,
            hidden: false,
            rule: {
                required: false, message: ""
            }
        },
        "website_url":{
            label: 'route.websiteUrl',
            name: "website_url",
            value: "",
            isTextarea: true,
            disabled: false,
            hidden: false,
            rule: {
                required: false, message: ""
            }
        },
        "type": {
            label: 'table.type',
            name: "type",
            isSelect: true,
            multiple: true, // 是否开启多选
            options: [],
            disabled: false,
            hidden: false,
            rule: {
                required: true, message: "类型不能为空"
            }
        },
        "remarks": {
            label: 'sys.remarks',
            name: "remarks",
            value: "",
            isTextarea: true,
            disabled: false,
            hidden: false,
            rule: {
                required: false, message: ""
            }
        }
    },
    file:""
}



const initForm = (id="", title = "", content = "", photo_url = "",website_url = "",type="",remarks = "") =>{
    Form.info.id.value = id;
    Form.info.title.value = title;
    Form.info.content.value = content;
    Form.info.photo_url.value = photo_url;
    Form.info.website_url.value = website_url;
    (Form.info.type as any).value = type? type.split(",") : "";
    Form.info.remarks.value = remarks;
}



/**
 * 设置表单的type类型的option
 * @param type 类别（编程：1；后端：2）
 */
const setFormType = (type:number) =>{
    setType(type, Form)
}



export {
    Form,
    initForm,
    setFormType
}


