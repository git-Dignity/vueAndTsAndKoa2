/*
 * @Author: zemin zheng
 * @Date: 2021-04-10 11:14:13
 * @LastEditTime: 2021-04-18 15:32:59
 * @LastEditors: Please set LastEditors
 * @Description: koa-swagger-decorator的测试文件
 * @FilePath: \vueTsKoa\routes\test\test-swagger-decorator.js
 */


const {
  request,
  summary,
  body,
  tags,
  middlewares,
  path,
  description,
  orderAll,
  query
} = require('koa-swagger-decorator')

const tag = tags(['List'])

const logTime = () => async (ctx, next) => {
  //处理请求的中间拦截
  console.log(`start: ${new Date()}`)
  await next()
  console.log(`end: ${new Date()}`)
}

const getListSchema = {
  keyword: { type: 'string', required: true },
  status: { type: 'number', required: true }
}
const listSchema = {
  user_id: { type: 'string',format: 'uuid', required: true },
  content: { type: 'string', required: true },
  status: { type: 'string', required: true },
  info: { type: 'object', required: true,
  default: {"id":"","title":"","content":"","type":"","photo":"","remarks":"","auth":"zheng","category":1},
    properties: {
      title: { type: 'string',required: false },
      content: { type: 'string',required: false }
    } 
  },
  xis: { type: 'array', required: true,
    items: {
      title: { type: 'string',required: false },
      content: { type: 'string',required: false }
    } 
  },
  file:{
    type:"file",
    required: false,
    description: '文件'
  }
}
const updateListSchema = {
  user_id: { type: 'string',format: 'uuid', required: true },
  status: { type: 'number', required: true },
}

class ListController {
  @request('get', '/list/')
  @summary('返回一个列表')
  @description('example of api')
  @tag
  @middlewares([logTime()])
  @query(getListSchema)
  static async getTodoList(ctx) {
    const data = ctx.request.query
    if (data) {
      const todoList = []
      ctx.body = {
        code: 1,
        bean: {
          totalCount: todoList.totalCount,
          list: todoList.items,
        },
        message: '成功'
      }
    } else {
      ctx.body = {
        code: -1,
        message: '参数错误'
      }
    }
  }

  @request('post', '/list/')
  @summary('创建列表一行数据')
  @tag
  @body(listSchema)
  static async createTodoList(ctx) {
    let todoList = ctx.request.body
    if (todoList) {
    //   await ListModel.createTodoList(todoList)
      ctx.body = {
        code: 1,
        message: '成功'
      }
    } else {
      ctx.body = {
        code: -1,
        message: '创建失败'
      }
    }
  }

  @request('delete', '/list/{id}')
  @summary('删除一行 by id')
  @tag
  @path({ id: { type: 'string',format: 'uuid', required: true } })
  static async destroyTodoList(ctx) {
    const { id } = ctx.validatedParams
    if (id) {
    //   await ListModel.destroyTodoList(id)
      ctx.body = {
        code: 1,
        message: '成功'
      }
    } else {
      ctx.body = {
        code: -1,
        message: '失败'
      }
    }
  }

  @request('put', '/list/')
  @summary('更新列表一行数据的状态')
  @description('example of api')
  @tag
  @body(updateListSchema)
  static async updateTodoList() {
    const data = ctx.request.body

    if (data) {
    //   await ListModel.updateTodoList(data.id, data.status)
      ctx.body = {
        code: 1,
        message: '成功'
      };
    } else {
      ctx.body = {
        code: -1,
        message: '失败'
      }
    }
  }
}


module.exports = ListController


// 误区：关于对象，发现type写为object，一直提示我类型错误，最后才发现原来JSON并不是对象，而是string