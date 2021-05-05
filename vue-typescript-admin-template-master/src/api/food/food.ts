/*
 * @Author: zemin zheng
 * @Date: 2021-02-21 22:24:50
 * @LastEditTime: 2021-05-05 13:06:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-typescript-admin-template-master\src\api\itKnowledge\frontEnd.ts
 */
import request from '@/utils/request'
 
/**
 * 查询
 * @param params 数据
 */
export const get = (params: any) =>
    request({
        url: '/food/',
        method: 'get',
        params
    })


/**
 * 添加
 * @param data 数据
 */
export const create = (data: any) =>
    request({
        url: '/food/',
        method: 'post',
        data
    })

 

export const update = (data: any) =>
    request({
        url: `/food/`,
        method: 'put',
        data
    })

export const del = (params: any) =>
    request({
        url: `/food/`,
        method: 'delete',
        params
    })
