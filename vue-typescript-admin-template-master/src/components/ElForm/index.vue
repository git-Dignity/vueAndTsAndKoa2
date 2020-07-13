<template>
  <div>
    <el-row>
      <el-form
        :label-position="childrenFormData.position"
        :label-width="childrenFormData.labelWidth + 'px'"
        ref="dataForm"
        class="ruleForm"
        :size="childrenFormData.size"
        :model="childrenFormData"
      >
        <!-- 循环开始  -->
        <template v-for="(item,i) in childrenFormData.info">
          <!-- 
        	判断循环中的元素是否需要下拉框  
        	:rules="item.rule"  循环中的数据 自定义的 rule 规则
        	:prop="`getAllTableData.${i}.value`"
        	每次循环的时候进行取值, 相当于给每个form绑定了唯一的model
          -->

          <el-form-item
            v-if="!item.hidden && !item.disabled"
            :key="item.name"
            :prop="`info.${i}.value`"
            :rules="item.rule"
            :label="$t(item.label)"
          >
            <template v-if="item.isLink">
              <div class="df df-ac-jc width100">
                <router-link :to="item.toLink" class="width100" style="flex: 5">
                  <el-input
                    v-model="item.value"
                    :placeholder="$t(item.label)"
                    prefix-icon="el-icon-edit"
                    autocomplete="off"
                  ></el-input>
                </router-link>
                <span
                  class="el-icon-s-promotion df-flex1 title-color font-size-24 ml8"
                  @click="linkMap(item)"
                ></span>
              </div>
            </template>
            <template v-else-if="item.isSelect">
              <el-select
                v-model="item.value"
                placeholder="请选择"
                @change="selectChangeForm($event, item)"
              >
                <el-option
                  v-for="item in item.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
            <template v-else-if="item.isDate">
              <el-date-picker v-model="item.value" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </template>
            <template v-else-if="item.isInpNumber">
              <el-input
                v-model.number="item.value"
                :placeholder="$t(item.label)"
                type="tel"
                prefix-icon="el-icon-edit"
                autocomplete="off"
                @keydown="handleInput"
                @blur="inpBlurForm(item)"
              ></el-input>
            </template>
            <template v-else-if="item.isRadio">
              <el-radio-group v-model="item.value" @change="selectChangeForm($event, item)">
                <el-radio
                  v-for="item in item.options"
                  :key="item.value"
                  :label="item.value"
                  class="ml8"
                >{{item.label}}</el-radio>
              </el-radio-group>
            </template>
            <template v-else-if="item.isTextarea">
              <el-input
                v-model="item.value"
                :autosize="{minRows: 2, maxRows: 5}"
                type="textarea"
                :placeholder="$t(item.label)"
                prefix-icon="el-icon-edit"
                autocomplete="off"
              ></el-input>
            </template>
            <template v-else-if="item.isTree">
              <slot></slot>
            </template>
            <template v-else-if="item.isPhoto">
              <el-row :gutter="20" type="flex" class="row-bg" justify="start">
                <el-col :span="6">
                  <UploadFile
                    :childrenUploadFileData="item.childrenUploadImgData"
                    @parentUploadFileData="parentUploadImgData"
                  ></UploadFile>
                </el-col>
              </el-row>
              <!-- <el-avatar shape="square" :size="80" fit="fill" :src="item.value"></el-avatar> -->
            </template>
            <template v-else>
              <el-input
                v-model="item.value"
                :placeholder="$t(item.label)"
                prefix-icon="el-icon-edit"
                autocomplete="off"
                @blur="inpBlurForm(item)"
              ></el-input>
            </template>
          </el-form-item>
        </template>
      </el-form>
    </el-row>
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
import { symbol } from "@/utils/symBol";
import { EventBus } from "@/eventBus/index";
import UploadFile from "@/components/UploadFile/index.vue";

@Component({
  name: "ElemenetForm",
  components: {
    UploadFile
  }
})
export default class extends Vue {
  @Prop({
    type: Object,
    required: true
  })
  childrenFormData!: object;


  // 只能输入数字
  handleInput(e) {
    let a = e.key.replace(/[^\d]/g, "");
    if (!a) {
      e.preventDefault();
    }
  }

  linkMap(item) {
    this.$emit("linkMapChild", item);
  }

  selectChangeForm(e, item) {
    this.$emit("selectChangeFormChild", { selectedName: e, item: item });
  }

  inpBlurForm({ name, value }) {}

  private parentUploadImgData(data: any) {
    // console.log(data);
    this.$emit("UploadImgDataChild", data);
  }

  mounted() {
    this.$emit("parentForm", this.$refs.dataForm);
  }
}
</script>

<style lang="scss" scoped>
.el-form-item,
.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  //   width: 90%;
  //   margin-left: 5%;
}
</style>





<!-- 


-->

