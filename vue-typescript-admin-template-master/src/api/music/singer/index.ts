import request from '@/utils/request'


export const getSinger = (data: any) =>
  request({
    url: '/music/singer/get',
    method: 'post',
    data
  })


  export const uploadSinger = (data: any) =>
  request({
    url: '/music/singer/upload',
    method: 'post',
    data
  })
