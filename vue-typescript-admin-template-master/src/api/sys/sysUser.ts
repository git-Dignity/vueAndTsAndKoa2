/*
 * @Author: your name
 * @Date: 2020-09-06 15:00:00
 * @LastEditTime: 2021-04-24 15:31:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-typescript-admin-template-master\src\api\sys\sysUser.ts
 */
import request from '@/utils/request'
import { ISysUserData } from '@/api/sys/types'

export const defaultSysUserData: ISysUserData = {
    id: '',
    userName: '',
    photo: '',
    phone: '',
    roles: '',
    token: ''
}

export const getSysUser = (params: any) =>
  request({
    url: '/user',
    method: 'get',
    params
  })


export const createSysUser = (data: any) =>
  request({
    url: '/user',
    method: 'post',
    data
  })

  export const delSysRole = (data: any) =>
  request({
    url: '/user/del',
    method: 'post',
    data
  })

export const updateSysUser = (data: any) =>
  request({
    url: `/user/ID`,
    method: 'put',
    data
  })

