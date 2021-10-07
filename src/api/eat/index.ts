/*
 * @Author: your name
 * @Date: 2021-10-06 16:13:28
 * @LastEditTime: 2021-10-07 11:37:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vueAndTsAndKoa2\src\api\eat\index.ts
 */
import request from '@/utils/request'


/**
 * 查询
 * @param params 数据
 */
export const get = (params: any) =>
    request({
        url: '/eat/',
        method: 'get',
        params
    })

  

/**
 * 添加
 * @param data 数据
 */
export const create = (data: any) =>
    request({
        url: '/eat/',
        method: 'post',
        data
    })
  

    /**
     * 更新
     * @param data 数据
     */
export const update = (data: any) =>
    request({
        url: `/eat/`,
        method: 'put',
        data
    })

    /**
     * 删除
     * @param params 数据
     */
export const del = (params: any) =>
    request({
        url: `/eat/`,
        method: 'delete',
        params
    })
