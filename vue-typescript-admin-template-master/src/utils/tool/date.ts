/**
 * YYYYMMDDHHmmss转为 YYYY-MM-DD HH:mm ss
 * @param dateStr YYYYMMDDHHmmss
 */
const dateFormat = (dateStr: string) =>{
    return dateStr.substring(0,4) + '-' + dateStr.substring(4,6) + '-' + dateStr.substring(6,8) + '  ' + 
    dateStr.substring(8,10) + ' : ' + dateStr.substring(10,12) + ' ' + dateStr.substring(10,12)
}


export { 
    dateFormat
}