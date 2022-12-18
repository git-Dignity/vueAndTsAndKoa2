/*
 * @Author: your name
 * @Date: 2020-09-06 15:00:00
 * @LastEditTime: 2022-12-18 17:13:54
 * @LastEditors: zemin zheng
 * @Description: In User Settings Edit
 * @FilePath: \vueAndTsAndKoa2\src\api\music\index.ts
 */
import request from "@/utils/requestJava";
import axios from "axios";
let blog_api = process.env.VUE_APP_BLOG_API;

export const getMusic = (data: any) =>
  request({
    url: "/bk/music/singerSonger/list",
    method: "post",
    data
  });

// export const uploadMusic = (data: any) =>
// request({
//   url: '/music/upload',
//   method: 'post',
//   data
// })

// export const getMusic = (param: any) => {

//   return new Promise((resolve, reject) => {
//     axios
//       .post(`/bk/music/singerSonger/list`, param)
//       .then(res => {
//         // console.log(res)
//         resolve(res.data.data);
//       })
//       .catch(err => {
//         reject(err.data);
//       });
//   });
// };

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
