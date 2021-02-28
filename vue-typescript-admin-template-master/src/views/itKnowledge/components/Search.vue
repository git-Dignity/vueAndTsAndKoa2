<template>
  <div>
    <el-collapse
      v-model="activeNames"
      accordion
    >
      <el-collapse-item
        name="features"
      >
        <template slot="title">
          功能按钮 &nbsp;
          <i class="el-icon-connection" />
        </template>
        <el-button
          icon="el-icon-circle-plus-outline"
          @click="add"
        >
          {{ $t('table.add') }}
        </el-button>
        <el-button
          v-waves
          :loading="loading"
          class="filter-item"
          type="info"
          icon="el-icon-download"
          @click="handleDownload"
        >
          {{ $t('table.export') }}
        </el-button>
      </el-collapse-item>

      <el-collapse-item
        name="search"
      >
        <template slot="title">
          搜索前端链接 &nbsp;
          <i class="el-icon-search" />
        </template>

        <el-row :gutter="15">
          <ElemenetForm
            :children-form-data="frontEndForm"
          >
            <el-button
              type="primary"
              @click="search"
            >
              查询
            </el-button>
            <el-button @click="resetForm()">
              重置
            </el-button>
          </ElemenetForm>
        </el-row>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import ElemenetForm from "@/components/ElForm/index.vue";
import { getSysUser } from "@/api/sys/sysUser";
import { Form, initForm, setFormType } from "../modules/searchFormData";
import { getFormValue } from "@/utils/tool/form";

@Component({
  components: { ElemenetForm }
})
export default class extends Vue {
  private frontEndForm = Form;

  private loading = false
  private activeNames = ["search"];
  private authorOption: any[] = [];

  @Prop({ default: 1 }) private category!: number;

  async search() {
    this.$emit("search", getFormValue(this.frontEndForm.info));
  }

  /**
   * 重置
   */
  resetForm() {
    initForm();
    this.$emit("search", getFormValue(this.frontEndForm.info));
  }

  add() {
    this.$emit("add", true);
  }

  handleDownload() {
    this.$emit("handleDownload", true);
  }

  // 获取用户列表
  private async getUser() {
    const { data } = await getSysUser({
        page: 1,
        limit: 1000
    });

    data.items.forEach((i: any) => {
        const tmp = {
            label: i.username,
            value: i.username
        };
        this.authorOption.push(tmp);
    });
    (this.frontEndForm.info.auth as any).options = this.authorOption;
   }

  mounted() {
   this.getUser();
   setFormType(this.category);
  }
}
</script>

<style lang="scss"  scope>
.el-collapse-item__wrap {
  padding: 10px;
}
</style>
