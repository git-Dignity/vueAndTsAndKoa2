import request from '@/utils/request'
import axios from 'axios'


//获取证件
export const getCertificate = (data: string) =>
  request({
    url: '/certificateAuthentication/getCertificate',
    method: 'post',
    data
  })

  export const uploadFile = (data: any) => 
  request({
    url: '/certificateAuthentication/upload',
    method: 'post',
    data
  })
  


