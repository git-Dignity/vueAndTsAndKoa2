 function randomSort(a:any,b:any) { 
    return .5 - Math.random(); 
}


/**
 * 这是该系统的状态颜色
 * 根据status获取对应的颜色
 * @param status 状态
 * @param colorShowMethods 1：代表256颜色值，2：代表某些插件使用的颜色状态（例如elementui）
 */
const colorStatus = (status:number, colorShowMethods = 1) =>{
    switch(status) {
        case 1:
            return colorShowMethods === 1 ? 'red' : 'danger'
            break;
        case 2:
            return  colorShowMethods === 1 ? 'blue' : 'primary'
            break;
        case 3:
            return colorShowMethods === 1 ? '#F4F4F5' : 'info'
            break;
        case 4:
            return colorShowMethods === 1 ? '#FDF6EC' : 'warning'
            break;
        case 5:
            return colorShowMethods === 1 ? 'green' : 'success'
            break;
        default:
            return colorShowMethods === 1 ? 'red' : 'danger'
    }
}


export {
    randomSort,
    colorStatus
}