import request from '@/utils/request'
import axios from 'axios'


//获取证件
  export const getCertificate = (data: string) =>
  request({
    url: '/certificateAuthentication/getCertificate', 
    method: 'post',
    data
  })




export const uploadFile = (param: any) =>{
      
    return new Promise((resolve, reject) => {
            axios.post('http://localhost:3000/certificateAuthentication/upload', param, {
            headers: { "Content-Type": "multipart/form-data" }
            })
        .then(res => {
            resolve(res.data);
        })
        .catch(err =>{
            reject(err.data)
        })
    });
}
 