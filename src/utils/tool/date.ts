import moment from "moment";

/**
 * YYYYMMDDHHmmss转为 YYYY-MM-DD HH:mm ss
 * @param dateStr YYYYMMDDHHmmss
 */
const dateFormat = (dateStr: string) => {
    return dateStr.substring(0, 4) + "-" + dateStr.substring(4, 6) + "-" + dateStr.substring(6, 8) + "  " +
    dateStr.substring(8, 10) + " : " + dateStr.substring(10, 12) + " " + dateStr.substring(10, 12);
};

/**
 * 系统时间（2021-02-23T14:38:24.000Z）转YYYY-MM-DD HH:mm ss
 * @param time 数据库时间格式字符串
 */
const sysDateFormat = (time: string) => {
    if (!time) return null;

    return moment(time).format("YYYY-MM-DD HH:mm:ss");
  };

export {
    dateFormat,
    sysDateFormat
};
