<template>
  <div class="app-container">
    <div class="container-title">
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
    </div>
    <div class="container-content mt16">
      <ElemenetTable
        v-loading="loading"
        :children-table-data="tableData"
        @parentPagination="parentPagination"
      >
        <template slot-scope="{row}">
          <el-button
            type="success"
            icon="el-icon-search"
            size="medium"
            @click="btnView(row)"
          >
            查看
          </el-button>
          <el-button
            v-permission="['admin']"
            type="primary"
            size="medium"
            @click="btnEdit(row)"
          >
            <svg-icon name="edit" />修改
          </el-button>
          <el-button
            v-permission="['admin']"
            type="danger"
            icon="el-icon-delete"
            size="medium"
            @click="btnDelete(row.id)"
          >
            删除
          </el-button>
        </template>
      </ElemenetTable>
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
        />
      </div>
    </RoleDialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import ElemenetTable from "@/components/ElTable/index.vue";
import { IAgentEvent } from "@/api/me/types";
import { columns, formatterType, formatterNoticeWay } from "@/views/me/agent-event/modules/tableData";
import ElemenetForm from "@/components/ElForm/index.vue";
import RoleDialog from "@c/Dialog/index.vue";
import { Form, initForm } from "../modules/formData";
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
} from "../modules/index";
import {
  get,
  create,
  update,
  del
} from "@/api/me/agentEvent";
import { getSysUser } from "@/api/sys/sysUser";
import { sendServerJiangMsg, sendBarkMsg, senQQMailMsg } from "@/api/common/sendMsg";
import { getFormValue, validateForm } from "@/utils/tool/form";
import { EventBus } from "@/eventBus/index";
import moment from "moment";

@Component({
  name: "AgentEventTable",
  components: {
    ElemenetTable,
    RoleDialog,
    ElemenetForm
  }
})
export default class extends Vue {
  /**
   * schedule="'0' 未完成
   * schedule="'2' 进行中
   * schedule="'1' 已完成
   */
  @Prop({
    type: String,
    required: true
  })
  schedule!: string;

  private list: IAgentEvent[] = [];
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
      size: 10,
      total: 0,
      pageSize: [10, 20, 50, 100, 1000],
      importance: undefined,
      title: undefined,
      type: undefined,
      sort: "+id"
    }
  };

  private dialogData = {
    title: "添加代办事项",
    show: false,
    width: "40%",
    center: true,
    isCloseModal: false,
    isShowSubmit: true,
    info: []
  };

  private undoneForm = Form;
  private agentEvent = new AgentEvent(this.dialogData);

  @Watch("schedule")
  private getSchedule(data: any) {
    this.getList(this.tableData.listQuery, data);
  }

  /**
   * 通知方式改变，联系方式联动
   */
  @Watch("undoneForm.info.noticeWay.value")
  private getUndoneForm(data: any) {
    this.undoneForm.info.contact.label = data === 3 ? "registe.postbox" : "registe.phone";
  }

  private parentPagination(val: Record<string, any>) {
    // console.log(val);
    this.getList(val, this.schedule);
  }

  private async getList({ current, size }: Record<string, any>, schedule: string) {
    // console.log(schedule);
    this.loading = true;
    const { data } = await get({ current, size, schedule });
    // console.log(data)
    data.records.forEach((r: IAgentEvent) => {
      r.startTime = moment(r.startTime).format("YYYYMMDDHHmmss");
      r.endTime = moment(r.endTime).format("YYYYMMDDHHmmss");
    });
    this.tableData.data = data.records;
    this.tableData.listQuery.total = data.total;
    this.loading = false;
  }

  /**
   * 对话框提交的回调函数
   */
  private async parentDialogSubmit(data: any) {
    if (!validateForm(this.refsForm).includes("false")) {
      const paramet = getFormValue(this.undoneForm.info);
      console.log(paramet);

      // save data
      if (this.dialogData.title === "添加代办事项") {
        const { data } = await create(paramet);
        if (data.msg === "添加成功") { showNotify(4, "创建" + paramet.title + "事项成功"); }
      } else if (this.dialogData.title.indexOf("修改") !== -1) {
        const { data } = await update(paramet);
        if (data.msg === "修改成功") {
          showNotify(4, "修改" + paramet.title + "事项成功");
        }
      }

      // send msg
      if (paramet.noticeWay === 1 && paramet.schedule !== 100) {
        // Bark
        await sendBarkMsg(paramet);
      } else if (paramet.noticeWay === 2 && paramet.schedule !== 100) {
        // 微信方糖
        await sendServerJiangMsg(paramet);
      } else if (paramet.noticeWay === 3 && paramet.schedule !== 100) {
        // qq邮箱
        await senQQMailMsg(paramet);
      }

      EventBus.$emit("isShowDialog", true);
      initForm();
      this.getList(this.tableData.listQuery, this.schedule);
    } else {
      MessageWarning("请检查信息是否上传齐全");
    }
  }

  private parentDialogCancel(data: any) {
    console.log(data);
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
    this.agentEvent.showDialog("添加代办事项", true, false);
  }

  private btnView(row: any) {
    this.agentEvent.showDialog(`查看【${row.title}】代办事项`, false, true);
    console.log(row.schedule);
    initForm(
      row.id,
      row.title,
      row.content,
      row.type,
      row.agent,
      row.schedule,
      row.noticeWay,
      row.contact,
      row.startTime,
      row.endTime,
      row.remarks
    );
  }

  private btnEdit(row: any) {
    this.agentEvent.showDialog(`修改【${row.title}】代办事项`, true, false);
    initForm(
      row.id,
      row.title,
      row.content,
      row.type,
      row.agent,
      row.schedule,
      row.noticeWay,
      row.contact,
      row.startTime,
      row.endTime,
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
          this.getList(this.tableData.listQuery, this.schedule);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  /**
   * 设置agent代办者的数据
  */
  private async setAgent() {
    const result = await getSysUser({
      page: 1,
      limit: 1000
    });

    const tmp: Array<Record<string, any>> = [];
    result.data.items.forEach((d: any) => {
      tmp.push({
        value: d.username,
        label: d.username
      });
    });

    (this.undoneForm as any).info.agent.options = tmp;
  }

  created() {
    this.getList(this.tableData.listQuery, this.schedule);
  }

  mounted() {
    this.setAgent();
  }
}
</script>

<style lang="scss"  scope>

</style>
