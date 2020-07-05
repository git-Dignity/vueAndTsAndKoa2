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
        <ElemenetForm :childrenFormData="sysRoleForm" @parentForm="parentForm">
          <template>
            <el-tree
              ref="tree"
              :check-strictly="checkStrictly"
              :data="routesTreeData"
              :props="defaultProps"
              show-checkbox
              node-key="path"
              class="permission-tree"
            />
          </template>
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
  getSysRole,
  createSysRole,
  updateSysRole,
  delSysRole
} from "@/api/sys/sysRole";
import { ISysRoleData, IRoutesTreeData } from "@/api/sys/types/index";
import { exportJson2Excel } from "@/utils/excel";
import { formatJson } from "@/utils";
import { roleTableColumns } from "@v/sys/modules/role/tableData";
import ElemenetTable from "components/ElTable/index.vue";
import ElemenetForm from "components/ElForm/index.vue";
import { sysRoleForm, initSysRoleForm } from "./modules/role/formData";
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
  name: "sysRole",
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
    column: roleTableColumns,
    border: true,
    tableWidth: "width: 100%",
    defaultSort: { prop: "isSys", order: "descending" },
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
  private sysRoleForm = sysRoleForm;
  private refsForm = [];
  private childrenDialogData = {
    title: "添加角色",
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

  private role = Object.assign({}, ISysRoleData);
  private serviceRoutes: RouteConfig[] = [];
  private reshapedRoutes: RouteConfig[] = [];
  private downloadLoading = false

  created() {
    this.getRoutes();
    this.getList(this.childrenTableData.listQuery);
  }

  /**
   * 对话框提交的回调函数
   */
  private async parentDialogSubmit(data: any) {
    if (!validateForm(this.refsForm).includes("false")) {
      const { ...roleData } = getFormValue(this.sysRoleForm.info);

      const checkedKeys = (this.$refs.tree as Tree).getCheckedKeys();
      roleData.routes = generateTree(
        cloneDeep(this.serviceRoutes),
        "/",
        checkedKeys
      );

      if (this.childrenDialogData.title === "添加角色") {
        const { data } = await createSysRole({ role: roleData });
        if (data.msg === "添加成功")
          showNotify(4, "创建" + roleData.name + "角色成功");
      } else if (this.childrenDialogData.title === "修改角色") {
        const { data } = await updateSysRole({ role: roleData });
        for (
          let index = 0;
          index < this.childrenTableData.data.length;
          index++
        ) {
          if (
            this.childrenTableData.data[index].roleKey === this.role.roleKey
          ) {
            this.childrenTableData.data.splice(
              index,
              1,
              Object.assign({}, this.role)
            );
            break;
          }
        }
        if (data.msg === "更新成功")
          showNotify(4, "修改" + roleData.name + "角色成功");
      }
      EventBus.$emit("isShowDialog", true);
      initSysRoleForm();
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

/**
 * 加载路由列表
 */
  private async getRoutes() {
    this.serviceRoutes = [...asyncRoutes];
    this.reshapedRoutes = reshapeRoutes([...asyncRoutes]);
  }

  private async getList(page: Object) {
    this.listLoading = true;
    const { data } = await getSysRole(page);
    this.childrenTableData.data = data.items;
    this.childrenTableData.listQuery.total = data.total;
    this.listLoading = false;
  }

  get routesTreeData() {
    return this.generateTreeData(this.reshapedRoutes);
  }

  private parentForm(data) {
    this.refsForm.push(data);
  }

  private generateTreeData(routes: RouteConfig[]) {
    const data: IRoutesTreeData[] = [];
    for (const route of routes) {
      const tmp: IRoutesTreeData = {
        children: [],
        title: "",
        path: ""
      };
      tmp.title = this.$t(`route.${route.meta.title}`).toString();
      tmp.path = route.path;
      if (route.children) {
        tmp.children = this.generateTreeData(route.children);
      }
      data.push(tmp);
    }
    return data;
  }


  private addRole() {
    this.sysRole.showDialog("添加角色", true, false);
    initSysRoleForm();
    if(this.$refs.tree) (this.$refs.tree as Tree).setCheckedKeys([]);
  }

  private btnView(row: any){
    this.sysRole.showDialog("查看角色", false, true);
    initSysRoleForm(
      row.id,
      row.name,
      row.roleKey,
      row.roleType,
      row.isSys,
      row.remarks
    );
    this.checkStrictly = true;
    this.role = cloneDeep(row);

    this.$nextTick(() => {
      const routes = flattenRoutes(reshapeRoutes(this.role.routes));
      const treeData = this.generateTreeData(routes);
      const treeDataKeys = treeData.map(t => t.path);
      (this.$refs.tree as Tree).setCheckedKeys(treeDataKeys);
      // set checked state of a node not affects its father and child nodes
      this.checkStrictly = false;
    });
  }
 
  private btnEdit(row: any) {
    this.sysRole.showDialog("修改角色", true, false);
    initSysRoleForm(
      row.id,
      row.name,
      row.roleKey,
      row.roleType,
      row.isSys,
      row.remarks
    );
    this.checkStrictly = true;
    this.role = cloneDeep(row);

    this.$nextTick(() => {
      const routes = flattenRoutes(reshapeRoutes(this.role.routes));
      const treeData = this.generateTreeData(routes);
      const treeDataKeys = treeData.map(t => t.path);
      (this.$refs.tree as Tree).setCheckedKeys(treeDataKeys);
      // set checked state of a node not affects its father and child nodes
      this.checkStrictly = false;
    });
  }

  private btnDelete(id: string) {
    MesssageBoxQuestion("是否确定删除该角色,是否继续")
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
    exportJson2Excel(this.sysRole.tHeader, data, '角色')
    this.downloadLoading = false
  }
}
</script>
