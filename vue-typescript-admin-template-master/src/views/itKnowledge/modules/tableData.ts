import { typeOptions } from './options';
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
            { value: 'html', text: 'HTML' },
            { value: 'css', text: 'CSS' },
            { value: 'javascript', text: 'Javascript' },
            { value: 'vue', text: 'Vue' },
            { value: 'ui', text: 'Ui' }
        ],
        filterTag:(value: string, row: any, column:Object) => filterTag(value, row, column),
        type: (h: any, param: any) => setTypeStauts(h),
        render: (h: any, param: any) => formatterType(h)
    },
    "photo":{
        prop: "photo",
        label: "照片",
        width: "5%",
        isPhoto: true
    },
    "auth": {
        prop: "auth",
        label: "作者",
        width: "5%"
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
        case `${typeOptions[0].value}`:
            type = typeOptions[0].label
            break;
        case `${typeOptions[1].value}`:
            type = typeOptions[1].label
            break;
        case `${typeOptions[2].value}`:
            type = typeOptions[2].label
            break;
        default:
            type = typeOptions[1].label
    }

    return type;
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
    formatterType
   
}