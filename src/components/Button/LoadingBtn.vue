<template>
  <div>
    <div
      class="btn ml8"
      :class="{'btnClick': isClick}"
      @click="searchPhone"
    >
      查询
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  name: "loadingBtn",
  components: {}
})
export default class extends Vue {
  @Prop({ default: "" }) private isClick!: string;

  private searchPhone() {
    this.$emit("searchPhone", "");
  }
}
</script>

<style lang="scss" scoped>
.btn,
.btn::before {
  width: 200px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  border-radius: 3px;
}
.btn {
  position: relative;
  background: #5ad;
  color: #fff;
  cursor: pointer;
}
.btn::before {
  content: "loading";
  position: absolute;
  display: none;
  z-index: 2;
  top: 0;
  left: 0;
  color: #fff;
  text-shadow: rgba(100, 0, 0, 1) 0 0 3px;
  background: linear-gradient(
    45deg,
    #fc0 0%,
    #fc0 20%,
    #fa0 20%,
    #fa0 45%,
    #fc0 45%,
    #fc0 70%,
    #fa0 70%,
    #fa0 95%,
    #fc0 95%,
    #fc0 100%
  );
  background-size: 30px 30px;
  background-position: 0 0;
  animation: btnClick 1s infinite linear;
}
.btn.btnClick::before {
  display: block;
}

@keyframes btnClick {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 30px 0;
  }
}
</style>

<!--  写组件，写规范
  实现点击按钮后CSS加载效果: https://mp.weixin.qq.com/s/82HRpX5WpDVt7DTsdDsyzA
 -->
