import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const chartsRouter: RouteConfig = {
  path: '/charts',
  component: Layout,
  // componentUrl: 'Layout',
  redirect: 'noredirect',
  name: 'Charts',
  meta: {
    title: 'charts',
    icon: 'chart'
  },
  children: [
    {
      path: 'bar-chart',
      component: () => import(/* webpackChunkName: "bar-chart" */ '@/views/charts/bar-chart.vue'),
      // componentUrl: 'charts/bar-chart',
      name: 'BarChartDemo',
      meta: {
        title: 'barChart',
        noCache: true
      }
    },
    {
      path: 'line-chart',
      component: () => import(/* webpackChunkName: "line-chart" */ '@/views/charts/line-chart.vue'),
      // componentUrl: 'charts/line-chart',
      name: 'LineChartDemo',
      meta: {
        title: 'lineChart',
        noCache: true
      }
    },
    {
      path: 'mixed-chart',
      component: () => import(/* webpackChunkName: "mixed-chart" */ '@/views/charts/mixed-chart.vue'),
      // componentUrl: 'charts/mixed-chart',
      name: 'MixedChartDemo',
      meta: {
        title: 'mixedChart',
        noCache: true
      }
    }
  ]
}

export default chartsRouter
