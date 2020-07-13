

// 角色表单数据
const sysUserForm = {
    name: "sysUserForm",
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
        "username": {
            label: 'sys.user.name',
            name: "username",
            value: "",
            disabled: false,
            hidden: false,
            // 规则必须也得定义在form绑定的model中
            rule: {
                required: true, message: "用户名不能为空"
            }
        },
        "photo": {
            label: 'sys.photo',
            name: "photo",
            value: "",
            isPhoto: true,
             childrenUploadImgData : {
                upload__text: "上传用户头像文件",
                type: "image_avatar",
                accept: ".png, .jpg, .gif, .jpeg"
              },
            disabled: false,
            hidden: false,
            rule: {
                required: true, message: "头像不能为空"
            }
        },
        "phone": {
            label: 'sys.phone',
            name: "phone",
            value: "",
            disabled: false,
            hidden: false,
            rule: {
                required: true, message: "手机号码不能为空"
            }
        },
        "roles": {
            label: 'sys.routes',
            name: "roles",
            value: "",
            disabled: false,
            hidden: false,
            rule: {
                required: true, message: "角色名不能为空"
            }
        }
    
    }
}


const initSysUserForm = (id="", name = "", phone = "", photo = "", roles = "") =>{
    sysUserForm.info.id.value = id;
    sysUserForm.info.username.value = name;
    sysUserForm.info.phone.value = phone;
    sysUserForm.info.photo.value = photo;
    sysUserForm.info.roles.value = roles;
}



export {
    sysUserForm,
    initSysUserForm
}