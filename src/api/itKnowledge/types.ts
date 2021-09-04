/*
 * @Author: your name
 * @Date: 2021-02-21 22:24:50
 * @LastEditTime: 2021-08-31 15:41:22
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue-typescript-admin-template-master\src\api\itKnowledge\types.ts
 */
/**
 * 代办事项接口
 */
export interface IItKnowledge {
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



  