// class SwaggerClass {
//     constructor(tableName){
//         this.tableName = tableName
//     }

//     get(url){
//         console.log('get', url);
     
        

//         return `/**'
//          * @swagger
//          * /featuresDev/:
//          *   get:
//          *     summary: 获取功能开发列表
//          *     description: 获取功能开发列表
//          *     tags: [我的——功能开发模块]
//          *     parameters: # 请求参数
//          *       - name: current
//          *         description: 页码
//          *         in: query # 参数的位置，可能的值有 "query", "header", "path" 或 "cookie" 没有formData，但是我加了不报错
//          *         required: false
//          *         type: number
//          *       - name: size
//          *         description: 页条数
//          *         in: query
//          *         required: false
//          *         type: number # 可能的值有string、number、file（文件）等
//          *       - name: title
//          *         description: 标题（搜索）
//          *         in: query
//          *         required: false
//          *         type: string # 可能的值有string、number、file（文件）等
//          *       - name: front_end
//          *         description: 前端（搜索）
//          *         in: query
//          *         required: false
//          *         type: string # 可能的值有string、number、file（文件）等
//          *       - name: node
//          *         description: Node（搜索）
//          *         in: query
//          *         required: false
//          *         type: string # 可能的值有string、number、file（文件）等
//          *       - name: java
//          *         description: Java（搜索）
//          *         in: query
//          *         required: false
//          *         type: string # 可能的值有string、number、file（文件）等
//          *       - name: database_sql
//          *         description: SQL（搜索）
//          *         in: query
//          *         required: false
//          *         type: string # 可能的值有string、number、file（文件）等
//          *       - name: uploadTime
//          *         description: 更新时间（搜索）
//          *         in: query
//          *         required: false
//          *         type: string # 可能的值有string、number、file（文件）等
//          *       - name: remarks
//          *         description: 备注（搜索）
//          *         in: query
//          *         required: false
//          *         type: string # 可能的值有string、number、file（文件）等
//          *     responses:
//          *       '200':
//          *         description: Ok
//          *         schema:
//          *           type: 'object'
//          *           properties:
//          *             code:
//          *               type: 'number'
//          *               description: 状态码
//          *             data:
//          *               type: 'string'
//          *               description: 加密公钥
//          *             message:
//          *               type: 'string'
//          *               description: 消息提示
//          *             status:
//          *               type: 'number'
//          *               description: 状态
//          *       '400':
//          *         description: 请求参数错误
//          *       '404':
//          *         description: not found
//          */
//         `
//     }
// }



// module.exports = SwaggerClass