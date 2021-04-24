/*
 * @Author: zemin zheng
 * @Date: 2021-04-24 09:52:50
 * @LastEditTime: 2021-04-24 11:15:58
 * @LastEditors: Please set LastEditors
 * @Description: 请求工具类
 * @FilePath: \vue-typescript-admin-template-master\src\utils\tool\request.ts
 */

 /**
  * 将then、catch封装在一起
  * 使用：
  * 成功：const { res } = await this.awaitWraper(getSysUser(page));
  * 报错：const { err } = await this.awaitWraper(getSysUser(page));
  * @param promise Promise
  */
 const awaitWraper:any = (promise: any) =>{
    return  promise.then((res: any) => {
       return {err: null, res :res}
    }).
    catch((err: any) => {
      return {err: err, res :null}
   })
 }



 export {
    awaitWraper
 }