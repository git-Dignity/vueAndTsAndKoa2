<!--
 * @Author: your name
 * @Date: 2021-10-06 14:32:09
 * @LastEditTime: 2021-10-07 14:29:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vueAndTsAndKoa2\src\views\usualWebsite\program.vue
-->
<template>
  <div class="app-container">
    <Eat :category="3" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Eat from "./Index.vue";
@Component({
  name: "Dinner",
  components: {
    Eat
  }

})

export default class extends Vue {
}
</script>

<style lang="scss"  scope>
</style>
