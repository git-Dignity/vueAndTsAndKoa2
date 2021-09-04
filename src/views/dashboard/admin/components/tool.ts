/*
 * @Author: zemin zheng
 * @Date: 2021-08-31 16:03:53
 * @LastEditTime: 2021-09-03 21:47:27
 * @LastEditors: Please set LastEditors
 * @Description: admin文件夹中的方法
 * @FilePath: \vue-typescript-admin-template-master\src\views\dashboard\admin\components\tool.ts
 */


 
  /**
   * @description: 给我一个数组data，根据特定字段field，返回flag有效的数组、失效的数组
   * @param {Array} data
   * @return {Array}
   */
  const getEfficientAndFail = (data: Array<any>, field: string, fun: Function) =>{
    // console.log(data, field, fun);
    
    const efficient: any = []; // 有效
    const fail: any = []; // 失效

    data.forEach((d: Record<string, any>) => {
      if (fun(d)) {
        efficient[field + d[field]]
          ? efficient[field + d[field]]++
          : (efficient[field + d[field]] = 1);

        // 初始化失效数组
        if (!fail[field + d[field]]) {
          fail[field + d[field]] = 0;
        }
      } else {
        fail[field + d[field]]
          ? fail[field + d[field]]++
          : (fail[field + d[field]] = 1);
      }
    });

    return [Object.values(efficient), Object.values(fail), Object.keys(efficient), Object.keys(fail)];
  }



  export {
    getEfficientAndFail
  }