<!--
 * @Author: your name
 * @Date: 2021-10-06 14:32:09
 * @LastEditTime: 2021-10-06 18:18:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vueAndTsAndKoa2\src\views\usualWebsite\program.vue
-->
<template>
  <div class="app-container">
    <UsualWebsite :category="2" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UsualWebsite from "./Index.vue";
@Component({
  name: "Design",
  components: {
    UsualWebsite
  }

})

export default class extends Vue {
}
</script>

<style lang="scss"  scope>
</style>
