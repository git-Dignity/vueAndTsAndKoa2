<template>
  <div class="app-container">
    <Search
      :category="category"
      @add="add"
      @handleDownload="handleDownload"
      @search="search"
    />
    <div class="container-content mt16">
      <el-row>
        <el-col
          v-for="(data, index) in tableData.data"
          :key="index"
          :span="5"
          class="mb4 mt15 mb15"
          :offset="index%3 === 0 ? 1 : 2"
        >
          <div>
            <el-card
              class="box-card"
              shadow="hover"
            >
              <div
                slot="header"
                class="clearfix"
              >
                <span
                  class="box-card-header ellipsis-oneLine"
                  :title="data.title"
                >{{ data.title }}</span>

                <el-button-group class="fr">
                  <!-- <el-button
                    type="primary"
                    icon="el-icon-thumb"
                    size="mini"
                    @click="photoEnter(data.title)"
                  /> -->
                  <el-button
                    v-permission="['admin']"
                    type
                    icon="el-icon-edit"
                    size="mini"
                    @click="btnEdit(data)"
                  />
                  <el-button
                    v-permission="['admin']"
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    @click="btnDelete(data.id)"
                  />
                </el-button-group>
              </div>
              <a
                :href="data.content"
                target="_blank"
              >
                <el-avatar
                  :key="data.photo"
                  shape="square"
                  :size="150"
                  fit="fill"
                  class="image"
                  :src="data.photo"
                >
                  <img src="@/assets/404-images/404.png">
                </el-avatar>
              </a>

              <div class="box-card-foot">
                <span>{{ data.type | toVal }}</span>
                <el-divider direction="vertical" />
                <span>{{ sysDateFormat(data.upload_time) }}</span>
                <el-divider direction="vertical" />
                <span>{{ data.auth | toVal }}</span>
                <div
                  class="mt10 ellipsis-oneLine"
                  :title="data.remarks"
                >
                  {{ data.remarks || '暂无备注' }}
                </div>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
      <pagination
        v-show="tableData.listQuery.total>0"
        :total="tableData.listQuery.total"
        :page.sync="tableData.listQuery.current"
        :page-sizes.sync="tableData.listQuery.pageSize"
        :limit.sync="tableData.listQuery.size"
        @pagination="parentPagination"
      />
    </div>
    <RoleDialog
      :children-data="dialogData"
      @update:parentDialogSubmit="parentDialogSubmit"
      @update:parentDialogCancel="parentDialogCancel"
    >
      <div slot="childTemplate">
        <ElemenetForm
          :children-form-data="undoneForm"
          @parentForm="parentForm"
          @UploadImgDataChild="UploadImgDataChild"
        />
      </div>
    </RoleDialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import ElemenetTable from "@/components/ElTable/index.vue";
import Pagination from "@/components/Pagination/index.vue";
import { IItKnowledge } from "@/api/itKnowledge/types";
import { columns, formatterType } from "@/views/itKnowledge/modules/tableData";
import ElemenetForm from "@/components/ElForm/index.vue";
import RoleDialog from "@c/Dialog/index.vue";
import { Form, initForm, setFormType } from "./modules/formData";
import { showNotify } from "@/utils/tool/notification";
import { exportJson2Excel } from "@/utils/excel";
import { formatJson } from "@/utils";
import {
  MessageWarning,
  MessageSuccess,
  MesssageBoxQuestion
} from "@/utils/tool/message";
import {
  AgentEvent
} from "./modules/index";
import {
  get,
  create,
  update,
  del
} from "@/api/itKnowledge/frontEnd";
import { getFormValue, validateForm } from "@/utils/tool/form";
import { EventBus } from "@/eventBus/index";
import { UserModule } from "@/store/modules/user";
import Search from "./components/Search.vue";

@Component({
  name: "ItKnowledge",
  components: {
    ElemenetTable,
    RoleDialog,
    ElemenetForm,
    Pagination,
    Search
  }
})
export default class extends Vue {
  private list: IItKnowledge[] = [];
  private loading = false;
  private refsForm: any = [];
  private tableData = {
    data: this.list,
    column: columns,
    border: true,
    tableWidth: "width: 100%",
    defaultSort: { prop: "isSys", order: "descending" },
    listQuery: {
      current: 1,
      size: 6,
      total: 0,
      pageSize: [6, 12, 18, 24, 1000],
      title: "",
      type: "",
      auth: "",
      remarks: "",

      uploadTime: "",
      category: 1, // 类别：前端
      sort: "+id"
    }
  };

  private dialogData = {
    title: "添加",
    show: false,
    width: "40%",
    center: true,
    isCloseModal: false,
    isShowSubmit: true,
    info: []
  };

  private undoneForm = Form;
  private agentEvent = new AgentEvent(this.dialogData);

  @Prop({ default: 1 }) private category!: number;

  get name() {
    return UserModule.name;
  }

  // 查询
  private search(data: object) {
    console.log(data);
    Object.assign(this.tableData.listQuery, data); // 对象合并
    this.tableData.listQuery.current = 1;
    this.getList();
  }

  private parentPagination(val: number) {
    console.log(val);
    // this.tableData.listQuery.current = val;
    Object.assign(this.tableData.listQuery, val);

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

  /**
   * 对话框提交的回调函数
   */
  private async parentDialogSubmit(data: any) {
    if (!validateForm(this.refsForm).includes("false")) {
      const paramet = getFormValue(this.undoneForm.info);
      paramet.auth = this.name;
      paramet.category = this.category;
      paramet.type = paramet.type.join(",");
      console.log(paramet, this.undoneForm.file);

      const formData = new FormData();
      formData.append("info", JSON.stringify(paramet));
      formData.append("file", this.undoneForm.file);

      // save data
      if (this.dialogData.title === "添加") {
        const { data } = await create(formData);
        console.log(data);

        if (data.msg === "添加成功") { showNotify(4, "创建" + paramet.title + "成功"); }
      } else if (this.dialogData.title.indexOf("修改") !== -1) {
        const { data } = await update(formData);
        console.log(data);
        if (data.msg === "修改成功") {
          showNotify(4, "修改" + paramet.title + "成功");
        }
      }

      EventBus.$emit("isShowDialog", true);
      initForm();
      this.getList();
    } else {
      MessageWarning("请检查信息是否上传齐全");
    }
  }

  private parentDialogCancel(data: any) {
    console.log(data);
    this.undoneForm.file = "";
  }

  private UploadImgDataChild(data: any) {
    console.log(data);
    this.undoneForm.file = data.file;
  }

  private parentForm(data: any) {
    // console.log(data);
    this.refsForm.push(data);
  }

  private handleDownload() {
    this.loading = true;
    const filterVal = [];
    this.tableData.data.forEach((t: any) => {
      t.noticeWay = formatterNoticeWay(t);
      t.type = formatterType(t);
    });
    for (const key in this.tableData.data[0]) {
      if (key !== "rowId") {
        filterVal.push(key);
      }
    }
    const data = formatJson(filterVal, this.tableData.data);
    exportJson2Excel(this.agentEvent.tHeader, data, "代办事项");
    this.loading = false;
  }

  private add() {
    initForm();
    this.undoneForm.file = "";
    this.agentEvent.showDialog("添加", true, false);
  }

  private btnView(row: any) {
    this.agentEvent.showDialog(`查看【${row.title}】IT知识`, false, true);

    initForm(
      row.id,
      row.title,
      row.content,
      row.type,
      row.agent,
      row.remarks
    );
  }

  private btnEdit(row: any) {
      console.log(row);
    this.agentEvent.showDialog(`修改【${row.title}】IT知识`, true, false);
    initForm(
      row.id,
      row.title,
      row.content,
      row.type,
      row.photo,
      row.remarks
    );
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

  created() {
    this.getList();
  }

  mounted() {
    console.log(this.category);
    setFormType(this.category);
    this.tableData.listQuery.category = this.category;
  }
}
</script>

<style lang="scss"  scope>
.box-card{
    font-weight: bold;
    .box-card-header{
      display: inline-block;
      width: 70%;
    }
    .el-avatar > img{
      width: 100%;
      object-fit: contain;
    }
    .box-card-foot{
        margin-top: 10px;
        color: #c2c5cd;
        white-space: nowrap;
        opacity: .8;
        font-weight:400;
    }

}
</style>
