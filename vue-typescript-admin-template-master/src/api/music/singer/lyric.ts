import request from '@/utils/request'
import axios from 'axios';

// const url = "http://localhost"  
const url = "http://zhengzemin.cn"


// 先拿到歌手的清单
export const getArtistList = (data: any) => {
    return new Promise((resolve, reject) => {
        axios
            .post(url + ":4000/artist/list", data)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data);
            });
    });
}

// 歌手的全部歌曲 
export const getArtistTopSong = (data: any) => {
    return new Promise((resolve, reject) => {
        axios
            .post(url + ":4000/artist/top/song", data)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data);
            });
    });
}


// 歌手的某条歌曲
export const getSongUrl = (data: any) => {
    return new Promise((resolve, reject) => {
        axios
            .post(url + ":4000/song/url", data)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data);
            });
    });
}


// 歌手的某条歌曲的歌词
export const getLyric = (data: any) => {
    return new Promise((resolve, reject) => {
        axios
            .post(url + ":4000/lyric", data)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data);
            });
    });
}





/**
 * 获取歌曲歌词
 * @param data  
 * data = {
 *    type: 1,
      area: 7,
      limit: 100,
      singerName: '周杰伦',
      songName: '屋顶'
 * }
 */
export const getSongLyric = (data: any) => {
    // console.log(data)
    //     var url = document.location.toString();//获取url地址

    // var urlParmStr = url.slice(url.indexOf('?')+1);//获取问号后所有的字符串

    // var arr = urlParmStr.split('&');//通过&符号将字符串分割转成数组
    // var courseId = arr[0].split("=")[1];//获取数组中第一个参数

    // var unit_title=arr[1].split("=")[1];//第二个参数

    // unit_title=decodeURI(unit_title);//转码将解码方式unscape换为decodeURI，将中文参数获取
    // console.log(decodeURI(courseId));
    // console.log(unit_title);

    return new Promise((resolve, reject) => {

        getArtistList({
            type: data.type,
            area: data.area,
            limit: data.limit,
        }).then((res: any) => {
            const artist = res.artists.find((value: any) => value.name.search(data.singerName) != -1); // 获取歌手
            // console.log(artist)
            // 歌手的全部歌曲，这个接口存在缓存
            getArtistTopSong({
                id: artist.id
            }).then((res: any) => {
                // console.log(res);
                const songUrlTmp = res.songs.find((value: any) => value.name.search(data.songName) != -1);
                // console.log(songUrlTmp)  
                if (songUrlTmp) {
                    getSongUrl({
                        id: songUrlTmp.id
                    }).then((res: any) => {
                        // console.log(res);
                        getLyric({
                            id: res.data[0].id
                        }).then((res: any) => {
                            // console.log(res)
                            resolve(res);
                        })
                    })
                } else {
                    reject("查无此歌曲歌词");
                }


            });


        });


    });
}