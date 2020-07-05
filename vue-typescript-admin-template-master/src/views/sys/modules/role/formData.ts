import { calendarTypeOptions, statusOptions } from '../options';

// 角色表单数据
const sysRoleForm = {
    name: "sysRoleForm",
    position: "right",
    labelWidth: 120, 
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

        "name": {
            label: 'sys.name',
            name: "name",
            value: "",
            disabled: false,
            hidden: false,
            // 规则必须也得定义在form绑定的model中
            rule: {
                required: true, message: "角色名不能为空"
            }
        },
        "roleKey": {
            label: 'sys.roleKey',
            name: "roleKey",
            value: "",
            disabled: false,
            hidden: false,
            rule: {
                required: true, message: "英文名不能为空"
            }
        },
        "roleType": {
            label: 'sys.roleType',
            name: "roleType",
            value: "",
            isSelect: true,
            options: calendarTypeOptions,
            disabled: false,
            hidden: false,
            rule: {
                required: true, message: "角色类型不能为空"
            }
        },
        "isSys": {
            label: 'sys.isSys',
            name: "isSys",
            value: 0,
            isSelect: true,
            options: statusOptions,
            disabled: false,
            hidden: false,
            rule: {
                required: true, message: "是否系统数据不能为空"
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
        },
        "routes": {
            label: 'sys.routes',
            name: "routes",
            value: "",
            isTree: true,
            disabled: false,
            hidden: false,
            rule: {
                required: false, message: ""
            }
        },
    }
}


const initSysRoleForm = (id="", name = "", roleKey = "", roleType = "", isSys = 0, remarks = "") =>{
    sysRoleForm.info.id.value = id;
    sysRoleForm.info.name.value = name;
    sysRoleForm.info.roleKey.value = roleKey;
    sysRoleForm.info.roleType.value = roleType;
    sysRoleForm.info.isSys.value = isSys;
    sysRoleForm.info.remarks.value = remarks;
}



export {
    sysRoleForm,
    initSysRoleForm
}