<template>
  <div class="app-container">
    <el-row>
      <el-col
        v-for="(o, index) in 2"
        :key="o"
        :span="8"
        :offset="index > 0 ? 2 : 0"
      >
        <el-card :body-style="{padding: '0px'}">
          <img
            src="https://segmentfault.com/img/bVbeNVj?w=166&h=99"
            class="image"
          >
          <div style="padding: 14px;">
            <span>好吃的汉堡</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button
                type="text"
                class="button"
                @click="photoEnter"
              >
                进入照片
              </el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Form } from "element-ui";
import { cloneDeep } from "lodash";

@Component({
  name: "certificate"

})
export default class extends Vue {
  private tableKey = 0
  private currentDate = new Date()

  private photoEnter() {
    this.$router.push({
      path: "/personal/personal-view/certificate-authentication"
      // query:
    });
  }

  created() {

  }
}
</script>

<style scope>
 .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }
</style>
