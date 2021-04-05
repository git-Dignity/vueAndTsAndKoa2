import Vue, { DirectiveOptions } from 'vue'

import 'normalize.css'
import ElementUI from 'element-ui'
import SvgIcon from 'vue-svgicon'

import '@/styles/element-variables.scss'
import '@/styles/index.scss'

// 公共样式
import '@/styles/utils.scss'

import App from '@/App.vue'
import store from '@/store'
import { AppModule } from '@/store/modules/app'
import router from '@/router'
import i18n from '@/lang'
import '@/icons/components'
import '@/permission'
import '@/utils/error-log'
import '@/pwa/register-service-worker'
import * as directives from '@/directives'
import * as filters from '@/filters'
import { getVal, toVal } from '@/utils/dataVal'
import { sysDateFormat } from "@/utils/tool/date";

// 全局引用基础组件
import appButton from '@/components/Global/index.vue'
Vue.component("app-button", appButton);

// 更新的就npm i全局一下，在npm i zzmcomponentlib --save-dev
import zzmcomponentlib from 'zzmcomponentlib'
import  'zzmcomponentlib/lib/zzmcomponentlib.css'
Vue.use(zzmcomponentlib)




Vue.use(ElementUI, {
  size: AppModule.size, // Set element-ui default size
  i18n: (key: string, value: string) => i18n.t(key, value)
})

Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})

// Register global directives
Object.keys(directives).forEach(key => {
  Vue.directive(key, (directives as { [key: string ]: DirectiveOptions })[key])
})

// Register global filter functions
// 遍历过滤属性值，一次性全部注册
Object.keys(filters).forEach(key => {
  Vue.filter(key, (filters as { [key: string ]: Function })[key])
})

Vue.config.productionTip = false

Vue.prototype.toVal = toVal
Vue.prototype.getVal = getVal
Vue.prototype.sysDateFormat = sysDateFormat
Vue.filter('toVal', toVal)
Vue.filter('getVal', getVal)






new Vue({ 
  router,
  store,
  i18n,
  render: (h) => h(App),
  mounted () {
    document.dispatchEvent(new Event('render-event'))   // 预编译
  }
}).$mount('#app')
