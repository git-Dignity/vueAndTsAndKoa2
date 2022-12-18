
import Vue from "vue";
  import VueRouter, { Route } from "vue-router";

  import { Store } from "vuex";

  declare module "*.scss" {
    const str: string;
    export default str;
  }

  declare module "*.css" {
    const str: string;
    export default str;
  }

  declare module "*.html" {
    const str: string;
    export default str;
  }
  declare module "*.json" {
    const value: any;
    export default value;
  }

  // 扩充
  declare module "vue/types/vue" {
      interface Vue {
          $router: VueRouter
          $route: Route
          $store: Store<any>
          $api: any
          getVal: any
          toVal: any
      }
  }
