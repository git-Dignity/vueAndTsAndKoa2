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
          v-permission="['admin']"
          icon="el-icon-circle-plus-outline"
          @click="add('添加')"
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
            :children-form-data="searchForm"
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

    <!-- 弹框 -->
    <RoleDialog
      :children-data="dialogData"
      @update:parentDialogSubmit="parentDialogSubmit"
    >
      <div slot="childTemplate">
        <ElemenetForm
          :children-form-data="addForm"
          @parentForm="parentForm"
          @UploadImgDataChild="UploadImgDataChild"
        />
      </div>
    </RoleDialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import ElemenetForm from "@/components/ElForm/index.vue";
import RoleDialog from "@c/Dialog/index.vue";
 import {
  SearchAndFetures
} from "./modules/SearchAndFetures";
import { getFormValue, validateForm } from "@/utils/tool/form";
import { UserModule } from "@/store/modules/user";
import {
  MessageWarning
} from "@/utils/tool/message";

@Component({
  components: { ElemenetForm, RoleDialog }
})
export default class extends Vue {
  private loading = false
  private activeNames = ["search"];
  private authorOption: any[] = [];
  private dialogData = {
    title: "添加",
    show: false,
    width: "40%",
    center: true,
    isCloseModal: false,
    isShowSubmit: true,
    info: []
  };

  private refsForm: any = [];
  private searchAndFetures = new SearchAndFetures(this.dialogData);

  @Prop({
    default: () => {
        return {
            name: "searchFormData",
            position: "right",
            size: "medium",
            inline: true,
            info: {}

        };
    }
  }) private searchForm!: object;

  @Prop({ default: () => null }) private addForm!: object;

  get name() {
    return UserModule.name;
  }

  async search() {
    this.$emit("search", getFormValue(this.searchForm.info));
  }

  /**
   * 重置
   */
  resetForm() {
    this.initForm();
    this.$emit("search", getFormValue(this.searchForm.info));
  }

   initForm = (id = "", title = "", front_end = "", node = "", java = "", database_sql = "", remarks = "") => {
    this.searchForm.info.id.value = id;
    this.searchForm.info.title.value = title;
    this.searchForm.info.front_end.value = front_end;
    this.searchForm.info.node.value = node;
    this.searchForm.info.java.value = java;
    this.searchForm.info.database_sql.value = database_sql;
    this.searchForm.info.remarks.value = remarks;
}

  add(title: string) {
      this.searchAndFetures.showDialog(title, true, false);
  }

  handleDownload() {
    this.$emit("handleDownload", true);
  }

  private async parentDialogSubmit(data: any) {
 if (!validateForm(this.refsForm).includes("false")) {
      const paramet = getFormValue(this.addForm.info);
      paramet.auth = this.name;

      this.$emit("dialogSubmit", this.dialogData.title, paramet, this.addForm.file);
    } else {
      MessageWarning("请检查信息是否上传齐全");
    }
  }

  private parentForm(data: any) {
    console.log(data);
    this.refsForm.push(data);
  }

  private UploadImgDataChild(data: any) {
    this.addForm.file = data.file;
  }
}
</script>

<style lang="scss"  scope>
.el-collapse-item__wrap {
  padding: 10px;
}
</style>
