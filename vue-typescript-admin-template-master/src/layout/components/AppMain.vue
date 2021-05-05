<!--
 * @Author: your name
 * @Date: 2020-09-06 15:00:01
 * @LastEditTime: 2021-05-05 15:44:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-typescript-admin-template-master\src\layout\components\AppMain.vue
-->
<template>
  <section class="app-main">
    <transition
      name="fade-transform"
      mode="out-in"
    >
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { TagsViewModule } from "@/store/modules/tags-view";

@Component({
  name: "AppMain"
})
export default class extends Vue {
  get cachedViews() {
    return TagsViewModule.cachedViews;
  }

  get key() {
    return this.$route.path;
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: scroll;
  overflow: hidden;
}

.fixed-header+.app-main {
  padding-top: 50px;
  height: 100vh;
  overflow: auto;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34  */
    min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
</style>
