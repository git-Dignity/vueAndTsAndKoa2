/*
 * @Author: your name
 * @Date: 2021-05-05 13:05:05
 * @LastEditTime: 2021-05-05 13:06:03
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue-typescript-admin-template-master\src\api\food\types.ts
 */
/**
 * 美食分享接口
 */
export interface IFood {
    id: string
    serialNum: number
    title: string
    content: string
    type: number
    agent: string
    schedule: string
    noticeWay:number
    contact: string
    startTime: string 
    endTime: string 
    remarks: string 
  } 



  export interface IRoutesTreeData {
    children: IRoutesTreeData[]
    title: string
    path: string
  }


  export interface ISysUserData {
    id: string
    userName: string
    photo: string
    phone: string
    roles: string
    token: string
  }



  