import request from '@/utils/request'


/**
 * 查询
 * @param params 数据
 */
export const get = (params: any) =>
    request({
        url: '/featuresDev/',
        method: 'get',
        params
    })

  

/**
 * 添加
 * @param data 数据
 */
export const create = (data: any) =>
    request({
        url: '/featuresDev/',
        method: 'post',
        data
    })
  

    /**
     * 更新
     * @param data 数据
     */
export const update = (data: any) =>
    request({
        url: `/featuresDev/`,
        method: 'put',
        data
    })

    /**
     * 删除
     * @param params 数据
     */
export const del = (params: any) =>
    request({
        url: `/featuresDev/`,
        method: 'delete',
        params
    })
