
import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'
import { Route } from 'vue-router'
import { UserModule } from '@/store/modules/user'
import { PermissionModule, filterAsyncRouter } from '@/store/modules/permission'
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
      console.log(UserModule.roles)
      if (UserModule.roles.length === 0) {
        try {
          // Note: roles must be a object array! such as: ['admin'] or ['developer', 'editor']
          await UserModule.GetUserInfo()
          const roles = UserModule.roles
          console.log(roles)
          // Generate accessible routes map based on role
          PermissionModule.GenerateRoutes(roles)
        
          // Dynamically add accessible routes
          // 只要一刷新，vuex的就会没了，所以一刷新重新请求后端拿到路由
          if (PermissionModule.dynamicRoutes.length === 0) {
            const { data } = await getSysRole({
              page: 1,
              limit: 8,
              roleKey: roles[0]
            })

            // const aaa = filterAsyncRouter(data.items[0].routes)
            // console.log(aaa)
            PermissionModule.dynamicRoutes = filterAsyncRouter(data.items[0].routes)
          }
          console.log(PermissionModule.dynamicRoutes)
          router.addRoutes(PermissionModule.dynamicRoutes)
          // Hack: ensure addRoutes is complete
          // Set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (err) {
          // Remove token and redirect to login page
          UserModule.ResetToken()
          console.log(err || 'Has Error');
          
          // Message.error(err || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      } else {
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
