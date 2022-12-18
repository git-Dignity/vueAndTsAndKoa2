<template>
  <div>
    <el-row>
      <el-form
        :ref="childrenFormData.name"
        :label-position="childrenFormData.position"
        :label-width="childrenFormData.labelWidth + 'px'"
        class="ruleForm"
        :size="childrenFormData.size"
        :model="childrenFormData"
        :inline="childrenFormData.inline"
      >
        <!-- 循环开始  -->
        <template v-for="(item,i) in childrenFormData.info">
          <!-- 判断循环中的元素是否需要下拉框
        	:rules="item.rule"  循环中的数据 自定义的 rule 规则
        	:prop="`getAllTableData.${i}.value`"
          每次循环的时候进行取值, 相当于给每个form绑定了唯一的model-->

          <el-form-item
            v-if="!item.hidden && !item.disabled"
            :key="i"
            :prop="`info.${i}.value`"
            :rules="item.rule"
            :label="$t(item.label)"
          >
            <template v-if="item.isLink">
              <div class="df df-ac-jc width100">
                <router-link
                  :to="item.toLink"
                  class="width100"
                  style="flex: 5"
                >
                  <el-input
                    v-model="item.value"
                    :placeholder="$t(item.label)"
                    prefix-icon="el-icon-edit"
                    autocomplete="off"
                  />
                </router-link>
                <span
                  class="el-icon-s-promotion df-flex1 title-color font-size-24 ml8"
                  @click="linkMap(item)"
                />
              </div>
            </template>
            <template v-else-if="item.isSelect">
              <!-- multiple：是否开启多选 -->
              <el-select
                v-model="item.value"
                placeholder="请选择"
                :multiple="item.multiple"
                :collapse-tags="item.multiple"
                @change="selectChangeForm($event, item)"
              >
                <el-option
                  v-for="(item, optionKey) in item.options"
                  :key="optionKey"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </template>
            <template v-else-if="item.isDate">
              <el-date-picker
                v-model="item.value"
                :value-format="item.valueFormat"
                type="datetime"
                placeholder="选择日期时间"
              />
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
              />
            </template>
            <template v-else-if="item.isRadio">
              <el-radio-group
                v-model="item.value"
                @change="selectChangeForm($event, item)"
              >
                <el-radio
                  v-for="(item, k) in item.options"
                  :key="k"
                  :label="item.value"
                  class="ml8"
                >
                  {{ item.label }}
                </el-radio>
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
              />
            </template>
            <template v-else-if="item.isTree">
              <slot />
            </template>
            <template v-else-if="item.isPhoto">
              <el-row
                :gutter="20"
                type="flex"
                class="row-bg"
                justify="start"
              >
                <el-col :span="6">
                  <UploadFile
                    :children-upload-file-data="item.childrenUploadImgData"
                    @parentUploadFileData="parentUploadImgData"
                  />
                </el-col>
              </el-row>
              <!-- <el-avatar shape="square" :size="80" fit="fill" :src="item.value"></el-avatar> -->
            </template>
            <template v-else-if="item.isSlider">
              <el-slider
                v-model="item.value"
                :step="10"
                show-stops
              />
              <!-- <el-avatar shape="square" :size="80" fit="fill" :src="item.value"></el-avatar> -->
            </template>
            <template v-else>
              <el-input
                v-model="item.value"
                :placeholder="$t(item.label)"
                prefix-icon="el-icon-edit"
                autocomplete="off"
                @blur="inpBlurForm(item)"
              />
            </template>
          </el-form-item>
        </template>
        <!-- 插槽，一般显示查询重置按钮 -->
        <template v-if="childrenFormData.isSlot">
          <slot />
        </template>
      </el-form>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, InjectReactive, Watch, Vue } from "vue-property-decorator";
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

  // 因为type为异步，值显示不出来
  @Watch("childrenFormData.info.type.value")
  private getSchedule(data: any) {
    console.log(data);
  }

  // 只能输入数字
  handleInput(e: any) {
    const a = e.key.replace(/[^\d]/g, "");
    if (!a) {
      e.preventDefault();
    }
  }

  linkMap(item: any) {
    this.$emit("linkMapChild", item);
  }

  selectChangeForm(e: any, item: any) {
    console.log(item);

    this.$emit("selectChangeFormChild", { selectedName: e, item: item });
  }

  inpBlurForm({ name, value }: any) {
    // console.log(name, value);
  }

  private parentUploadImgData(data: any) {
    // console.log(data);
    this.$emit("UploadImgDataChild", data);
  }

  mounted() {
    this.$emit("parentForm", this.$refs[(this.childrenFormData as any).name]);
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
