import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import { RouteConfig } from 'vue-router'
// import { asyncRoutes, constantRoutes } from '@/router'
import {  constantRoutes, asyncRoutes as adminRoutes } from '@/router'
import { asyncRoutes } from "@/router/asyncRoutes";
import store from '@/store'
import { getSysRole } from "@/api/sys/sysRole";
import Layout from '@/layout/index.vue'

const hasPermission = (roles: string[], route: any) => {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

export const filterAsyncRoutes = (routes: any[], roles: string[]) => {
  const res: any[] = []
  routes.forEach(route => {
    const r = { ...route }
    if (hasPermission(roles, r)) {
      if (r.children) {
        r.children = filterAsyncRoutes(r.children, roles)
      }
      res.push(r)
    }
  })
  return res
}


const  filterAsyncRoutesComponentTmp = (routes: any) => {
  const res: any[] = [];
  routes.forEach(async (r:any) => {
   
    if (r.componentUrl) {

      asyncRoutes.forEach( (rrr: any) =>{
        if(rrr.children){
          rrr.children.forEach( (ccc:any) => {
            if(ccc.componentUrl === r.componentUrl){
              r.component = ccc.component
            }
          })
        }

      })
       
      
    
      // r.component = Directive
      // r.component = loadView(r.componentUrl)
      // console.log(r.component)

   
      // loadView(r.componentUrl).then(res=>{
      //   console.log(res)
      //   r.component = res
      // }).catch(err =>{
      //   console.log(err)
      // })
    }
    if(r.children){
      // r.children.forEach( (rr: any) => {
        filterAsyncRoutesComponentTmp(r.children);
      // })
    }
  })

  // console.log(routes)
  return routes;
}


const filterAsyncRoutesComponent = (routes: any[]) => {
  const res: any[] = []
  routes.forEach((r: any) => {
    // const r = { ...route }
    if (r.componentUrl) {
      r.component  = Layout
      // r.component = loadView(r.componentUrl)
    }
    if(r.children){
      // r.children.forEach( (rr: any) => {
        filterAsyncRoutesComponentTmp(r.children);
      // })
    }
  })

  // console.log(routes)

  return routes;
}


// const loadView = async (view:string) => {
//   return import(`views/${view}`)
// }

// const loadView = async (view:string) => {
//     try {
//         return await import(`./src/views/${view}`)
//     } catch (error) {
//         return error
//     }
//   }



// sdsdsdsdsd
export interface IPermissionState {
  routes: any[]
  dynamicRoutes: any[]
}

@Module({ dynamic: true, store, name: 'permission' })
class Permission extends VuexModule implements IPermissionState {
  public routes: any[] = []
  public dynamicRoutes: any[] = []

  @Mutation
  private SET_ROUTES(routes: any[]) {
    this.routes = constantRoutes.concat(routes)
    this.dynamicRoutes = routes
    // console.log(this.dynamicRoutes)
  }

  @Action
  public async GenerateRoutes(roles: string[]) {
    let accessedRoutes
    if (roles.includes('admin')) {
      accessedRoutes = adminRoutes
    } else {
      console.log(roles)
      
      const {data} = await getSysRole({
        page: 1,
        limit: 8,
        roleKey: roles[0]
      })
      // console.log(data.items[0].routes);

      // accessedRoutes = filterAsyncRoutesComponent(data.items[0].routes);
     

      accessedRoutes = filterAsyncRouter(data.items[0].routes)

      console.log(accessedRoutes)
      // accessedRoutes = asyncRoutes


      // accessedRoutes = filterAsyncRoutes(data.items[0].routes, roles)  // 这种是使用页面权限的，我现在不需要了
      // accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
    }
    this.SET_ROUTES(accessedRoutes)
  }
}


export const filterAsyncRouter = (asyncRouterMap: any) =>{ //遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = asyncRouterMap.filter((route: any) => {
    // console.log(route)
    if (route.componentUrl) {
     if (route.componentUrl === 'Layout') {//Layout组件特殊处理
        route.component = Layout
        delete route.componentUrl
      } else {
        route.component = loadViewsd(route.componentUrl)
        delete route.componentUrl
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return route
  })

  //全不匹配的情况下，返回404，路由按顺序从上到下，依次匹配。最后一个*能匹配全部，
  accessedRouters.push({
    path: '*',
    redirect: '/404',
    meta: { hidden: true }
  })

  // console.log(accessedRouters)
  return accessedRouters
}

export const loadViewsd = (view: any) => {
  return (resolve: any) => require([`@/views/${view}.vue`], resolve)
}

// function loadViewas(view:string)
// {
//     // 路由懒加载
//     return () => import(`@/views/${view}`);
// }



export const PermissionModule = getModule(Permission)
