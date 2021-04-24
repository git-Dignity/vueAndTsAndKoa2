/*
 * @Author: your name
 * @Date: 2020-09-06 15:00:02
 * @LastEditTime: 2021-04-24 12:27:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-typescript-admin-template-master\src\views\sys\modules\user\userFormData.ts
 */

import { phoneValidtor } from '@/utils/validate'

 



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
        'username': {
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
            childrenUploadImgData: {
                upload__text: "上传用户头像文件",
                type: "image_avatar",
                accept: ".png, .jpg, .gif, .jpeg",
                imageUrl: ''
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
            rule: [
                {
                    required: true, message: "手机号码不能为空" 
                },
                {
                     validator: phoneValidtor, trigger: 'blur'
                }
            ]
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

    },
    file:""
}


const initSysUserForm = ({id = "", username = "", phone = "", photo = "", roles = ""}) => {
    console.log(photo);
    
    sysUserForm.info.id.value = id;
    sysUserForm.info.username.value = username;
    sysUserForm.info.phone.value = phone;
    sysUserForm.info.photo.childrenUploadImgData.imageUrl = photo ? photo : require('@/assets/404-images/404.png');
    sysUserForm.info.photo.value = photo 
    sysUserForm.info.roles.value = roles;
}

const setPhoto = (photo: string) =>{
    sysUserForm.info.photo.value = photo 
}



export {
    sysUserForm,
    initSysUserForm,
    setPhoto
}