* 虽然说components文件下的都是全局组件
* 而Global是全局引用，基础组件许多页面都会用到，将其设置成全局组件，其他地方就不必再引用了哦。

* 新建一个文件 global 存放全局组件注册，在 main.js 引入
* import appButton from '@/components/Global/index.vue'
* Vue.component("app-button", appButton);


* 在组件中就可以 <app-button></app-button>

