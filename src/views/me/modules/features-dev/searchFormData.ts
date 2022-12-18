import { setType } from './formUtils';


// 前端表单数据
const searchForm = {
    name: "searchFormData",
    position: "right",
    size: "medium",
    inline: true,
    info: {
        "id": { 
            label: 'id',
            name: "id",
            value: "",
            disabled: false,
            hidden: true,
            // 规则必须也得定义在form绑定的model中
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
                required: false, message: ""
            }
        },
        "front_end": {
            label: 'route.frontEnd',
            name: "front_end",
            value: "",
            disabled: false,
            hidden: false,
            rule: {
                required: false, message: ""
            }
        },
        "node": {
            label: 'route.node',
            name: "node",
            value: "",
            disabled: false,
            hidden: false,
            rule: {
                required: false, message: ""
            }
        },
        "java":{
            label: 'route.java',
            name: "java",
            value: "",
            disabled: false,
            hidden: false,
            rule: {
                required: false, message: ""
            }
        },
        "database_sql":{
            label: 'route.sql',
            name: "database_sql",
            value: "",
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





const initSearchForm = (title = "", auth = "", type = "",uploadTime="",remarks = "") =>{
    searchForm.info.title.value = title;
    (searchForm as any).info.type.value = type;
    (searchForm as any).info.auth.value = auth;
    (searchForm as any).info.uploadTime.value = uploadTime;
    searchForm.info.remarks.value = remarks;
}


/**
 * 设置表单的type类型的option
 * @param type 类别（前端：1；后端：2）
 */
const setFormType = (type:number) =>{
    setType(type, searchForm)
}



export {
    searchForm,
    initSearchForm,
    setFormType
}