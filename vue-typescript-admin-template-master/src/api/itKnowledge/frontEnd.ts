import request from '@/utils/request'
import { ISysRoleData } from '@/api/types'

export const defaultSysRoleData: ISysRoleData = {
    id: '',
    roleName: '',
    roleKey: '',
    roleType: '',
    isSys: 0,
    remarks: '',
    routes: []
}

/**
 * 查询
 * @param params 数据
 */
export const get = (params: any) =>
    request({
        url: '/itKnowledge/frontEnd/',
        method: 'get',
        params
    })

export const getArticle = (id: number, params: any) =>
    request({
        url: `/SysRole/${id}`,
        method: 'get',
        params
    })

/**
 * 添加
 * @param data 数据
 */
export const create = (data: any) =>
    request({
        url: '/itKnowledge/frontEnd/',
        method: 'post',
        data
    })

 


export const delSysRole = (data: any) =>
    request({
        url: '/role/del',
        method: 'post',
        data
    })

export const update = (data: any) =>
    request({
        url: `/itKnowledge/frontEnd/`,
        method: 'put',
        data
    })

export const del = (params: any) =>
    request({
        url: `/itKnowledge/frontEnd/`,
        method: 'delete',
        params
    })

export const getPageviews = (params: any) =>
    request({
        url: '/pageviews',
        method: 'get',
        params
    })
