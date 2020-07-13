
const userTableColumns = {
    "username": {
        prop: "username",
        label: "用户名",
        width: "180"
    },
    "photo": {
        prop: "photo",
        label: "头像",
        isPhoto:true,
        width: "180"
    },
    "phone": {
        prop: "phone",
        label: "手机号码",
        width: "180"
    },
    "roles": {
        prop: "roles",
        label: "角色",
        width: "150",
        sortable: "true"
    },
    "handSolt": {
        prop: "handSolt",    
        label: "操作"
    }
}



export {
    userTableColumns
}