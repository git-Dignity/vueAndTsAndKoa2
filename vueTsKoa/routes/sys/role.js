const router = require('koa-router')()
var uuid = require('node-uuid');
var db = require('../../utils/db')

router.prefix('/role')


router.post('/save', async (ctx, next) => {
    let result = {}
    const req = ctx.request.body.article
   

    roleName = escape(req.roleName) // 格式化 预防sql注入
    enName = escape(req.enName)     // 格式化 预防sql注入

    if(req.id==undefined){  // 添加
        if(req.roleName != '' && req.enName != '' && req.roleType != '' && req.isSys != '' ){
            await db(`insert into sys_role(id,name,enName,roleType,isSys,remarks)
            values('${uuid.v4()}','${req.roleName}','${req.enName}','${req.roleType}','${req.isSys}','${req.remarks}')`,(err,data)=>{
                    
                if(err){
                    console.log(err);
                }else{
                  
                    result = {
                    code:20000,
                    data:[
                        user = data
                    ]
                   }
                   console.log(result)
                   ctx.response.body = result
                }
            })
        }else{
            ctx.response.body = {
                code:400,
                data:[
                    user = []
                ]
            }
        }
    }else{
        //修改、更新

    }
   

   

//    console.log(result)
        	
    ctx.response.body = []
   

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
  