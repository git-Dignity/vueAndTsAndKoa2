import request from '@/utils/request'

export const createSysMenu = (data: any) =>
  request({
    url: '/menu/save',
    method: 'post',
    data
  })