const koaReq = require('request')


const get = ({ uri, qs }) => {
    return new Promise((resolve, reject) => {
        koaReq({
            method: 'get',
            uri,
            qs,
            json: true//设置返回的数据为json
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                if (body.data && body.data[0] === '20000') {
                    // callback(body.result)
                    resolve(body.data[1])
                }else{
                    resolve(body)
                }

            }
            resolve(error)
        })
    });
}


const post = ({ uri, qs }) => {
    console.log(qs)
    return new Promise((resolve, reject) => {
        koaReq({
            url: uri,
            method: 'post',
            form: qs,
            json: true//设置返回的数据为json
        }, function (error, response, body) {
            // console.log(body)
            if (!error && response.statusCode == 200) {
                if (body.code === '20000') {
                    // callback(body.result)

                    resolve(body.result)
                }else{
                    resolve(body)
                }

            }
        })
    });
}


const put = ({ uri, qs }) => {
    return new Promise((resolve, reject) => {
        koaReq({
            url: uri,
            method: 'put',
            form: qs,
            json: true//设置返回的数据为json
        }, function (error, response, body) {
            // console.log(body)
            if (!error && response.statusCode == 200) {
                if (body.code === '20000') {
                    // callback(body.result)
                    resolve(body.result)
                }else{
                    resolve(body)
                }

            }
        })
    });
}


const del = ({ uri, qs }) => {
    console.log(qs)
    return new Promise((resolve, reject) => {
        koaReq({
            url: uri + '?id=' + qs,
            method: 'delete',
            form: qs,
            json: true//设置返回的数据为json
        }, function (error, response, body) {
            // console.log(body)
            if (!error && response.statusCode == 200) {
                if (body.code === '20000') {
                    // callback(body.result)
                    resolve(body.result)
                }else{
                    resolve(body)
                }

            }
        })
    });
}

module.exports = {
    get,
    post,
    put,
    del
}
