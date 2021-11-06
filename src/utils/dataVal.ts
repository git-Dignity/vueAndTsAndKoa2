/*
 * @Author: your name
 * @Date: 2021-05-04 23:23:38
 * @LastEditTime: 2021-08-29 17:47:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-typescript-admin-template-master\src\utils\dataVal.ts
 */


/**
 * 可获取到对象属性（若属性为空，也不会报错）
 * @param obj 
 * @param args 
 */
const getVal = (obj: any, ...args:any) => {
    let out = null
    if (obj || obj === 0) {
      out = obj
      if (args && args.length > 0) {
        for (let index = 0; index < args.length; index++) {
          const key = args[index]
          out = out[key]
          if (out === undefined || out === null || out === '') {
            return null
          }
        }
      } else {
        if (out === undefined || out === null || out === '') {
          return null
        }
      }
    }
    return out
  }
  
  /**
   * 可获取到对象属性（若属性为空，则返回 '--' ）
   * @param obj 
   * @param args 
   */
  const toVal = (obj: any, ...args: any) => {
    const val = getVal(obj, ...args)
    return val === null ? '--' : val
  }
  

  export {
    getVal,
    toVal
  }