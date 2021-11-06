<template>
  <div>
    <div class="content-item" v-for="(item, key) in childData" :key="key">
      <div class="content-item-left">{{item.name}}</div>
      <div class="content-item-right">{{item.value || '--'}}</div>
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