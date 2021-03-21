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
    后端：koa：对接Bark、方糖通知接口并且使用node-schedule定时器，引入module-alias依赖支持别名
    部署上线上版本

    2020/12/13
    前端：1：代办事项通知方式添加邮箱contact发送功。2：每天19点定时发送信息到邮箱
    后端koa：引入nodemailer依赖开发邮箱发送功能。2：timer/loveWords文件执行定时器
    数据库：agent_event表添加CONTACT字段、VARCHAR2(30)、联系方式（noticeWay值的1、2：存的是手机号码； 3：存qq邮箱）

    2021/02/22
    前端：1：添加IT知识菜单（前端、后端）。2：开发IT知识-前端页面（添加、查看、分页）（删、改尚未完成）（src\views\itKnowledge\front-end.vue）
    后端koa：1：添加itKnowledge/frontEnd路由。2：开发增删改查接口
    数据库：itKnowledge表创建（id、title、content、photo、photo_name、random_num、type、auth、remaks、upload_time）

    2021/02/23
    前端：1：开发IT知识-前端页面（删、改完成）（src\views\itKnowledge\front-end.vue）

    2021/02/24
    前端：1：开发IT知识-修改的时候，上传图片，删除之前的照片
    后端koa：1：put接口，修改的时候，上传图片，删除之前的照片:。2：upload.js文件添加新unlinkSync方法，用来删除图片文件

    2021/02/25
    前端：1：开发IT知识-搜索（标题、类型、上传者、备注、上传时间）
    后端koa：1：修改GET itKnowledge/frontEnd/ 接口（支持条件搜索、目前时间搜索失败）

    2021/02/28
    前端：1：开发IT知识-前端和后端模块统一使用同一个模板（vue组件）；2：系统自适应rem（postcss-plugin-px2rem）
    后端koa：1：修改增删改查 itKnowledge/frontEnd/ 接口（支持条件搜索、修复时间搜索失败）；2：现在不会报错导致程序崩了，之前是throw
    数据库：itKnowledge表添加category字段，类别（前端：1；后端：2）

    2021/03/05
    前端：1：开发音乐模块的歌手清单；支持歌手名搜索（多选）
    后端java：1：修改bk/music/singerSonger/list 接口（支持singerName歌手名条件多选搜索）；2：mybatis才有foreach查询

    2021/03/06
    前端：1：解决登录页面密码错误登录按钮一直还在转；2：了解@Action({rawError:true})

    2021/03/07
    前端：1：开发功能代办（增、查）（src\views\me\features-dev.vue）；2：封装页面的头部，进行搜索、功能按钮的组件SearchFeatures（src\components\SearchAndFeatures\SearchFeatures.vue）
    后端koa：1：开发增删改查 featuresDev/ 接口（支持条件搜索）
    数据库：features表添加(title,front_end,node,java,database_sql,auth,remarks)字段

    代做   歌手那要做个歌手名搜索，接口获取，为空才显示

    在写一个踩坑日记
    java写了
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
