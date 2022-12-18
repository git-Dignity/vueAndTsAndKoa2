import { setType } from "./formUtils";

// 前端表单数据（添加、修改）
const Form = {
    name: "undoneForm",
    position: "right",
    labelWidth: 140,
    size: "medium",
    info: {
        id: {
            label: "id",
            name: "id",
            value: "",
            disabled: true,
            hidden: true,
            rule: {
                required: false, message: ""
            }
        },
        title: {
            label: "table.title",
            name: "title",
            value: "",
            disabled: false,
            hidden: false,
            // 规则必须也得定义在form绑定的model中
            rule: {
                required: true, message: "标题不能为空"
            }
        },
        content: {
            label: "content",
            name: "content",
            value: "",
            disabled: false,
            hidden: false,
            rule: {
                required: true, message: "内容不能为空"
            }
        },
        type: {
            label: "table.type",
            name: "type",
            value: "",
            isSelect: true,
            multiple: true, // 是否开启多选
            options: [],
            disabled: false,
            hidden: false,
            rule: {
                required: true, message: "类型不能为空"
            }
        },
        photo_url: {
            label: "sys.photo",
            name: "photo_url",
            value: "",
            isPhoto: true,
            childrenUploadImgData: {
                upload__text: "上传文章照片",
                type: "image_avatar",
                accept: ".png, .jpg, .gif, .jpeg",
                imageUrl: ""
            },
            disabled: false,
            hidden: false,
            rule: {
                required: false, message: ""
            }
        },
        remarks: {
            label: "sys.remarks",
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
    file: ""
};

const initForm = (id = "", title = "", content = "", type = "", photo_url = "", remarks = "") => {
    Form.info.id.value = id;
    Form.info.title.value = title;
    Form.info.content.value = content;
    (Form.info.type as any).value = type ? type.split(",") : "";
    Form.info.photo_url.childrenUploadImgData.imageUrl = photo_url || require("@/assets/404-images/404.png");
    Form.info.remarks.value = remarks;
};

/**
 * 设置表单的type类型的option
 * @param type 类别（前端：1；后端：2）
 */
const setFormType = (type: number) => {
    setType(type, Form);
};

export {
    Form,
    initForm,
    setFormType
};
