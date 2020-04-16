var Minio = require('minio')

var minioClient = new Minio.Client({
    endPoint: '127.0.0.1',
    port: 9000,
    useSSL: false,
    accessKey: 'zhengzemin',
    secretKey: '19980117.'
});

module.exports = minioClient 