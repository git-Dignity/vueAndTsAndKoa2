/**
 * node-schedule要的格式
 * YYYYMMDDHHmmss转为  new Date(YYYY,MM - 1,DD,HH,mm,ss)
 * @param dateStr YYYYMMDDHHmmss
 */
const specifiedTimeFormat = (dateStr) =>{
    return new Date(dateStr.substring(0,4),dateStr.substring(4,6) - 1,dateStr.substring(6,8),dateStr.substring(8,10),dateStr.substring(10,12),dateStr.substring(10,12))
}


module.exports = {
    specifiedTimeFormat
}