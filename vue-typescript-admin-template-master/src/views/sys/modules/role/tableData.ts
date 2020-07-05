import { calendarTypeOptions, statusOptions } from '../options';

const roleTableColumns = {
    "name": {
        prop: "name",
        label: "角色名称",
        width: "180"
    },
    "roleKey": {
        prop: "roleKey",
        label: "roleKey",
        width: "180"
    },
    "roleType": {
        prop: "roleType",
        label: "角色类型",
        width: "180",
        render: (h: any, param: any) => formatterType(h)
    },
    "isSys": {
        prop: "isSys",
        label: "是否系统数据",
        width: "150",
        sortable: "true",
        render: (h: any, param: any) => formatterIsSys(h)
    },
    "remarks": {
        prop: "remarks",
        width: "180",
        label: "备注"
    },
    "handleRole": {
        prop: "handleRole",    
        label: "操作"
    }
}


const formatterType = (row: any) => {  // row, column
    let roleType = ""
    switch (row.roleType) {
        case `${calendarTypeOptions[0].value}`:
            roleType = calendarTypeOptions[0].label
            break;
        case `${calendarTypeOptions[1].value}`:
            roleType = calendarTypeOptions[1].label
            break;
        case `${calendarTypeOptions[2].value}`:
            roleType = calendarTypeOptions[2].label
            break;
    }

    return roleType;
}

const formatterIsSys = (row: any) => {
    let isSys = ""
    switch (row.isSys) {
        case statusOptions[0].value:
            isSys = statusOptions[0].label
            break;
        case statusOptions[1].value:
            isSys = statusOptions[1].label
            break;
    }

    return isSys;
}


export {
    roleTableColumns
}