import { setType } from "./formUtils";

// 功能开发表单数据（添加、修改）
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
        front_end: {
            label: "route.frontEnd",
            name: "front_end",
            value: "",
            disabled: false,
            isTextarea: true,
            hidden: false,
            rule: {
                required: false, message: ""
            }
        },
        node: {
            label: "route.node",
            name: "node",
            value: "",
            disabled: false,
            isTextarea: true,
            hidden: false,
            rule: {
                required: false, message: ""
            }
        },
        java: {
            label: "route.java",
            name: "java",
            value: "",
            disabled: false,
            isTextarea: true,
            hidden: false,
            rule: {
                required: false, message: ""
            }
        },
        database_sql: {
            label: "route.sql",
            name: "database_sql",
            value: "",
            isTextarea: true,
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

const initForm = (id = "", title = "", front_end = "", node = "", java = "", database_sql = "", remarks = "") => {
    Form.info.id.value = id;
    Form.info.title.value = title;
    Form.info.front_end.value = front_end;
    Form.info.node.value = node;
    Form.info.java.value = java;
    Form.info.database_sql.value = database_sql;
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
