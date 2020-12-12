
const userTableColumns = {
    "username": {
        prop: "username",
        label: "用户名",
        width: "10%"
    },
    "photo": {
        prop: "photo",
        label: "头像",
        isPhoto:true,
        width: "10%"
    },
    "phone": {
        prop: "phone",
        label: "手机号码",
        width: "15%"
    },
    "roles": {
        prop: "roles",
        label: "角色",
        width: "15%",
        sortable: "true"
    },
    "handSolt": {
        prop: "handSolt",   
        width: "50%", 
        label: "操作"
    }
}



export {
    userTableColumns
}