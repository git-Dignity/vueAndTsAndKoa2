import request from '@/utils/request'
import { ISysRoleData } from '../types'

export const defaultSysRoleData: ISysRoleData = {
  id: '',
  roleName: '',
  enName: '',
  roleType: '',
  isSys: '否',
  remarks: ''
}

export const getSysRole = (params: any) =>
  request({
    url: '/role/getRole',
    method: 'get',
    params
  })

export const getArticle = (id: number, params: any) =>
  request({
    url: `/SysRole/${id}`,
    method: 'get',
    params
  })

export const createSysRole = (data: any) =>
  request({
    url: '/role/save',
    method: 'post',
    data
  })

export const updateArticle = (id: number, data: any) =>
  request({
    url: `/SysRole/${id}`,
    method: 'put',
    data
  })

export const deleteArticle = (id: number) =>
  request({
    url: `/SysRole/${id}`,
    method: 'delete'
  })

export const getPageviews = (params: any) =>
  request({
    url: '/pageviews',
    method: 'get',
    params
  })
