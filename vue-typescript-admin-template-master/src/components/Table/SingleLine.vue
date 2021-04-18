<!--
 * @Author: your name
 * @Date: 2020-09-12 13:05:48
 * @LastEditTime: 2021-04-18 21:41:56
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue-typescript-admin-template-master\src\components\Table\SingleLine.vue
-->
<template>
  <div>
    <div
      v-for="(item, key) in childData"
      :key="key"
      class="content-item"
    >
      <div class="content-item-left">
        {{ item.name }}
      </div>
      <div class="content-item-right">
        {{ item.value || '--' }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  name: "singleLine",
  components: {}
})
export default class extends Vue {
  @Prop({ default: () => [] }) private childData!: any[];
}
</script>

<style lang="scss" scoped>
.content-item {
  display: flex;
  justify-content: space-between;
  .content-item-left,
  .content-item-right {
    border-left: 1px solid #f3f3f3;
    border-top: 1px solid #f3f3f3;
    padding: 10px;
    text-align: center;
  }
  .content-item-left {
    width: 34%;
  }
  .content-item-right {
    width: 66%;
    border-right: 1px solid #f3f3f3;
    color: #646466;
  }
}
.content-item:last-child {
  border-bottom: 1px solid #f3f3f3;
}
</style>
