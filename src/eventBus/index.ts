import Vue from "vue";
export const EventBus = new Vue();

// 父组件清除子组件数据
// import {EventBus} from "@/eventBus/index";
// EventBus.$emit("clear", true);

// 子组件拿到clear执行清除数据
// EventBus.$on("clear", msg => {
//     console.log(msg);
//     if (msg) {
//     this.parentFileData = [];
//     this.fileList = [];
//     // 用完之后便销毁
//     EventBus.$off('clear', {})
//     }
// });
