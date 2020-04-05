import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import { UserModule } from '@/store/modules/user'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_DEV_API,
  timeout: 5000
})

//axios.get({})、axios.post({}) ... 这些都封装到request请求去了
// Request interceptors 请求拦截器
service.interceptors.request.use(
  (config) => {
    //在请求头添加参数
    //Tokey
    //userId
    // sui
    // Add X-Access-Token header to every request, you can add other custom headers here
    if (UserModule.token) {
      config.headers['X-Access-Token'] = UserModule.token //添加token
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  } 
)

// Response interceptors   响应拦截器
service.interceptors.response.use(
  (response) => {
    // console.log(response)
    
    // Some example codes here:
    // code == 20000: success
    // code == 50001: invalid access token
    // code == 50002: already login in other place
    // code == 50003: access token expired
    // code == 50004: invalid user (user not exist)
    // code == 50005: username or password is incorrect
    // You can change this part for your own usage.

    const res = response.data;
    // return response.data  //自己写的
    
    //先注释一下
    if (res.code !== 20000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm(
          'You have been logged out, try to login again.',
          'Log out',
          {
            confirmButtonText: 'Relogin',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }
        ).then(() => {
          UserModule.ResetToken()
          location.reload() // To prevent bugs from vue-router
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return response.data
    }
  },
  (error) => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)



export default service
