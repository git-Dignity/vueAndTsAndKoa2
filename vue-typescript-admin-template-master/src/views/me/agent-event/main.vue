<template>
  <div class="app-container">
    <div class="full-content">
      <div class="full-head">
        <HeadRadio
          v-model="tabName"
          :list="tabs"
        />
      </div>
      <div class="full-main">
        <Table
          v-if="tabName === '未完成'"
          :schedule="'0'"
        />
        <Table
          v-if="tabName === '进行中'"
          :schedule="'2'"
        />
        <Table
          v-if="tabName === '已完成'"
          :schedule="'1'"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HeadRadio from "@c/HeadRadio/index.vue";
import Table from "./component/table.vue";

@Component({
  name: "AgentEvent",
  components: {
    HeadRadio,
    Table
  }
})
export default class extends Vue {
  private tabs = ["未完成", "进行中", "已完成"];
  private tabName = "未完成";

  private draw(e: Array<Record<string, any>>) {
    console.log(e);
  }

  created() {}

  mounted() {}
}
</script>

<style lang="scss"  scope>
.full-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  // z-index: 1000;
  font-size: 16px;
  .full-head {
    height: 50px;
    background: linear-gradient(to right, #f7f8fa, #fff, #f7f8fa, #fff);
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #f7f8fa;
    .head-radio {
      font-size: 20px;
      font-weight: bold;
      & > div {
        height: 100%;
        margin-right: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        &::after {
          content: "";
          width: 1px;
          height: 20px;
          background-color: #f3f3f3;
          transform: translateX(20px);
        }
        &:last-child::after {
          display: none;
        }
        &.active {
          border: none;
          color: #307bf2;
          &::before {
            content: "";
            height: 3px;
            width: 100%;
            position: absolute;
            bottom: 0;
            background-color: #307bf2;
          }
        }
      }
    }
  }
  .full-main {
    flex: 1;
    margin: 0 20px 20px 20px;
    overflow: hidden;
  }
}
</style>
