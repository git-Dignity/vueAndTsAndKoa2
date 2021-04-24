/*
 * @Author: zemin zheng
 * @Date: 2020-09-06 15:00:01
 * @LastEditTime: 2021-04-24 11:55:29
 * @LastEditors: Please set LastEditors
 * @Description: 验证器
 * @FilePath: \vue-typescript-admin-template-master\src\utils\validate.ts
 */
import myTool from "@/utils/tool/javascript-tool-class";


export const isValidUsername = (str: string) => ['admin', 'editor','zheng'].indexOf(str.trim()) >= 0

export const isExternal = (path: string) => /^(https?:|mailto:|tel:)/.test(path)

export const isArray = (arg: any) => {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

export const isValidURL = (url: string) => {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}


/**
 * 联系方式数据的验证（手机号码）
 * @param rule 
 * @param value 联系方式的值
 * @param callback 
 */
export const phoneValidtor = (rule:any, value:any, callback:any) =>{
  if (!myTool.myCheck.isMPRelaxed(value)){
      callback(new Error("The phone number is not valid"));
  }else{
      callback();
  }
}