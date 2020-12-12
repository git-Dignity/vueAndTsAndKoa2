
import request from '@/utils/request'


/**
 * 发送消息（微信方糖）
 * @param params 数据
 */
export const sendServerJiangMsg = (params: any) =>
    request({
        url: '/common/serverJiang/send',
        method: 'get',
        params
    })


/**
 * 发送消息（Bark）
 * @param params 数据
 */
export const sendBarkMsg = (params: any) =>
    request({
        url: '/common/bark/send',
        method: 'get',
        params
    })
