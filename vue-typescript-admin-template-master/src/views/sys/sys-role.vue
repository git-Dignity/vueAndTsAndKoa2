<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        {{ $t('table.add') }}
      </el-button>
    </div>

   <el-table
    :data="list"
    border
    style="width: 100%"
    :default-sort = "{prop: 'isSys', order: 'descending'}"
    >
    <el-table-column
      prop="name"
      label="角色名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="enName"
      label="英文名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="roleType"
      label="角色类型"
      :formatter="formatterType"
      >
    </el-table-column>
    <el-table-column
      prop="isSys"
      sortable
      label="是否系统数据"
      :formatter="formatterIsSys"
     >
    </el-table-column>
    <el-table-column
      prop="remarks"
      label="备注">
    </el-table-column>
  </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="tempSysRoleData"
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item
          :label="$t('sys.roleName')"
          prop="roleName"
        >
          <el-input v-model="tempSysRoleData.roleName" />
        </el-form-item>
         <el-form-item
          :label="$t('sys.enName')"
          prop="enName"
        >
          <el-input v-model="tempSysRoleData.enName" />
        </el-form-item>
        <el-form-item
          :label="$t('sys.roleType')"
          prop="roleType"
        >
          <el-select
            v-model="tempSysRoleData.roleType"
            class="filter-item"
            placeholder="Please select"
          >
            <el-option
              v-for="item in calendarTypeOptions"
              :key="item.key"
              :label="item.displayName"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('sys.isSys')">
          <el-select
            v-model="tempSysRoleData.isSys"
            class="filter-item"
            placeholder="Please select"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item.key"
              :label="item.displayName"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('sys.remarks')">
          <el-input
            v-model="tempSysRoleData.remarks"
            :autosize="{minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='create'?createData():updateData()"
        >
          {{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Form } from 'element-ui'
import { cloneDeep } from 'lodash'
import { getSysRole, getPageviews, createSysRole, defaultSysRoleData } from '@/api/sys/sysRole'
import { ISysRoleData } from '@/api/types'
import { exportJson2Excel } from '@/utils/excel'
import { formatJson } from '@/utils'
import Pagination from '@/components/Pagination/index.vue'

const calendarTypeOptions = [
  { key: 'assignment', displayName: '任务分配' },
  { key: 'security-role', displayName: '管理角色' },
  { key: 'user', displayName: '普通角色' }
]


@Component({
  name: 'sysRole',
  components: {
    Pagination
  }
})
export default class extends Vue {
  private tableKey = 0
  private list: ISysRoleData[] = []
  private total = 0
  private listLoading = true
  private listQuery = {
    page: 1,
    limit: 10,
    importance: undefined,
    title: undefined,
    type: undefined,
    sort: '+id'
  }

  private importanceOptions = [1, 2, 3]
  private calendarTypeOptions = calendarTypeOptions
  private sortOptions = [
    { label: 'ID Ascending', key: '+id' },
    { label: 'ID Descending', key: '-id' }
  ]

  private statusOptions = [
    { key: 0, displayName: '否' },
    { key: 1, displayName: '是' }
  ]
  private showReviewer = false
  private dialogFormVisible = false
  private dialogStatus = ''
  private textMap = {
    update: 'Edit',
    create: 'Create'
  }

  private dialogPageviewsVisible = false
  private pageviewsData = []
  private rules = {
    type: [{ required: true, message: 'type is required', trigger: 'change' }],
    timestamp: [{ required: true, message: 'timestamp is required', trigger: 'change' }],
    title: [{ required: true, message: 'title is required', trigger: 'blur' }]
  }

  private downloadLoading = false
  private tempSysRoleData = defaultSysRoleData

  created() {
    this.getList()
    console.log(this.list);
  }

  private async getList() {
    this.listLoading = true
    const { data } = await getSysRole(this.listQuery)
    this.list = data.items
    this.total = data.total
    // Just to simulate the time of the request
    setTimeout(() => {
      this.listLoading = false
    }, 0.5 * 1000)
  }

  private handleFilter() {
    this.listQuery.page = 1
    this.getList()
  }

  private formatterIsSys(row: any){
    let isSys = ""
    switch (row.isSys){
      case this.statusOptions[0].key :
        isSys = this.statusOptions[0].displayName
        break;
      case this.statusOptions[1].key :
        isSys = this.statusOptions[1].displayName
        break;
    }

    return isSys;
  }

  private formatterType(row: any) {  // row, column
    let roleType = ""
    switch (row.roleType){
      case `${this.calendarTypeOptions[0].key}` :
        roleType = this.calendarTypeOptions[0].displayName
        break;
      case `${this.calendarTypeOptions[1].key}` :
        roleType = this.calendarTypeOptions[1].displayName
        break;
      case `${this.calendarTypeOptions[2].key}` :
        roleType = this.calendarTypeOptions[2].displayName
        break;
    }
    // console.log(column)

    return roleType;
  }

  // private handleModifyStatus(row: any, status: string) {
  //   this.$message({
  //     message: '操作成功',
  //     type: 'success'
  //   })
  //   row.status = status
  // }

  private sortChange(data: any) {
    const { prop, order } = data
    if (prop === 'id') {
      this.sortByID(order)
    }
  }

  private sortByID(order: string) {
    if (order === 'ascending') {
      this.listQuery.sort = '+id'
    } else {
      this.listQuery.sort = '-id'
    }
    this.handleFilter()
  }

  private getSortClass(key: string) {
    const sort = this.listQuery.sort
    return sort === `+${key}` ? 'ascending' : sort === `-${key}` ? 'descending' : ''
  }

  private resettempSysRoleData() {
    this.tempSysRoleData = cloneDeep(defaultSysRoleData)
  }

  private handleCreate() {
    this.resettempSysRoleData()
  
    this.dialogStatus = 'create'
    this.dialogFormVisible = true
    this.$nextTick(() => {
      (this.$refs.dataForm as Form).clearValidate()
    })
  }

  private createData() {
    (this.$refs.dataForm as Form).validate(async(valid) => {
      if (valid) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...articleData } = this.tempSysRoleData
        const data = await createSysRole({ article: articleData })
        // this.list.unshift(data.article)
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        })
      }
    })
  }

  // private handleUpdate(row: any) {
  //   this.tempSysRoleData = Object.assign({}, row)
  //   this.dialogStatus = 'update'
  //   this.dialogFormVisible = true
  //   this.$nextTick(() => {
  //     (this.$refs.dataForm as Form).clearValidate()
  //   })
  // }


  // private async handleGetPageviews(pageviews: string) {
  //   const { data } = await getPageviews({ pageviews })
  //   this.pageviewsData = data.pageviews
  //   this.dialogPageviewsVisible = true
  // }

  // private handleDownload() {
  //   this.downloadLoading = true
  //   const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
  //   const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
  //   const data = formatJson(filterVal, this.list)
  //   exportJson2Excel(tHeader, data, 'table-list')
  //   this.downloadLoading = false
  // }
}
</script>
