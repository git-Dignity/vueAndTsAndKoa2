import request from '@/utils/request'


export const getMusic = (data: any) =>
  request({
    url: '/music/get',
    method: 'post',
    data
  })


  export const uploadMusic = (data: any) =>
  request({
    url: '/music/upload',
    method: 'post',
    data
  })
