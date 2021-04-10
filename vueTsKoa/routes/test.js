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
  status: { type: 'string', required: true }
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
