import request from '@/utils/request'
import axios from 'axios';

let blog_api = process.env.VUE_APP_BLOG_API;
if (process.env.NODE_ENV !== 'development') {
  // blog_api = "http://file.dev.zhengzemin.cn:81";
  blog_api =  "http://zhengzemin.cn:8527";
}


// export const getMusic = (data: any) =>
//   request({
//     url: '/music/get',
//     method: 'post',
//     data
//   })


// export const uploadMusic = (data: any) =>
// request({
//   url: '/music/upload',  
//   method: 'post',
//   data
// })

export const getMusic = (param: any) => {

  return new Promise((resolve, reject) => {
    axios
      .post(`${blog_api}/bk/music/singerSonger/list`, param)
      .then(res => {
        // console.log(res)
        resolve(res.data.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
};

export const delMusic = (param: any) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${blog_api}/bk/music/singerSonger/del`, param)
      .then(res => {
        resolve(res.data.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
};

export const editMusic = (param: any) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${blog_api}/bk/music/singerSonger/edit`, param)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
};

export const uploadMusic = (param: any) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${blog_api}/bk/music/singerSonger/upload`, param)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
};

// export const uploadMusic = (param: any) => {
//   return new Promise((resolve, reject) => {
//     axios
//       .post(`${blog_api}/bk/music/singerSonger/upload`, param, {
//         headers: { "Content-Type": "multipart/form-data" }
//       })
//       .then(res => {
//         resolve(res.data);
//       })
//       .catch(err => {
//         reject(err.data);
//       });
//   });
// };
