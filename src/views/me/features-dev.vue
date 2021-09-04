<template>
  <div class="app-container">
    <Search
      ref="featuresDevSearchFeatures"
      :search-form="searchForm"
      :add-form="undoneForm"
      @search="search"
      @dialogSubmit="dialogSubmit"
    />
    <el-timeline
      v-loading="loading"
      class="mt15"
    >
      <el-timeline-item
        v-for="(data, index) in tableData.data"
        :key="index"
        :timestamp="sysDateFormat(data.create_time)"
        placement="top"
      >
        <el-card>
          <h4>{{ data.title }}</h4>
          <p>前端：{{ toVal(data.front_end) }}</p>
          <p>node：{{ toVal(data.node) }}</p>
          <p>java：{{ toVal(data.java) }}</p>
          <p>数据库：{{ toVal(data.database_sql) }}</p>
          <p>备注：{{ data.remaks | toVal }}</p>
          <p>作者：{{ data.auth | toVal }}</p>
          <div class="btn-content">
            <i
              class="el-icon-edit-outline"
              :title="'Edit【' + data.title + '】'"
              @click="btnEdit(data)"
            />
            <i
              class="el-icon-delete"
              title="我到底做错了什么，要Del Me~"
              @click="btnDelete(data.id)"
            />
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <pagination
      v-show="tableData.listQuery.total>0"
      :total="tableData.listQuery.total"
      :page.sync="tableData.listQuery.current"
      :page-sizes.sync="tableData.listQuery.pageSize"
      :limit.sync="tableData.listQuery.size"
      @pagination="pageChange"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Search from "@c/SearchAndFeatures";
import RoleDialog from "@c/Dialog/index.vue";
import ElemenetForm from "@/components/ElForm/index.vue";
import { Form, initForm } from "./modules/features-dev/formData";
import { searchForm } from "./modules/features-dev/searchFormData";
import {
  get,
  create,
  update,
  del
} from "@/api/me/featuresDev";
import { showNotify } from "@/utils/tool/notification";
import { EventBus } from "@/eventBus/index";
import { IFeaturesDevType } from "@/api/me/featuresDevType";
import { columns } from "@/views/me/modules/features-dev/tableData";
import Pagination from "@/components/Pagination/index.vue";
import {
  MessageSuccess,
  MesssageBoxQuestion
} from "@/utils/tool/message";

@Component({
  name: "FeaturesDev",
  components: {
    Search,
    RoleDialog,
    ElemenetForm,
    Pagination
  }
})
export default class extends Vue {
  private undoneForm = Form;
  private searchForm = searchForm
  private loading = false;
  private list: IFeaturesDevType[] = [];
  private tableData = {
    data: this.list,
    column: columns,
    border: true,
    tableWidth: "width: 100%",
    defaultSort: { prop: "isSys", order: "descending" },
    listQuery: {
      current: 1,
      size: 3,
      total: 0,
      pageSize: [3, 6, 9, 12, 1000],
      title: "",
      front_end: "",
      node: "",
      remarks: "",
      database_sql: "",
      uploadTime: "",
      sort: "+id"
    }
  };

  /**
   * 弹框回调
   */
  private async dialogSubmit(title: string, paramet: any) {
    console.log(title, paramet);

    if (title === "添加") {
        const { data } = await create(paramet);
        console.log(data);

        if (data.msg === "添加成功") { showNotify(4, "创建" + paramet.title + "成功"); }
      } else if (title.indexOf("修改") !== -1) {
        const { data } = await update(paramet);
        console.log(data);
        if (data.msg === "修改成功") {
          showNotify(4, "修改" + paramet.title + "成功");
        }
      }

      EventBus.$emit("isShowDialog", true);
      initForm();
      this.getList();
  }

  private async getList() {
    this.loading = true;
    const { data } = await get(this.tableData.listQuery);
    console.log(data);

    this.tableData.data = data.items;
    this.tableData.listQuery.total = data.total;
    // console.log(this.tableData);
    this.loading = false;
  }

  private btnEdit(row: any) {
      console.log(row);
      initForm(
      row.id,
      row.title,
      row.front_end,
      row.node,
      row.java,
      row.database_sql,
      row.remarks
    );
      this.$refs.featuresDevSearchFeatures.add(`修改【${row.title}】`);
  }

  private btnDelete(id: string) {
    console.log(id);
    MesssageBoxQuestion("是否确定删除该事项,是否继续")
      .then(async () => {
        const { data } = await del({ id: id });

        if (data.msg === "删除成功") {
          MessageSuccess("删除成功!");
          this.getList();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  // 查询
  private search(data: object) {
    console.log(data);
    Object.assign(this.tableData.listQuery, data); // 对象合并
    this.tableData.listQuery.current = 1;
    this.getList();
  }

 private pageChange(data: any) {
    this.tableData.listQuery.current = data.current;
    this.getList();
  }

  private toVal(str: string) {
    return str || "暂无开发";
  }

  created() {
    this.getList();
  }
}
</script>

<style lang="scss"  scope>
.el-timeline-item{
  left: -30px;
  .el-card{
    position: relative;
    .btn-content{
      position: absolute;
      top: 0;
      right: 0;
      i{
        padding: 10px;
        cursor: pointer;
        font-size: $btnFontSize;
      }
      .el-icon-edit-outline:hover{
        color: #5D93E6;
      }
      .el-icon-delete:hover{
        color: #FF7A00;
      }
    }
  }

}

</style>
