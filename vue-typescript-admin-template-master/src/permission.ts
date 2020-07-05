import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'
import { Route } from 'vue-router'
import { UserModule } from '@/store/modules/user'
import { PermissionModule, filterAsyncRouter, loadViewsd } from '@/store/modules/permission'
import i18n from '@/lang' // Internationalization
import settings from './settings'
import { getSysRole } from "@/api/sys/sysRole";
import { RouteConfig } from 'vue-router'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/auth-redirect', '/registe', '/404']

const getPageTitle = (key: string) => {
  const hasKey = i18n.te(`route.${key}`)
  if (hasKey) {
    const pageName = i18n.t(`route.${key}`)
    return `${pageName} - ${settings.title}`
  }
  return `${settings.title}`
}

router.beforeEach(async (to: Route, _: Route, next: any) => {
  // Start progress bar
  NProgress.start()

  // Determine whether the user has logged in
  if (UserModule.token) {
    if (to.path === '/login') {
      // If is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {


console.log(UserModule.roles.length)
      // Check whether the user has obtained his permission roles
      if (UserModule.roles.length === 0) {
        try {
          // Note: roles must be a object array! such as: ['admin'] or ['developer', 'editor']
          await UserModule.GetUserInfo()

          const roles = UserModule.roles
          // Generate accessible routes map based on role
          PermissionModule.GenerateRoutes(roles)
          // Dynamically add accessible routes
          console.log(PermissionModule.dynamicRoutes)
          if (PermissionModule.dynamicRoutes.length === 0) {
            const {data} = await getSysRole({
              page: 1,
              limit: 8,
              roleKey: roles[0]
            })

            PermissionModule.dynamicRoutes = filterAsyncRouter(data.items[0].routes)

            

          } 
          
          router.addRoutes(PermissionModule.dynamicRoutes)

          // Hack: ensure addRoutes is complete
          // Set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (err) {
          console.log(err)
          // Remove token and redirect to login page
          UserModule.ResetToken()
          Message.error(err || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      } else {
       

        // const hasComponent =  (routerMap: any) =>{ //遍历后台传来的路由字符串，转换为组件对象
        //   const tmp:Array<string> = []
        //     const routers = routerMap.filter((route: any) => {
        //       if (route.path) {
         
        //           if(to.path === route.path){
        //             tmp.push('true')
        //           }else{
        //             tmp.push('false')
        //           }
        //       }
        //       if (route.children && route.children.length) {
        //          hasComponent(route.children)
        //       }
        //     })
        //     return tmp;
        //   }

          // console.log(to.path)
        //   console.log(PermissionModule.dynamicRoutes)
          // console.log(hasComponent(PermissionModule.dynamicRoutes));


// if(to.path !== '/404'){
//   if(!hasComponent(PermissionModule.dynamicRoutes).includes("true") ){
//     next({ path: '/404' })
//     NProgress.done()
//   }else{
//     next()
//   }
// }else{
//   next()
// }
         
          next()
      }
    }
  } else {

    // Has no token
    if (whiteList.indexOf(to.path) !== -1) {
      // In the free login whitelist, go directly
      next()
    } else {
      // Other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach((to: Route) => {
  // Finish progress bar
  NProgress.done()

  // set page title
  document.title = getPageTitle(to.meta.title)
})
