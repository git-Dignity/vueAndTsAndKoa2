import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const nestedRoutes = {
  path: '/nested',
  // component: Layout,
  componentUrl: 'Layout',
  redirect: '/nested/menu1',
  name: 'Nested',
  meta: {
    title: 'nested',
    icon: 'nested'
  },
  children: [
    {
      path: 'menu1',
      // component: () => import(/* webpackChunkName: "menu1" */ '@/views/nested/menu1/index.vue'),
      componentUrl: 'nested/menu1/index',
      redirect: '/nested/menu1/menu1-1',
      name: 'Menu1',
      meta: { title: 'menu1' },
      children: [
        {
          path: 'menu1-1',
          // component: () => import(/* webpackChunkName: "menu1-1" */ '@/views/nested/menu1/menu1-1/index.vue'),
          componentUrl: 'nested/menu1/menu1-1/index',
          name: 'Menu1-1',
          meta: { title: 'menu1-1' }
        },
        {
          path: 'menu1-2',
          // component: () => import(/* webpackChunkName: "menu1-2" */ '@/views/nested/menu1/menu1-2/index.vue'),
          componentUrl: 'nested/menu1/menu1-2/index',
          redirect: '/nested/menu1/menu1-2/menu1-2-1',
          name: 'Menu1-2',
          meta: { title: 'menu1-2' },
          children: [
            {
              path: 'menu1-2-1',
              // component: () => import(/* webpackChunkName: "menu1-2-1" */ '@/views/nested/menu1/menu1-2/menu1-2-1/index.vue'),
              componentUrl: 'nested/menu1/menu1-2/menu1-2-1/index',
              name: 'Menu1-2-1',
              meta: { title: 'menu1-2-1' }
            },
            {
              path: 'menu1-2-2',
              // component: () => import(/* webpackChunkName: "menu1-2-2" */ '@/views/nested/menu1/menu1-2/menu1-2-2/index.vue'),
              componentUrl: 'nested/menu1/menu1-2/menu1-2-2/index',
              name: 'Menu1-2-2',
              meta: { title: 'menu1-2-2' }
            }
          ]
        },
        {
          path: 'menu1-3',
          // component: () => import(/* webpackChunkName: "menu1-3" */ '@/views/nested/menu1/menu1-3/index.vue'),
          componentUrl: 'nested/menu1/menu1-3/index',
          name: 'Menu1-3',
          meta: { title: 'menu1-3' }
        }
      ]
    },
    {
      path: 'menu2',
      // component: () => import(/* webpackChunkName: "menu2" */ '@/views/nested/menu2/index.vue'),
      componentUrl: 'nested/menu2/index',
      name: 'Menu2',
      meta: { title: 'menu2' }
    }
  ]
}

export default nestedRoutes
