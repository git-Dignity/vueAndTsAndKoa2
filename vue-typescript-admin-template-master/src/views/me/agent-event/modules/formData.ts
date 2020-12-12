import { agentTypeOptions, noticeWayOptions } from './options';
import moment from 'moment'

/**
 * 结束时间的效验（不能设置比开始时间早）
 * @param rule 
 * @param value 结束时间的值
 * @param callback 
 */
var endTimeValidtor = (rule:any, value:any, callback:any) =>{
    let startTime = Form.info.startTime.value==='' ?  moment(new Date()).format("YYYYMMDDHHmmss") : Form.info.startTime.value
    if (value <= startTime) {
        callback(new Error('那，那个，不能设置比开始时间早哦！'));
      } else {
        callback();
      }
}


// 角色表单数据
const Form = {
    name: "undoneForm",
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
        "title": {
            label: 'table.title',
            name: "title",
            value: "",
            disabled: false,
            hidden: false,
            // 规则必须也得定义在form绑定的model中
            rule: {
                required: true, message: "标题不能为空"
            }
        },
        "content": {
            label: 'content',
            name: "content",
            value: "",
            disabled: false,
            hidden: false,
            rule: {
                required: true, message: "内容不能为空"
            }
        },
        "type": {
            label: 'table.type',
            name: "type",
            value: "",
            isSelect: true,
            options: agentTypeOptions,
            disabled: false,
            hidden: false,
            rule: {
                required: true, message: "类型不能为空"
            }
        },
        "agent": {
            label: 'agentEvent.agent',
            name: "agent",
            value: "",
            isSelect: true,
            options: [],
            disabled: false,
            hidden: false,
            // 规则必须也得定义在form绑定的model中
            rule: {
                required: true, message: "代办者不能为空"
            }
        },
        "schedule": {
            label: 'agentEvent.schedule',
            name: "schedule",
            value: 0,
            isSlider: true,
            disabled: false,
            hidden: false,
            // 规则必须也得定义在form绑定的model中
            rule: {
                required: true, message: "进度不能为空"
            }
        },
        "noticeWay":{
            label: 'agentEvent.noticeWay',
            name: "noticeWay",
            value: "",
            isRadio: true,
            options: noticeWayOptions,
            disabled: false,
            hidden: false,
            rule: {
                required: true, message: "通知方式不能为空"
            }
        },
        "startTime": {
            label: 'time.startTime',
            name: "startTime",
            value: "",
            isDate: true,
            disabled: false,
            hidden: false,
            rule: {
                required: true, message: "开始时间不能为空"
            }
        },
        "endTime": {
            label: 'time.endTime',
            name: "endTime",
            value: "",
            isDate: true,
            disabled: false,
            hidden: false,
            rule: [
                {
                    required: true, message: "结束时间不能为空" 
                },
                {
                     validator: endTimeValidtor, trigger: 'blur'
                }
            ]
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
        }
    }
}





const initForm = (id="", title = "", content = "", type = "", agent = "", schedule = 0,noticeWay = "",  startTime = "", endTime = "", remarks = "") =>{
    Form.info.id.value = id;
    Form.info.title.value = title;
    Form.info.content.value = content;
    Form.info.type.value = type;
    Form.info.agent.value = agent;
    Form.info.schedule.value = schedule;
    Form.info.noticeWay.value = noticeWay;
    Form.info.startTime.value = startTime;
    Form.info.endTime.value = endTime;
    Form.info.remarks.value = remarks;
}



export {
    Form,
    initForm
}