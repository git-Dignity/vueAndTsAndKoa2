/*
 * @Author: zemin zheng
 * @Date: 2020-09-06 15:00:01
 * @LastEditTime: 2021-09-26 22:34:54
 * @LastEditors: Please set LastEditors
 * @Description: 音乐模块服务（java）
 * @FilePath: \vue-typescript-admin-template-master\src\utils\requestJava.ts
 */
import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import { UserModule } from '@/store/modules/user'
import { getVal } from '@/utils/dataVal'

const service = axios.create({
  baseURL: process.env.VUE_APP_BLOG_API, // url = base url + request url
  timeout: 50000
  // withCredentials: true // send cookies when cross-domain requests
})

// Request interceptors
service.interceptors.request.use(
  (config) => {
    // Add X-Access-Token header to every request, you can add other custom headers here
    if (UserModule.token) {
      config.headers['X-Access-Token'] = UserModule.token
    }
    return config
  },
  (error) => {
    Promise.reject(error) 
  }
)

// Response interceptors
service.interceptors.response.use(
  (response) => {
    // Some example codes here:
    // code == 20000: success
    // code == 50001: invalid access token
    // code == 50002: already login in other place
    // code == 50003: access token expired
    // code == 50004: invalid user (user not exist)
    // code == 50005: username or password is incorrect
    // 4XXXXX  客户端报错
    // code == 40001：参数不可为空
    // code == 40002：参数约束请检查（参数不是期望的类型）
    // You can change this part for your own usage.
    const res = response.data
    console.warn(res);
    
   
    
    if (getVal(res,'code') == '20000' || getVal(res,'data', 'code') == '20000' || getVal(res,'data', '0') == "20000" ) {
      return response.data.data
    } else {
      // Message({
      //   message: res.message || 'Error',
      //   type: 'error',
      //   duration: 5 * 1000
      // })
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          UserModule.ResetToken()
          location.reload() // To prevent bugs from vue-router
        })
      }else{
        // Message({
        //   message: res,
        //   type: 'error',
        //   duration: 5 * 1000
        // })
      }
      return Promise.reject(new Error(res.message || 'Error'))
      
    }
  },
  (error) => {
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
