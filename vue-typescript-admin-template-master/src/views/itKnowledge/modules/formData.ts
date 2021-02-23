import { typeOptions } from './options';


// 前端表单数据
const Form = {
    name: "undoneForm",
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
            label: 'content',
            name: "content",
            value: "",
            disabled: false,
            hidden: false,
            rule: {
                required: true, message: "内容不能为空"
            }
        },
        "type": {
            label: 'table.type',
            name: "type",
            value: "",
            isSelect: true,
            options: typeOptions,
            disabled: false,
            hidden: false,
            rule: {
                required: true, message: "类型不能为空"
            }
        },
        "photo": {
            label: 'sys.photo',
            name: "photo",
            value: "",
            isPhoto: true,
            childrenUploadImgData: {
                upload__text: "上传文章照片",
                type: "image_avatar",
                accept: ".png, .jpg, .gif, .jpeg",
                imageUrl: ''
            },
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





const initForm = (id="", title = "", content = "", type = "",photo="",remarks = "") =>{
    Form.info.id.value = id;
    Form.info.title.value = title;
    Form.info.content.value = content;
    Form.info.type.value = type;
    Form.info.photo.childrenUploadImgData.imageUrl = photo;
    Form.info.remarks.value = remarks;
}



export {
    Form,
    initForm
}