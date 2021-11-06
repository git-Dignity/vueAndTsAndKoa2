import { Notification } from 'element-ui';
import { sys_name } from "@/const/index";

/**
 * 通知
 * @param type 展示信息
 * @param msg 1：提示 2：警告 3：错误 4 ：成功
 */
export const showNotify = (type: number, msg: string) => {
    if (!msg){
        return;
    }
    switch(type){
        case 1:
            Notification.info({
                title: sys_name + '提示您',
                message: msg,
                customClass:'messageInfo',
                duration: 4000
            });
            break;
        case 2:
            Notification({
                type: 'warning',
                title: sys_name + '提示您',
                message: msg,
                customClass:'messageWarn',
                duration: 4000
            });
            break;
        case 3:
            Notification.error({
                title: sys_name + '提示您',
                message: msg,
                customClass:'messageError',
                duration: 4000
            });
            break;
        case 4:
            Notification({
                type: 'success',
                title: sys_name + '提示您',
                customClass:'messageSuccess',
                message: msg,
                duration: 5000
            });
            break;
        default:break;
    }

}
