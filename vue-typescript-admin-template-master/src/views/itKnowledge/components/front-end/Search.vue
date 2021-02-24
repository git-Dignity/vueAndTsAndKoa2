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
          <el-form
            ref="frontEndForm"
            :inline="true"
            :model="frontEndForm"
            class="demo-form-inline"
          >
            <el-form-item
              label="标题"
              prop="title"
            >
              <el-input
                v-model="frontEndForm.title"
                placeholder="请输入标题"
              />
            </el-form-item>
            <el-form-item
              label="类型"
              prop="type"
            >
              <el-input
                v-model="frontEndForm.type"
                placeholder="请输入类型"
              />
            </el-form-item>
            <el-form-item
              label="上传者"
              prop="auth"
            >
              <el-select
                v-model="frontEndForm.auth"
                placeholder="请输入上传者"
              >
                <el-option
                  v-for="(author, index) in authorOption"
                  :key="index"
                  :label="author.label"
                  :value="author.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              label="备注"
              prop="remarks"
            >
              <el-input
                v-model="frontEndForm.remarks"
                placeholder="请输入备注"
              />
            </el-form-item>
            <el-form-item
              label="上传时间"
              prop="uploadTime"
            >
              <el-date-picker
                v-model="frontEndForm.uploadTime"
                align="right"
                type="date"
                placeholder="请输入上传日期"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="search"
              >
                查询
              </el-button>
              <el-button @click="resetForm('frontEndForm')">
                重置
              </el-button>
            </el-form-item>
          </el-form>
        </el-row>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getSysUser } from "@/api/sys/sysUser";

@Component({
  components: {}
})
export default class extends Vue {
  private frontEndForm = {
    title: "",
    type: "",
    auth: "",
    remarks: "",
    uploadTime: ""
  };

  private loading = false
  private activeNames = ["search"];
  private authorOption: any[] = [];
  private pickerOptions = {
        disabledDate(time: any) {
        return time.getTime() > Date.now();
        },
        shortcuts: [{
        text: "今天",
        onClick(picker: any) {
            picker.$emit("pick", new Date());
        }
        }, {
        text: "昨天",
        onClick(picker: any) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit("pick", date);
        }
        }, {
        text: "一周前",
        onClick(picker: any) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit("pick", date);
        }
        }]
  }

  async search() {
      console.log(this.frontEndForm);
    this.$emit("search", this.frontEndForm);
  }

  resetForm(formName: string) {
    (this.$refs[formName] as any).resetFields();
    this.$emit("search", this.frontEndForm);
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
   }

  mounted() {
   this.getUser();
  }
}
</script>

<style lang="scss"  scope>
.el-collapse-item__wrap {
  padding: 10px;
}
</style>
