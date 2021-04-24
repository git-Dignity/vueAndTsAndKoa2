/*
 * @Author: your name
 * @Date: 2020-09-06 15:00:00
 * @LastEditTime: 2021-04-24 11:41:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-typescript-admin-template-master\src\shims-vue.d.ts
 */
declare module '*.scss' {
    const str: string;
    export default str;
  }
  
  declare module '*.css' {
    const str: string;
    export default str;
  }
  
  declare module '*.html' {
    const str: string;
    export default str;
  }
  declare module '*.json' {
    const value: any;
    export default value;
  }

  
  
  import Vue from 'vue';
  import VueRouter from 'vue-router';
  import { Route } from 'vue-router';
  import { Store } from 'vuex';
  
  
  // 扩充
  // vue-cli3 + ts 通过Vue.prototype绑定的属性方法，但是编译报错，需要在这里加
  declare module 'vue/types/vue' {
      interface Vue {
          $router: VueRouter;
          $route: Route;
          $store: Store<any>;
          $api: any;
          awaitWraper: any;
          toVal: any;
          getVal: any;
          myTool: any;
      }
  }