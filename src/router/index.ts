import Vue from 'vue'
import Router, { RouteConfig, RawLocation, Route } from 'vue-router'

/* Layout */
import Layout from '@/layout/index.vue'

/* Router modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

Vue.use(Router)

/*
  Note: sub-menu only appear when children.length>=1
  Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
*/

/*
  name:'router-name'             the name field is required when using <keep-alive>, it should also match its component's name property
                                 detail see : https://vuejs.org/v2/guide/components-dynamic-async.html#keep-alive-with-Dynamic-Components
  redirect:                      if set to 'noredirect', no redirect action will be trigger when clicking the breadcrumb
  meta: {
    roles: ['admin', 'editor']   will control the page roles (allow setting multiple roles)
    title: 'title'               the name showed in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon showed in the sidebar
    hidden: true                 if true, this route will not show in the sidebar (default is false)
    alwaysShow: true             if true, will always show the root menu (default is false)
                                 if false, hide the root menu when has less or equal than one children route
    breadcrumb: false            if false, the item will be hidden in breadcrumb (default is true)
    noCache: true                if true, the page will not be cached (default is false)
    affix: true                  if true, the tag will affix in the tags-view
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
*/

/**
  ConstantRoutes
  a base page that does not have permission requirements
  all roles can be accessed
*/
export const constantRoutes: RouteConfig[] = [
  { 
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import(/* webpackChunkName: "redirect" */ '@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/registe',
    component: () => import(/* webpackChunkName: "registe" */ '@/views/registe/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/auth-redirect',
    component: () => import(/* webpackChunkName: "auth-redirect" */ '@/views/login/auth-redirect.vue'),
    meta: { hidden: true }
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/error-page/404.vue'),
    meta: { hidden: true }
  },
  {
    path: '/401',
    component: () => import(/* webpackChunkName: "401" */ '@/views/error-page/401.vue'),
    meta: { hidden: true }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: {
          title: 'dashboard',
          icon: 'dashboard',
          affix: true
        }
      }
    ]
  },
  // {
  //   path: '/documentation',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import(/* webpackChunkName: "documentation" */ '@/views/documentation/index.vue'),
  //       name: 'Documentation',
  //       meta: { title: 'documentation', icon: 'documentation', affix: true }
  //     }
  //   ]
  // },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "guide" */ '@/views/guide/index.vue'),
        name: 'Guide',
        meta: {
          title: 'guide',
          icon: 'guide',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    meta: { hidden: true },
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "profile" */ '@/views/profile/index.vue'),
        name: 'Profile',
        meta: {
          title: 'profile',
          icon: 'user',
          noCache: true
        }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
*/
export const asyncRoutes: RouteConfig[] = [
  {
    path: '/permission',
    component: Layout,
    // componentUrl: 'Layout',
    redirect: '/permission/directive',
    meta: {
      title: 'permission',
      icon: 'lock',
      alwaysShow: true // will always show the root menu
    },
    children: [
      {
        path: 'page',
        component: () => import(/* webpackChunkName: "permission-page" */ '@/views/permission/page.vue'),
        // componentUrl: 'permission/page',
        name: 'PagePermission',
        meta: {
          title: 'pagePermission'
        }
      },
      {
        path: 'directive',
        component: () => import(/* webpackChunkName: "permission-directive" */ '@/views/permission/directive.vue'),
        // componentUrl: 'permission/directive',
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import(/* webpackChunkName: "permission-role" */ '@/views/permission/role.vue'),
        // componentUrl:  'permission/role',
        name: 'RolePermission',
        meta: {
          title: 'rolePermission', 
          noCache: true,
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/me',
    component: Layout,
    meta: {
      title: 'me',
      icon: 'example',
      roles: ['admin'], // you can set roles in root nav
      alwaysShow: true, // will always show the root menu
      noCache: true
    },
    children: [
      {
        path: 'agent-event',
        component: () => import(/* webpackChunkName: "agent-event" */ '@/views/me/agent-event.vue'),
        name: 'agentEvent',
        meta: { title: 'agentEvent', noCache: true }
      },
      {
        path: 'features-dev',
        component: () => import(/* webpackChunkName: "features-dev" */ '@/views/me/features-dev.vue'),
        name: 'featuresDev',
        meta: { title: 'featuresDev', noCache: true }
      },
      {
        path: 'diary',
        component: () => import(/* webpackChunkName: "diary" */ '@/views/me/diary.vue'),
        name: 'diary',
        meta: { title: 'diary', noCache: true }
      }
    ]
  },
  {
    path: '/sys',
    component: Layout,
    // componentUrl: 'Layout',
    meta: {
      title: 'sys',
      icon: 'example',
      roles: ['admin'], // you can set roles in root nav
      alwaysShow: true, // will always show the root menu
      noCache: true
    },
    children: [
      {
        path: 'sys-user',
        component: () => import(/* webpackChunkName: "sys-user" */ '@/views/sys/sys-user.vue'),
        // componentUrl: 'sys/sys-user',
        name: 'sysUser',
        meta: { title: 'sysUser', noCache: true }
      },
      {
        path: 'sys-menu',
        component: () => import(/* webpackChunkName: "sys-menu" */ '@/views/sys/sys-menu.vue'),
        // componentUrl: 'sys/sys-menu',
        name: 'sysMenu',
        meta: { title: 'sysMenu', noCache: true }
      },
      {
        path: 'sys-role',
        component: () => import(/* webpackChunkName: "sys-role" */ '@/views/sys/sys-role.vue'),
        // componentUrl: 'sys/sys-role',
        name: 'sysRole',
        meta: { title: 'sysRole', noCache: true }
      }
    ]
  },
  {
    path: '/personal',
    component: Layout,
    // componentUrl: 'Layout',
    redirect: '/personal/personal-view',
    name: 'personal',
    meta: {
      title: 'personal',
      icon: 'example',
      roles: ['admin', 'editor'], // you can set roles in root nav
      alwaysShow: true, // will always show the root menu
      noCache: true
    },
    children: [
      {
        path: 'personal-view',   
        component: () => import(/* webpackChunkName: "personal-view" */ '@/views/personal/personal-view/index.vue'),
        // componentUrl: 'personal/personal-view/index',
        name: 'personalView',
        redirect: '/personal/personal-view/certificate',
        meta: { title: 'personalView', noCache: true },
        children: [
          {
            path: 'certificate',
            component: () => import(/* webpackChunkName: "certificate" */ '@/views/personal/personal-view/certificate.vue'),
            // componentUrl: 'personal/personal-view/certificate',
            name: 'certificate',
            meta: { title: 'certificate', noCache: true }
          },
          {
            path: 'certificate-authentication',
            component: () => import(/* webpackChunkName: "certificate-authentication" */ '@/views/personal/personal-view/certificate-authentication.vue'),
            // componentUrl: 'personal/personal-view/certificate-authentication',
            name: 'certificateAuthentication',
            meta: { title: 'certificateAuthentication', noCache: true }
          }
        ]
      }
    ]
  },

  {
    path: '/music',
    component: Layout,
    // componentUrl: 'Layout',
    redirect: '/music/music-singer',
    name: 'music',
    meta: {
      title: 'music',
      icon: 'music',
      roles: ['admin', 'editor','test'], // you can set roles in root nav
      alwaysShow: true, // will always show the root menu
      noCache: true
    },
    children: [
          { 
            path: 'song-list',
            component: () => import(/* webpackChunkName: "song-list" */ '@/views/music/index.vue'),
            // componentUrl: 'music/index',
            name: 'songList',
            meta: { title: 'songList', noCache: true,
            roles: ['admin', 'editor','test'], // you can set roles in root nav
             icon: 'singer' }
          },
          { 
            path: 'music-singer',
            component: () => import(/* webpackChunkName: "music-singer" */ '@/views/music/music-singer.vue'),
            // componentUrl: 'music/music-singer',
            name: 'musicSinger',
            meta: { title: 'musicSinger', noCache: true, icon: 'singer' }
          },
          {
            path: 'singer-song-list',
            component: () => import(/* webpackChunkName: "singer-song-list" */ '@/views/music/singer-song-list.vue'),
            // componentUrl: 'music/singer-song-list',
            name: 'singerSongList',
            meta: { title: 'singerSongList', noCache: true, icon: 'singer-song-list' } 
          },
          {
            // path: 'singer-song-lyric/:row',  
            path: 'singer-song-lyric',  
            component: () => import(/* webpackChunkName: "singer-song-lyric" */ '@/views/music/singer-song-lyric.vue'),
            // componentUrl: 'music/singer-song-lyric',
            name: 'singerSongLyric',
            meta: { title: 'singerSongLyric', icon: 'singer-song-lyric' } 
          }
        
    ]
  },
  // IT知识
  {
    path: '/itKnowledge',
    component: Layout,
    // componentUrl: 'Layout',
    redirect: '/itKnowledge/front-end',
    name: 'itKnowledge',
    meta: {
      title: 'itKnowledge',
      icon: 'example',
      roles: ['admin', 'editor','test'], // you can set roles in root nav
      alwaysShow: true, // will always show the root menu
      noCache: true
    },
    children: [
          { 
            path: 'front-end',
            component: () => import(/* webpackChunkName: "front" */ '@/views/itKnowledge/front-end.vue'),
            name: 'frontEnd',
            meta: { title: 'frontEnd', noCache: true,
            roles: ['admin', 'editor','test'], // you can set roles in root nav
             icon: 'example' }
          },
          { 
            path: 'rear-end',
            component: () => import(/* webpackChunkName: "rear-end" */ '@/views/itKnowledge/rear-end.vue'),
            name: 'rearEnd',
            meta: { title: 'rearEnd', noCache: true, icon: 'example' }
          },
          { 
            path: 'front-rear-end',
            component: () => import(/* webpackChunkName: "front-rear-end" */ '@/views/itKnowledge/front-rear-end.vue'),
            name: 'frontRearEnd',
            meta: { title: 'frontRearEnd', noCache: true, icon: 'example' }
          },
          { 
            path: 'algorithm',
            component: () => import(/* webpackChunkName: "rear-end" */ '@/views/itKnowledge/algorithm.vue'),
            name: 'algorithm',
            meta: { title: 'algorithm', noCache: true, icon: 'example' }
          },
          { 
            path: 'tool',
            component: () => import(/* webpackChunkName: "tool" */ '@/views/itKnowledge/tool.vue'),
            name: 'tool',
            meta: { title: 'tool', noCache: true, icon: 'example' }
          }
    ]
  },
  {
    path: '/eat',
    component: Layout,
    redirect: '/eat/index',
    name: 'eat',
    meta: {
      title: 'eat',
      icon: 'example',
      roles: ['admin', 'editor','test'], // you can set roles in root nav
      alwaysShow: true, // will always show the root menu
      noCache: true
    },
    children: [
          { 
            path: 'eat/index',
            component: () => import(/* webpackChunkName: "eat/index" */ '@/views/eat/index.vue'),
            // componentUrl: 'eat/index',
            name: ' todayEat',
            meta: { title: 'todayEat', noCache: true, icon: 'singer' }
          },
    ]
  },
  {
    // 免费api接口调用
    path: '/apiInterface',
    component: Layout,
    // componentUrl: 'Layout',
    redirect: '/apiInterface/phone-attribution',
    name: 'apiInterface',
    meta: {
      title: 'apiInterface',
      icon: 'music',
      roles: ['admin', 'editor','test'], // you can set roles in root nav
      alwaysShow: true, // will always show the root menu
      noCache: true
    },
    children: [
          { 
            path: 'apiInterface/phone-attribution',
            component: () => import(/* webpackChunkName: "apiInterface/phone-attribution" */ '@/views/apiInterface/phone-attribution.vue'),
            // componentUrl: 'apiInterface/phone-attribution',
            name: 'phoneAttribution',
            meta: { title: 'phoneAttribution', noCache: true, icon: 'singer' }
          },
    ]
  },
  {
    path: '/icon',
    component: Layout,
    // componentUrl: 'Layout',
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "icons" */ '@/views/icons/index.vue'),
        // componentUrl: 'icons/index',
        name: 'Icons',
        meta: {
          title: 'icons',
          icon: 'icon',
          noCache: true
        }
      }
    ]
  },
  /** when your routing map is too long, you can split it into small modules **/
  componentsRouter,
  chartsRouter,
  nestedRouter,
  tableRouter,
  {
    path: '/example',
    component: Layout,
    // componentUrl: 'Layout',
    redirect: '/example/list',
    meta: {
      title: 'example',
      icon: 'example'
    },
    children: [
      {
        path: 'create',
        component: () => import(/* webpackChunkName: "example-create" */ '@/views/example/create.vue'),
        // componentUrl: 'example/create',
        name: 'CreateArticle',
        meta: {
          title: 'createArticle',
          icon: 'edit'
        }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import(/* webpackChunkName: "example-edit" */ '@/views/example/edit.vue'),
        // componentUrl: 'example/edit',
        name: 'EditArticle',
        meta: {
          title: 'editArticle',
          noCache: true,
          activeMenu: '/example/list',
          hidden: true
        }
      },
      {
        path: 'list',
        component: () => import(/* webpackChunkName: "example-list" */ '@/views/example/list.vue'),
        // componentUrl: 'example/list',
        name: 'ArticleList',
        meta: {
          title: 'articleList',
          icon: 'list'
        }
      }
    ]
  },
  {
    path: '/tab',
    component: Layout,
    // componentUrl: 'Layout',
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "tab" */ '@/views/tab/index.vue'),
        // componentUrl: 'tab/index',
        name: 'Tab',
        meta: {
          title: 'tab',
          icon: 'tab'
        }
      }
    ]
  },
  {
    path: '/error',
    component: Layout,
    // componentUrl: 'Layout',
    redirect: 'noredirect',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import(/* webpackChunkName: "error-page-401" */ '@/views/error-page/401.vue'),
        // componentUrl: 'error-page/401',
        name: 'Page401',
        meta: {
          title: 'page401',
          noCache: true
        }
      },
      {
        path: '404',
        component: () => import(/* webpackChunkName: "error-page-404" */ '@/views/error-page/404.vue'),
        // componentUrl: 'error-page/404',
        name: 'Page404',
        meta: {
          title: 'page404',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/error-log',
    component: Layout,
    // componentUrl: 'Layout',
    redirect: 'noredirect',
    children: [
      {
        path: 'log',
        component: () => import(/* webpackChunkName: "error-log" */ '@/views/error-log/index.vue'),
        // componentUrl: 'error-log/index',
        name: 'ErrorLog',
        meta: {
          title: 'errorLog',
          icon: 'bug'
        }
      }
    ]
  },
  {
    path: '/excel',
    component: Layout,
    // componentUrl: 'Layout',
    redirect: '/excel/export-excel',
    meta: {
      title: 'excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import(/* webpackChunkName: "export-excel" */ '@/views/excel/export-excel.vue'),
        // componentUrl: 'excel/export-excel',
        name: 'ExportExcel',
        meta: { title: 'exportExcel' }
      },
      {
        path: 'export-selected-excel',
        component: () => import(/* webpackChunkName: "select-excel" */ '@/views/excel/select-excel.vue'),
        // componentUrl: 'excel/select-excel',
        name: 'SelectExcel',
        meta: { title: 'selectExcel' }
      },
      {
        path: 'export-merge-header',
        component: () => import(/* webpackChunkName: "merge-header" */ '@/views/excel/merge-header.vue'),
        // componentUrl: 'excel/merge-header',
        name: 'MergeHeader',
        meta: { title: 'mergeHeader' }
      },
      {
        path: 'upload-excel',
        component: () => import(/* webpackChunkName: "upload-excel" */ '@/views/excel/upload-excel.vue'),
        // componentUrl: 'excel/upload-excel',
        name: 'UploadExcel',
        meta: { title: 'uploadExcel' }
      }
    ]
  },
  {
    path: '/zip',
    component: Layout,
    // componentUrl: 'Layout',
    redirect: '/zip/download',
    meta: {
      title: 'zip',
      icon: 'zip',
      alwaysShow: true // will always show the root menu
    },
    children: [
      {
        path: 'download',
        component: () => import(/* webpackChunkName: "zip" */ '@/views/zip/index.vue'),
        // componentUrl: 'zip/index',
        name: 'ExportZip',
        meta: { title: 'exportZip' }
      }
    ]
  },
  {
    path: '/pdf',
    component: Layout,
    // componentUrl: 'Layout',
    redirect: '/pdf/index',
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "pdf" */ '@/views/pdf/index.vue'),
        // componentUrl: 'pdf/index',
        name: 'PDF',
        meta: {
          title: 'pdf',
          icon: 'pdf'
        }
      }
    ]
  },
  {
    path: '/pdf-download-example',
    component: () => import(/* webpackChunkName: "pdf-download-example" */ '@/views/pdf/download.vue'),
    // componentUrl: 'pdf/download',
    meta: { hidden: true }
  },
  {
    path: '/theme',
    component: Layout,
    // componentUrl: 'Layout',
    redirect: 'noredirect',
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "theme" */ '@/views/theme/index.vue'),
        // componentUrl: 'theme/index',
        name: 'Theme',
        meta: {
          title: 'theme',
          icon: 'theme'
        }
      }
    ]
  },
  {
    path: '/clipboard',
    component: Layout,
    // componentUrl: 'Layout',
    redirect: 'noredirect',
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "clipboard" */ '@/views/clipboard/index.vue'),
        // componentUrl: 'clipboard/index',
        name: 'Clipboard',
        meta: {
          title: 'clipboard',
          icon: 'clipboard'
        }
      }
    ]
  },
  {
    path: '/i18n',
    component: Layout,
    // componentUrl: 'Layout',
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "i18n-demo" */ '@/views/i18n-demo/index.vue'),
        // componentUrl: 'i18n-demo/index',
        name: 'I18n',
        meta: {
          title: 'i18n',
          icon: 'international'
        }
      }
    ]
  },
  {
    path: 'https://github.com/Armour/vue-typescript-admin-template',
    meta: {
      title: 'externalLink',
      icon: 'link'
    }
  },
  {
    // path为*代表匹配任何页面，前提是你的路由的配置里面没有其他项能匹配上用户的输入的，这是一个权重问题，
    // *的权重是最低的，放最后面的原因仅仅是为了好看，符合逻辑，
    // 实际上你放哪都一样，当你输入正确的地址仍然会跳转到正确的页面。
    path: '*',
    redirect: '/404',
    meta: { hidden: true }
  }
]

const createRouter = () => new Router({
  mode: 'history',  // Disabled due to Github Pages doesn't support this, enable this if you need.
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  base: process.env.BASE_URL,
  routes: constantRoutes
})

const router = createRouter()



// 

// Personal utils. Can be replaced with `Function` and `(e: Error) => any;` respectively.
export type AnyFunction<RETURN_T = any> = (...args: any[]) => RETURN_T;
export type ErrorHandlerFunction<RETURN_T = any> = (e: Error) => RETURN_T;

let isAugumented = false;
export function augmentVueRouterPush(): void {
	if (isAugumented) { return; }
	isAugumented = true;

	const originalPush = Router.prototype.push; // eslint-disable-line @typescript-eslint/unbound-method
	function augmentedPush(location: RawLocation): Promise<Route>;
	function augmentedPush(location: RawLocation, onResolve?: AnyFunction, onReject?: ErrorHandlerFunction): void;
	function augmentedPush(this: Router, location: RawLocation, onResolve?: AnyFunction, onReject?: ErrorHandlerFunction): void | Promise<Route> {
		const boundOriginalPush = originalPush.bind(this);
		if (onResolve || onReject) {
			return boundOriginalPush(location, onResolve, onReject);
		} else {
			return boundOriginalPush(location)
				.catch((err) => {
					if (Router.isNavigationFailure(err, Router.NavigationFailureType.redirected)) {
						// whatever, we are fine if it's aborted due to navigation redirect
						return Promise.resolve(err.from);
					}
					// rethrow error
					console.log({ err });
					return Promise.reject(err);
				});
		}
  }


  Router.prototype.push = augmentedPush;
  
}

augmentVueRouterPush()


// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher // reset router
}

export default router


// 登录要点两下才可登录成功

// vue-router — Uncaught (in promise) Error: Redirected from “/login” to “/” via a navigation guard：https://stackoverflow.com/questions/62223195/vue-router-uncaught-in-promise-error-redirected-from-login-to-via-a

// https://gist.github.com/eyedean/ce6ab6a5108a1bd19ace64382144b5b0