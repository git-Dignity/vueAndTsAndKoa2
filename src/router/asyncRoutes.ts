import componentsRouter from './asyncRoutes/components'
import chartsRouter from './asyncRoutes/charts'
import tableRouter from './asyncRoutes/table'
import nestedRouter from './asyncRoutes/nested'

// 该文件主要是给动态路由使用


export const asyncRoutes = [
  {
    path: '/permission',
    // // component: Layout,
    componentUrl: 'Layout',
    redirect: '/permission/directive',
    meta: {
      title: 'permission',
      icon: 'lock',
      alwaysShow: true // will always show the root menu
    },
    children: [
      {
        path: 'page',
        // // component: () => import(/* webpackChunkName: "permission-page" */ '@/views/permission/page.vue'),
        componentUrl: 'permission/page',
        name: 'PagePermission',
        meta: {
          title: 'pagePermission'
        }
      },
      {
        path: 'directive',
        // // component: () => import(/* webpackChunkName: "permission-directive" */ '@/views/permission/directive.vue'),
        componentUrl: 'permission/directive',
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        // // component: () => import(/* webpackChunkName: "permission-role" */ '@/views/permission/role.vue'),
        componentUrl:  'permission/role',
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
    path: '/sys',
    // // component: Layout,
    componentUrl: 'Layout',
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
        // // component: () => import(/* webpackChunkName: "sys-user" */ '@/views/sys/sys-user.vue'),
        componentUrl: 'sys/sys-user',
        name: 'sysUser',
        meta: { title: 'sysUser', noCache: true }
      },
      {
        path: 'sys-menu',
        // // component: () => import(/* webpackChunkName: "sys-menu" */ '@/views/sys/sys-menu.vue'),
        componentUrl: 'sys/sys-menu',
        name: 'sysMenu',
        meta: { title: 'sysMenu', noCache: true }
      },
      {
        path: 'sys-role',
        // // component: () => import(/* webpackChunkName: "sys-role" */ '@/views/sys/sys-role.vue'),
        componentUrl: 'sys/sys-role',
        name: 'sysRole',
        meta: { title: 'sysRole', noCache: true }
      }
    ]
  },
  {
    path: '/personal',
    // component: Layout,
     componentUrl: 'Layout',
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
        // component: () => import(/* webpackChunkName: "personal-view" */ '@/views/personal/personal-view/index.vue'),
        componentUrl: 'personal/personal-view/index',
        name: 'personalView',
        redirect: '/personal/personal-view/certificate',
        meta: { title: 'personalView', noCache: true },
        children: [
          {
            path: 'certificate',
            // component: () => import(/* webpackChunkName: "certificate" */ '@/views/personal/personal-view/certificate.vue'),
            componentUrl: 'personal/personal-view/certificate',
            name: 'certificate',
            meta: { title: 'certificate', noCache: true }
          },
          {
            path: 'certificate-authentication',
            // component: () => import(/* webpackChunkName: "certificate-authentication" */ '@/views/personal/personal-view/certificate-authentication.vue'),
            componentUrl: 'personal/personal-view/certificate-authentication',
            name: 'certificateAuthentication',
            meta: { title: 'certificateAuthentication', noCache: true }
          }
        ]
      }
    ]
  },

  {
    path: '/music',
    // component: Layout,
     componentUrl: 'Layout',
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
            // component: () => import(/* webpackChunkName: "song-list" */ '@/views/music/index.vue'),
            componentUrl: 'music/index',
            name: 'songList',
            meta: { title: 'songList', noCache: true,
            roles: ['admin', 'editor','test'], // you can set roles in root nav
             icon: 'singer' }
          },
          { 
            path: 'music-singer',
            // component: () => import(/* webpackChunkName: "music-singer" */ '@/views/music/music-singer.vue'),
            componentUrl: 'music/music-singer',
            name: 'musicSinger',
            meta: { title: 'musicSinger', noCache: true, icon: 'singer' }
          },
          {
            path: 'singer-song-list',
            // component: () => import(/* webpackChunkName: "singer-song-list" */ '@/views/music/singer-song-list.vue'),
            componentUrl: 'music/singer-song-list',
            name: 'singerSongList',
            meta: { title: 'singerSongList', noCache: true, icon: 'singer-song-list' } 
          },
          {
            // path: 'singer-song-lyric/:row',  
            path: 'singer-song-lyric',  
            // component: () => import(/* webpackChunkName: "singer-song-lyric" */ '@/views/music/singer-song-lyric.vue'),
            componentUrl: 'music/singer-song-lyric',
            name: 'singerSongLyric',
            meta: { title: 'singerSongLyric', icon: 'singer-song-lyric' } 
          }
        
    ]
  },
  {
    path: '/itKnowledge',
    // component: Layout,
    componentUrl: 'Layout',
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
            componentUrl: 'itKnowledge/front-end',
            // component: () => import(/* webpackChunkName: "front" */ '@/views/itKnowledge/front-end.vue'),
            name: 'frontEnd',
            meta: { title: 'frontEnd', noCache: true,
            roles: ['admin', 'editor','test'], // you can set roles in root nav
             icon: 'example' }
          },
          { 
            path: 'rear-end',
            componentUrl: 'itKnowledge/rear-end',
            // component: () => import(/* webpackChunkName: "rear-end" */ '@/views/itKnowledge/rear-end.vue'),
            name: 'rearEnd',
            meta: { title: 'rearEnd', noCache: true, icon: 'example' }
          },
          { 
            path: 'front-rear-end',
            componentUrl: 'itKnowledge/front-rear-end',
            // component: () => import(/* webpackChunkName: "front-rear-end" */ '@/views/itKnowledge/front-rear-end.vue'),
            name: 'frontRearEnd',
            meta: { title: 'frontRearEnd', noCache: true, icon: 'example' }
          },
          { 
            path: 'algorithm',
            componentUrl: 'itKnowledge/algorithm',
            // component: () => import(/* webpackChunkName: "rear-end" */ '@/views/itKnowledge/algorithm.vue'),
            name: 'algorithm',
            meta: { title: 'algorithm', noCache: true, icon: 'example' }
          },
          { 
            path: 'tool',
            componentUrl: 'itKnowledge/tool',
            // component: () => import(/* webpackChunkName: "tool" */ '@/views/itKnowledge/tool.vue'),
            name: 'tool',
            meta: { title: 'tool', noCache: true, icon: 'example' }
          }
    ]
  },
  // 常用网站
  {
    path: '/usualWebsite',
    // component: Layout,
    componentUrl: 'Layout',
    redirect: '/usualWebsite/program',
    name: 'usualWebsite',
    meta: {
      title: 'usualWebsite',
      icon: 'example',
      roles: ['admin', 'editor','test'], // you can set roles in root nav
      alwaysShow: true, // will always show the root menu
      noCache: true
    },
    children: [
          { 
            path: 'program',
            componentUrl: 'usualWebsite/program',
            // component: () => import(/* webpackChunkName: "program" */ '@/views/usualWebsite/program.vue'),
            name: 'program',
            meta: { title: 'program', noCache: true,
            roles: ['admin', 'editor','test'], // you can set roles in root nav
             icon: 'example' }
          },
          { 
            path: 'design',
            componentUrl: 'usualWebsite/design',
            // component: () => import(/* webpackChunkName: "design" */ '@/views/usualWebsite/design.vue'),
            name: 'design',
            meta: { title: 'design', noCache: true,
            roles: ['admin', 'editor','test'], // you can set roles in root nav
             icon: 'example' }
          },
          { 
            path: 'tool',
            componentUrl: 'usualWebsite/tool',
            // component: () => import(/* webpackChunkName: "tool" */ '@/views/usualWebsite/tool.vue'),
            name: 'tool',
            meta: { title: 'tool', noCache: true,
            roles: ['admin', 'editor','test'], // you can set roles in root nav
             icon: 'example' }
          },
          { 
            path: 'movie',
            componentUrl: 'usualWebsite/movie',
            // component: () => import(/* webpackChunkName: "movie" */ '@/views/usualWebsite/movie.vue'),
            name: 'movie',
            meta: { title: 'movie', noCache: true,
            roles: ['admin', 'editor','test'], // you can set roles in root nav
             icon: 'example' }
          },
          { 
            path: 'other',
            componentUrl: 'usualWebsite/other',
            // component: () => import(/* webpackChunkName: "other" */ '@/views/usualWebsite/other.vue'),
            name: 'other',
            meta: { title: 'other', noCache: true,
            roles: ['admin', 'editor','test'], // you can set roles in root nav
             icon: 'example' }
          },
        
    ]
  },
  
  {
    path: '/eat',
    componentUrl: 'Layout',
    // component: Layout,
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
            path: 'todayEat',
            componentUrl: 'eat/todayEat',
            // component: () => import(/* webpackChunkName: "eat/index" */ '@/views/eat/todayEat.vue'),
            // componentUrl: 'eat/index',
            name: ' todayEat',
            meta: { title: 'todayEat', noCache: true, icon: 'singer' }
          },
          { 
            path: 'breakfast',
            componentUrl: 'eat/breakfast',
            // component: () => import(/* webpackChunkName: "eat/breakfast" */ '@/views/eat/breakfast.vue'),
            // componentUrl: 'eat/breakfast',
            name: ' breakfast',
            meta: { title: 'breakfast', noCache: true, icon: 'singer' }
          },
          { 
            path: 'lunch',
            componentUrl: 'eat/lunch',
            // component: () => import(/* webpackChunkName: "eat/lunch" */ '@/views/eat/lunch.vue'),
            // componentUrl: 'eat/lunch',
            name: ' lunch',
            meta: { title: 'lunch', noCache: true, icon: 'singer' }
          },
          { 
            path: 'dinner',
            componentUrl: 'eat/dinner',
            // component: () => import(/* webpackChunkName: "eat/dinner" */ '@/views/eat/dinner.vue'),
            // componentUrl: 'eat/dinner',
            name: ' dinner',
            meta: { title: 'dinner', noCache: true, icon: 'singer' }
          },
          { 
            path: 'nightingale',
            componentUrl: 'eat/nightingale',
            // component: () => import(/* webpackChunkName: "eat/nightingale" */ '@/views/eat/nightingale.vue'),
            // componentUrl: 'eat/nightingale',
            name: ' nightingale',
            meta: { title: 'nightingale', noCache: true, icon: 'singer' }
          },
          { 
            path: 'other',
            componentUrl: 'eat/other',
            // component: () => import(/* webpackChunkName: "eat/other" */ '@/views/eat/other.vue'),
            // componentUrl: 'eat/other',
            name: ' other',
            meta: { title: 'other', noCache: true, icon: 'singer' }
          },
    ]
  },
  {
    // 免费api接口调用
    path: '/apiInterface',
    // component: Layout,
     componentUrl: 'Layout',
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
            // component: () => import(/* webpackChunkName: "apiInterface/phone-attribution" */ '@/views/apiInterface/phone-attribution.vue'),
            componentUrl: 'apiInterface/phone-attribution',
            name: 'phoneAttribution',
            meta: { title: 'phoneAttribution', noCache: true, icon: 'singer' }
          },
    ]
  },
  {
    path: '/icon',
    // component: Layout,
     componentUrl: 'Layout',
    children: [
      {
        path: 'index',
        // component: () => import(/* webpackChunkName: "icons" */ '@/views/icons/index.vue'),
        componentUrl: 'icons/index',
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
    // // component: Layout,
    componentUrl: 'Layout',
    redirect: '/example/list',
    meta: {
      title: 'example',
      icon: 'example'
    },
    children: [
      {
        path: 'create',
        // component: () => import(/* webpackChunkName: "example-create" */ '@/views/example/create.vue'),
        componentUrl: 'example/create',
        name: 'CreateArticle',
        meta: {
          title: 'createArticle',
          icon: 'edit'
        }
      },
      {
        path: 'edit/:id(\\d+)',
        // component: () => import(/* webpackChunkName: "example-edit" */ '@/views/example/edit.vue'),
        componentUrl: 'example/edit',
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
        // component: () => import(/* webpackChunkName: "example-list" */ '@/views/example/list.vue'),
        componentUrl: 'example/list',
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
    // component: Layout,
     componentUrl: 'Layout',
    children: [
      {
        path: 'index',
        // component: () => import(/* webpackChunkName: "tab" */ '@/views/tab/index.vue'),
        componentUrl: 'tab/index',
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
    // component: Layout,
     componentUrl: 'Layout',
    redirect: 'noredirect',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        // component: () => import(/* webpackChunkName: "error-page-401" */ '@/views/error-page/401.vue'),
        componentUrl: 'error-page/401',
        name: 'Page401',
        meta: {
          title: 'page401',
          noCache: true
        }
      },
      {
        path: '404',
        // component: () => import(/* webpackChunkName: "error-page-404" */ '@/views/error-page/404.vue'),
        componentUrl: 'error-page/404',
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
    // component: Layout,
     componentUrl: 'Layout',
    redirect: 'noredirect',
    children: [
      {
        path: 'log',
        // component: () => import(/* webpackChunkName: "error-log" */ '@/views/error-log/index.vue'),
        componentUrl: 'error-log/index',
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
    // component: Layout,
     componentUrl: 'Layout',
    redirect: '/excel/export-excel',
    meta: {
      title: 'excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        // component: () => import(/* webpackChunkName: "export-excel" */ '@/views/excel/export-excel.vue'),
        componentUrl: 'excel/export-excel',
        name: 'ExportExcel',
        meta: { title: 'exportExcel' }
      },
      {
        path: 'export-selected-excel',
        // component: () => import(/* webpackChunkName: "select-excel" */ '@/views/excel/select-excel.vue'),
        componentUrl: 'excel/select-excel',
        name: 'SelectExcel',
        meta: { title: 'selectExcel' }
      },
      {
        path: 'export-merge-header',
        // component: () => import(/* webpackChunkName: "merge-header" */ '@/views/excel/merge-header.vue'),
        componentUrl: 'excel/merge-header',
        name: 'MergeHeader',
        meta: { title: 'mergeHeader' }
      },
      {
        path: 'upload-excel',
        // component: () => import(/* webpackChunkName: "upload-excel" */ '@/views/excel/upload-excel.vue'),
        componentUrl: 'excel/upload-excel',
        name: 'UploadExcel',
        meta: { title: 'uploadExcel' }
      }
    ]
  },
  {
    path: '/zip',
    // component: Layout,
     componentUrl: 'Layout',
    redirect: '/zip/download',
    meta: {
      title: 'zip',
      icon: 'zip',
      alwaysShow: true // will always show the root menu
    },
    children: [
      {
        path: 'download',
        // component: () => import(/* webpackChunkName: "zip" */ '@/views/zip/index.vue'),
        componentUrl: 'zip/index',
        name: 'ExportZip',
        meta: { title: 'exportZip' }
      }
    ]
  },
  {
    path: '/pdf',
    // component: Layout,
     componentUrl: 'Layout',
    redirect: '/pdf/index',
    children: [
      {
        path: 'index',
        // component: () => import(/* webpackChunkName: "pdf" */ '@/views/pdf/index.vue'),
        componentUrl: 'pdf/index',
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
    // component: () => import(/* webpackChunkName: "pdf-download-example" */ '@/views/pdf/download.vue'),
    componentUrl: 'pdf/download',
    meta: { hidden: true }
  },
  {
    path: '/theme',
    // component: Layout,
     componentUrl: 'Layout',
    redirect: 'noredirect',
    children: [
      {
        path: 'index',
        // component: () => import(/* webpackChunkName: "theme" */ '@/views/theme/index.vue'),
        componentUrl: 'theme/index',
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
    // component: Layout,
     componentUrl: 'Layout',
    redirect: 'noredirect',
    children: [
      {
        path: 'index',
        // component: () => import(/* webpackChunkName: "clipboard" */ '@/views/clipboard/index.vue'),
        componentUrl: 'clipboard/index',
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
    // component: Layout,
     componentUrl: 'Layout',
    children: [
      {
        path: 'index',
        // component: () => import(/* webpackChunkName: "i18n-demo" */ '@/views/i18n-demo/index.vue'),
        componentUrl: 'i18n-demo/index',
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