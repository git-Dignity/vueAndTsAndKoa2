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
                if (body.resultcode === '200') {
                    // callback(body.result)
                    resolve(body.result)
                }

            }
        })
    });
}


const post = ({ uri, qs }) => {
    return new Promise((resolve, reject) => {
        koaReq({
            url: uri,
            method: 'post',
            form: qs,
            json: true//设置返回的数据为json
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                if (body.resultcode === '200') {
                    // callback(body.result)
                    resolve(body.result)
                }

            }
        })
    });
}

module.exports = {
    get,
    post
}
