const router = require('koa-router')()
var db = require('../../utils/db')

router.prefix('/role')


router.post('/save', async (ctx, next) => {
    const req = ctx.request.body.article
    //   console.log(req);

    roleName = escape(req.roleName) // 格式化 预防sql注入
    enName = escape(req.enName)     // 格式化 预防sql注入
   

    db(`select * from login where username = '${roleName}' and password = '${enName}'`,(err,data)=>{
        	
        if(err){
            console.log(err);
        }else{
           console.log(data)
        }
    })
    ctx.response.body = 'success'
    // const sql = `
    //     select * from login where username='${roleName}' and password = '${enName}'
    // `
 
    // const rows = await exec(sql)
    // ctx.response.body = rows[0]

  })





function parsePostData() {
    return new Promise((resolve, reject) => {
        try {
            let postData = '';
            ctx.req.addListener('data', (data) => { // 有数据传入的时候
                postData += data;
            });
            ctx.req.on('end', () => {
                let parseData = parseQueryStr(postData);
                resolve(parseData);
            });
        } catch (e) {
            reject(e);
        }
    })
}

// 处理 string => json
function parseQueryStr(queryStr) {
    let queryData = {};
    let queryStrList = queryStr.split('&');
    console.log('queryStrList',queryStrList);
    console.log('queryStrList.entries()',queryStrList.entries());
    for(let [index,queryStr] of queryStrList.entries()){
        let itemList = queryStr.split('=');
        console.log('itemList',itemList);
        queryData[itemList[0]] = decodeURIComponent(itemList[1]);
    }
    return queryData;
}



module.exports = router
  