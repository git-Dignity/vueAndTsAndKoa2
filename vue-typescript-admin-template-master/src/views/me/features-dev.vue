<template>
  <div class="app-container">
    功能开发
    2020/11/22 开发代办事项
    前端：页面开发（添加、导出、分页、列表显示）
    后端：添加、导出、分页、列表接口开发（com.example.bkapi.modules.agentEvent.web）
    数据库：添加`AGENT_EVENT`代办事项表

    2020/11/26
    前端：在代办事项新增：添加模块的进度字段显示为进度条
    表格显示类型和进度显示为标签化
    后端：agentEvent实体schedule类型修改为Integer
    数据库:AGENT_EVENT表字段schedule修改为Number(3)

    2020/11/29
    前端：在代办事项开发进行中、已完成页面接口对接；通知方式：微信方糖通知开发
    后端：koa：开发/common/serverJiang微信方糖接口实现；java：mapper数据库查询添加进度搜索

    2020/12/12
    前端：代办者使用下拉框使用展示用户表的数据；可使用Bark、微信方糖通知，若进度100%，则取消通知
    后端：koa：对接Bark、方糖通知接口并且使用node-schedule定时器，，引入module-alias依赖支持别名
    部署上线上版本
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "FeaturesDev",
  components: {

  }
})
export default class extends Vue {
    private countProp = 8

    private draw(e: Array<Record<string, any>>) {
      console.log(e);
    }

    created() {

    }

    mounted() {}
}
</script>

<style lang="scss"  scope>

</style>
