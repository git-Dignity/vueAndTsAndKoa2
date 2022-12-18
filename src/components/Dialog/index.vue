<template>
  <div>
    <el-dialog
      :title="childrenData.title"
      :visible.sync="childrenData.show"
      :width="childrenData.width"
      :center="childrenData.center"
      :close-on-click-modal="childrenData.isCloseModal"
    >
      <slot name="childTemplate" />
      <span
        v-if="childrenData.isShowSubmit"
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="cancel">{{ $t('table.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="submit"
        >{{ $t('table.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  InjectReactive,
  Watch,
  Vue
} from "vue-property-decorator";
import { EventBus } from "@/eventBus/index";
import { symbol } from "@/utils/symBol";
import { clearEventBus } from "@/eventBus/modules/clearEventBus";

@Component({
  name: "Dialog"
})
export default class extends Vue {
  @Prop({
    type: Object,
    required: true
  })
  childrenData!: object;

  private parentDialogEmit = {};

  submit() {
    this.$emit("update:parentDialogSubmit", this.parentDialogEmit);
  }

  cancel() {
    (this.childrenData as any).show = false;
    this.parentDialogEmit = {};
    this.$emit("update:parentDialogCancel", true);
  }

  mounted() {
    // 因为EventBus是重新new一个vue实例，所以可以写在mounted函数里面，而不需要watch监听
    EventBus.$on("isCloseDialog", (msg: boolean) => {
      if (msg) {
        (this.childrenData as any).show = false;
        clearEventBus("isCloseDialog"); // 用完之后便销毁
      }
    });

    EventBus.$on("parentDialogEmit", (msg: any) => {
      // console.log(msg)
      this.parentDialogEmit = msg;
      clearEventBus("parentDialogEmit"); // 用完之后便销毁
    });

    EventBus.$on("isShowDialog", (msg: boolean) => {
      if (msg) {
        (this.childrenData as any).show = false;
        clearEventBus("isShowDialog"); // 用完之后便销毁
      }
    });
  }
}
</script>

<!--

# Dialog组件说明
这是一个二次封装饿了么的对话框组件

## 示例代码

父组件
import SingerDialog from "@/components/Dialog/index";
@Component({
  name: "",
  components: {
    SingerDialog
  }
})

<SingerDialog
    :childrenData="childrenDialogData"
    @update:parentDialogSubmit="parentDialogData">
    <div slot="childTemplate"></div>
</SingerDialog>

## 参数说明

// 父组件要给子组件传递的信息
  private childrenDialogData = {
    title: "是否删除该歌手照片",  // 对话框标题
    show: false,                    // 是否显示
    width: "35%",
    center: true,             // 是否对头部和底部采用居中布局
    info: []              // 对话框内容需要显示的数据
  };

## 参数说明
  private childrenDialogData = {
    title: "",               // 对话框标题
    show: false | true,         // 是否显示
    width: "35%",
    center: true | false,         // 是否对头部和底部采用居中布局
    info: [
        a1:"aaa",
        a2:"aa2"
    ]                           // 对话框内容需要显示的数据
  };

// 子组件给父组件传，告诉父组件我已经被点击确定了，父组件就做确定的逻辑
submit() {
    this.$emit("update:parentDialogSubmit", this.parentDialogEmit);
  }

// 关于关闭子组件的对话框
父组件
import { EventBus } from "@/eventBus/index";
在子组件传给parentDialogSubmit回调方法，处理好逻辑，写上关闭对话框
EventBus.$emit("isCloseDialog", true);

子组件
 mounted() {
    EventBus.$on("isCloseDialog", msg => {
      if (msg) {
        (this.childrenData as any).show = false;
        // 用完之后便销毁
        EventBus.$off("isCloseDialog", {});
      }
    });
  }

父组件通过改变isCloseDialog的值，子组件通过EventBus.$on监听isCloseDialog值的变化而做关闭对话框的操作
二者通过EventBus，原理就是通过重新new一个vue实例来传值，这也就是为什么子组件可以在mounted函数里面拿到isCloseDialog的值
而不需要通过watch监听

-->
