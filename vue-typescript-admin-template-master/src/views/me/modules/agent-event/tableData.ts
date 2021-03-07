import { agentTypeOptions, noticeWayOptions } from './options';
import { colorStatus } from '@/utils/tool/index'

const columns = {
    "serialNum": {
        prop: "serialNum",
        label: "序号",
        width: "5%"
    },
    "title": {
        prop: "title",
        label: "标题",
        width: "5%"
    },
    "content": {
        prop: "content",
        label: "内容",
        width: "10%"
    },
    "type": {
        prop: "type",
        label: "类型",
        width: "5%",
        isTag: true,
        filters: [
            { value: 'two-days', text: '这两天' },
            { value: 'recent', text: '近期' },
            { value: 'postpone', text: '延后' }
        ],
        filterTag:(value: string, row: any, column:Object) => filterTag(value, row, column),
        type: (h: any, param: any) => setTypeStauts(h),
        render: (h: any, param: any) => formatterType(h)
    },
    "agent": {
        prop: "agent",
        label: "代办者",
        width: "5%"
    },
    "schedule": {
        prop: "schedule",
        label: "进度",
        width: "5%",
        isTag: true,
        filters: [],
        type: (h: any, param: any) => setScheduleStauts(h),
        render: (h: any, param: any) => addPercentage(h)
    },
    "noticeWay": {
        prop: "noticeWay",
        label: "通知方式",
        width: "5%",
        render: (h: any, param: any) => formatterNoticeWay(h)
    },

    "startTime": {
        prop: "startTime",
        label: "开始时间",
        width: "15%",
        isDate:true,
        valueFormat: 'yyyyMMddHHmmss',
    },
    "endTime": {
        prop: "endTime",
        label: "结束时间",
        width: "15%",
        isDate:true,
        valueFormat: 'yyyyMMddHHmmss',
    },
    "remarks": {
        prop: "remarks",
        width: "10%",
        label: "备注"
    },
    "handSolt": {
        prop: "handSolt",   
        width: "20%", 
        label: "操作"
    }
}


/**
 * 将类型转为对应的中文
 * @param row 
 */
const formatterType = (row: any) => {  // row, column
    let type = ""
    switch (row.type) {
        case `${agentTypeOptions[0].value}`:
            type = agentTypeOptions[0].label
            break;
        case `${agentTypeOptions[1].value}`:
            type = agentTypeOptions[1].label
            break;
        case `${agentTypeOptions[2].value}`:
            type = agentTypeOptions[2].label
            break;
        default:
            type = agentTypeOptions[1].label
    }

    return type;
}

/**
 * 将通知方式12转为对应的中文
 * @param row 
 */
const formatterNoticeWay = (row: any) => {
    let noticeWay = ""
    switch (row.noticeWay) {
        case noticeWayOptions[0].value:
            noticeWay = noticeWayOptions[0].label
            break;
        case noticeWayOptions[1].value:
            noticeWay = noticeWayOptions[1].label
            break;
    }

    return noticeWay;
}


/**
 * 在数字后面添加 '%' 单位
 * @param row 
 */
const addPercentage = (row: any) =>{
    return row.schedule + '%'
}


/**
 * 根据type类型设置颜色值
 * @param row 
 */
const setTypeStauts = (row:any ) =>{
    if(row.type === 'two-days'){
       return colorStatus(1, 2) 
    }else if(row.type === 'recent'){
        return colorStatus(2,2) 
    }else if(row.type === 'postpone'){
        return colorStatus(3,2) 
    }else {
        return colorStatus(3,2) 
    }
}



/**
 * 根据schedule进度值设置颜色值
 * @param row 
 */
const setScheduleStauts = (row:any ) =>{
    if(row.schedule <= 20){
       return colorStatus(1, 2) 
    }else if(20 < row.schedule && row.schedule <= 40){
        return colorStatus(2,2) 
    }else if(40 < row.schedule && row.schedule <= 60){
        return colorStatus(3,2) 
    }else if(60 < row.schedule && row.schedule <= 80){
        return colorStatus(4,2) 
    }else if(80 < row.schedule && row.schedule <= 100){
        return colorStatus(5,2) 
    }else {
        return colorStatus(1, 2) 
    }
}


/**
 * 筛选：它用于决定某些数据是否显示
 * @param value 
 * @param row 
 * @param columns 
 */
const filterTag = (value: string, row: any, columns:Object) =>{
    console.log(value, row, columns);
    return row.type === value;
  }


export {
    columns,
    formatterType,
    formatterNoticeWay
}