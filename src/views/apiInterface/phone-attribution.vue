<template>
  <div class="app-container">
    <loadingBtn
      :is-click="isClick"
      @loadClick="loadClick"
    />
    <!-- <div class="container-title">
      <el-input placeholder="请输入手机号码" v-model="itemList[0].value">
        <i slot="prefix" class="el-input__icon el-icon-phone-outline"></i>
      </el-input>
      <LoadingBtn :isClick="isClick" @searchPhone="searchPhone"></LoadingBtn>
    </div>
    <div class="container-content">
      <SingleLine :childData="itemList"></SingleLine>
    </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SingleLine from "@/components/Table/SingleLine.vue";
// import LoadingBtn from "@/components/Button/LoadingBtn.vue";
import { mobile } from "@/api/apiInterface/phone-attribution";
import { key } from "@/const/juhe";
import { MessageWarning } from "@/utils/tool/message";
import { itemList, myCheck } from "@/views/apiInterface/phone-attribution/index";

@Component({
  name: "phoneAttribution",
  components: {
    SingleLine
    // LoadingBtn
  }
})
export default class extends Vue {
  private isClick = false;
  private itemList = itemList

  private loadClick() {
        this.isClick = true;
        console.log(this.isClick);
        setTimeout(() => {
            this.isClick = false;
        }, 2000);
    }

  created() {
    // console.log(myCheck);
  }

  private async init() {
    this.isClick = true;
    const { data } = await mobile({
      key,
      phone: this.itemList[0].value
    });
    // console.log(data);
    this.isClick = false;
    if (data) {
      this.itemList[1].value = data.province + "-" + data.city;
      this.itemList[2].value = data.company;
      this.itemList[3].value = data.areacode;
      this.itemList[4].value = data.zip;
    } else {
      MessageWarning(data);
    }
  }

  private searchPhone() {
    // 验证手机号中国(宽松), 只要是13,14,15,16,17,18,19开头即可
    if (myCheck.isMPRelaxed(this.itemList[0].value)) {
      this.init();
    } else {
      MessageWarning("请输入正确的手机号码!");
    }
  }

  mounted() {}
}
</script>

<style lang="scss"  scope>
.app-container {
  height: 100%;
  .container-title {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .container-content {
    margin-top: 20px;
  }
}
</style>

<!-- 手机号码查询https://www.juhe.cn/docs/api/id/11 -->
