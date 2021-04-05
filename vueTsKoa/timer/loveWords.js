const { getLoveWords } = require('@api/loveWords')
const { specifyTimeInterval } = require('@routes/common/schedule')
const { qqMailSend } = require('@api/sendMsg')


/**
 * 每天下午7点00发送情话到qq邮箱
 */
const loveWords = async () =>{
     specifyTimeInterval('19','00', async () =>{
        const loveStr =  await getLoveWords()
        await qqMailSend("1638153584@qq.com,875055534@qq.com", `
        今天就到此为止啦，每天继续努力哦！肥家休息啦！

        ${loveStr}
        `)

        console.log('定时器启动...发送情话成功')
        
    })
}

loveWords()




// 如何用js给老婆每天发情话：
// https://juejin.cn/post/6904805497845579783?utm_source=gold_browser_extension

