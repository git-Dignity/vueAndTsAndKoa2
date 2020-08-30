<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="addRole"
      >{{ $t('table.add') }}</el-button>
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="info"
        icon="el-icon-download"
        @click="handleDownload"
      >
        {{ $t('table.export') }}
      </el-button>
    </div>

    <ElemenetTable
      v-loading="listLoading"
      :childrenTableData="childrenTableData"
      @parentPagination="parentPagination"
    >
      <template slot-scope="{row}">
        <el-button type="success" icon="el-icon-search" size="medium" @click="btnView(row)">查看</el-button>
        <el-button type="primary" size="medium" v-permission="['admin']" @click="btnEdit(row)">
          <svg-icon name="edit" />修改
        </el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="medium"
          v-permission="['admin']"
          @click="btnDelete(row.id)"
        >删除</el-button>
      </template>
    </ElemenetTable>

    <RoleDialog
      :childrenData="childrenDialogData"
      @update:parentDialogSubmit="parentDialogSubmit"
      @update:parentDialogCancel="parentDialogCancel"
    >
      <div slot="childTemplate">
        <ElemenetForm :childrenFormData="sysUserForm" @parentForm="parentForm" @UploadImgDataChild = "UploadImgDataChild">
        </ElemenetForm>
      </div>
    </RoleDialog> 
  </div>
</template>
 
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Form } from "element-ui";
import { cloneDeep } from "lodash";
import { getFormValue, validateForm } from "@/utils/tool/form";
import {
  getSysUser,
  createSysUser,       
  updateSysUser,
  delSysRole
} from "@/api/sys/sysUser";
import { ISysRoleData, IRoutesTreeData } from "@/api/sys/types/index";
import { exportJson2Excel } from "@/utils/excel";
import { formatJson } from "@/utils";
import { userTableColumns } from "@/views/sys/modules/user/tableData";
import ElemenetTable from "@/components/ElTable/index.vue";
import ElemenetForm from "@/components/ElForm/index.vue";
import { sysUserForm,initSysUserForm } from "./modules/user/userFormData";
import {
  SysRole, 
  reshapeRoutes,
  flattenRoutes,
  generateTree
} from "./modules/role/sysRole";
import { showNotify } from "@/utils/tool/notification";
import {
  MessageWarning,
  MessageSuccess,
  MesssageBoxQuestion
} from "@/utils/tool/message";
import RoleDialog from "@/components/Dialog/index.vue";     
import { EventBus } from "@/eventBus/index";
import { symbol } from "@/utils/symBol";
import { RouteConfig } from "vue-router";
import { Tree } from "element-ui";
import { asyncRoutes } from "@/router/index";



@Component({
  name: "sysUser",
  components: {
    ElemenetTable,
    ElemenetForm,
    RoleDialog
  }
})

export default class extends Vue {
  private list: ISysRoleData[] = [];
  private listLoading = true;
  private childrenTableData = {
    data: this.list,
    column: userTableColumns,
    border: true,
    tableWidth: "width: 100%",     
    defaultSort: {  },
    listQuery: {
      page: 1,
      limit: 8,
      total: 0,
      pageSize: [8, 16, 50, 100, 1000],
      importance: undefined,
      title: undefined,
      type: undefined,
      sort: "+id"
    }
  };
  private sysUserForm = sysUserForm;
  private refsForm: any = [];
  private childrenDialogData = {
    title: "添加用户",
    show: false,
    width: "40%",
    center: true,
    isCloseModal: false,
    isShowSubmit: true,
    info: []
  };
  private sysRole = new SysRole(this.childrenDialogData)

  private checkStrictly = false;
  private defaultProps = {
    children: "children",
    label: "title"
  };

  // private role: any = Object.assign({}, ISysRoleData);   //可能会遇到，ts报错才注释
  private role:any = {};
  
  private serviceRoutes: RouteConfig[] = [];
  private reshapedRoutes: RouteConfig[] = [];
  private downloadLoading = false

  created() {
    this.getList(this.childrenTableData.listQuery);
  }

  /**
   * 对话框提交的回调函数
   */
  private async parentDialogSubmit(data: any) {
    console.log(this.sysUserForm.info)
    if (!validateForm(this.refsForm).includes("false")) {
      const { ...userData } = getFormValue(this.sysUserForm.info);

      if (this.childrenDialogData.title === "添加用户") {
        console.log(userData)
        // const { data } = await createSysUser({ user: userData });
        if (data.msg === "添加成功")
          showNotify(4, "创建" + userData.username + "用户成功");
      } else if (this.childrenDialogData.title === "修改用户") {
        const { data } = await updateSysUser({ user: userData });
        if (data.msg === "更新成功")
          showNotify(4, "修改" + userData.username + "用户成功");
      }
      EventBus.$emit("isShowDialog", true);
      initSysUserForm();
      this.getList(this.childrenTableData.listQuery);
    } else {
      MessageWarning("请检查信息是否上传齐全"); 
    }
  }

  // 弹出框取消的回调
  private parentDialogCancel(data: any) {}

  private parentPagination(val: Object) {
    this.getList(val);    
  }

  private async getList(page: Object) {
    this.listLoading = true;
    const { data } = await getSysUser(page);
    console.log(data)     

    this.childrenTableData.data = data.items;
    this.childrenTableData.listQuery.total = data.total;
    this.listLoading = false;
  }

 
  private parentForm(data: any) {
    // console.log(data)
    this.refsForm.push(data);
  }

  private UploadImgDataChild(data: any){
    // console.log(data) 
  }

  private addRole() {
    this.sysRole.showDialog("添加用户", true, false);
    initSysUserForm();
    if(this.$refs.tree) (this.$refs.tree as Tree).setCheckedKeys([]);
  }

  private btnView(row: any){
    this.sysRole.showDialog("查看用户", false, true);
    initSysUserForm(
      row.id,
      row.username,
      row.phone,
      row.photo,
      row.roles
    );
  }
  
  private btnEdit(row: any) {
    this.sysRole.showDialog("修改用户", true, false);
    initSysUserForm(
      row.id,
      row.username,
      row.phone,
      row.photo,
      row.roles
    );
  }

  private btnDelete(id: string) {
    MesssageBoxQuestion("是否确定删除该用户,是否继续")
      .then(async () => {
        const { data } = await delSysRole({ id: id }); 
 
        if (data.msg === "删除成功") {
          MessageSuccess("删除成功!");
          this.getList(this.childrenTableData.listQuery);
        }
      })
      .catch(() => {});
  }


  private handleDownload() {
    this.downloadLoading = true;
    const filterVal = [];
    this.childrenTableData.data.map( (data: any) => data.routes = JSON.stringify(data.routes))
    for(let key in this.childrenTableData.data[0]){
      filterVal.push(key);
    }
    const data = formatJson(filterVal, this.childrenTableData.data)
    exportJson2Excel(this.sysRole.tHeader, data, '用户')
    this.downloadLoading = false
  }
}
</script>
