/*
 * @Author: zemin zheng
 * @Date: 2021-08-29 20:10:44
 * @LastEditTime: 2021-08-29 20:41:02
 * @LastEditors: Please set LastEditors
 * @Description: 数组工具类
 * @FilePath: \vue-typescript-admin-template-master\src\utils\tool\arr.ts
 */

/**
 * @description 计算特定字符在数组中的出现数量
 *
 * @param {Array<any>} arr
 * @param {string} char
 * @return {Array}
 * @example
 * let arr = [{category: 1, id: 5}, {category: 2, id: 2}, {category: 1, id: 3}, {category: 3, id: 4}, ]
 * arrCalculateStr(arr, 'category') // [ category1: 2, category2: 1, category3: 1 ]
 */
const arrCalculateStr = (arr: Array<any>, char: string) => {
  return arr.reduce((total, currentValue, currentIndex) => {
    const totalVar = total[char + currentValue.category];
    total[char + currentValue.category] = totalVar ? totalVar + 1 : 1;

    return total;
  }, []);
 };

 export {
  arrCalculateStr
 };
