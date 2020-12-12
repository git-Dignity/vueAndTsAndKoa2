<template>
  <div class="table" v-loading="loading">
    <el-main class="contailer">
      <el-table
        :data="tableData"
        :height="500"
        empty-text="暂无数据"
        :stripe="false"
        :border="true"
        style="width: 98%"
        :span-method="spanMethod"
      >
        <el-table-column prop="category" min-width="10%" label="序号"></el-table-column>
        <el-table-column prop="stuId" :show-overflow-tooltip="true" label="行政区划名称" min-width="20%"></el-table-column>
        <el-table-column label="2020年">
          <el-table-column prop="m9" :show-overflow-tooltip="true" label="9月" min-width="10%"></el-table-column>
          <el-table-column prop="m10" :show-overflow-tooltip="true" label="10月" min-width="10%"></el-table-column>
          <el-table-column prop="m11" :show-overflow-tooltip="true" label="11月" min-width="10%"></el-table-column>
          <el-table-column prop="m12" :show-overflow-tooltip="true" label="12月" min-width="10%"></el-table-column>
        </el-table-column>

        <el-table-column label="2021年">
          <el-table-column prop="m1" :show-overflow-tooltip="true" label="1月" min-width="10%"></el-table-column>
          <el-table-column prop="m2" :show-overflow-tooltip="true" label="2月" min-width="10%"></el-table-column>
          <el-table-column prop="m3" :show-overflow-tooltip="true" label="3月" min-width="10%"></el-table-column>
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Diary",
  components: {}
})
export default class extends Vue {
  tableData = [
    {
      m9: "9月",
      m10: "10月",
      m11: "11月",
      m12: "12月",
      m1: "1月",
      m2: "2月",
      m3: "3月",
      category: "1", // 这是序号，前三个要一样
      stuId: "广州市" // 行政区划名称
    },
    {
      m9: "9月",
      m10: "10月",
      m11: "11月",
      m12: "12月",
      m1: "1月",
      m2: "2月",
      m3: "3月",
      aaa: "1",
      category: "1",
      stuId: "其中:非农"
    },
    {
      m9: "9月",
      m10: "10月",
      m11: "11月",
      m12: "12月",
      m1: "1月",
      m2: "2月",
      m3: "3月",
      aaa: "1",
      category: "1",
      stuId: "其中:水库供水"
    },
    {
      m9: "9月",
      m10: "10月",
      m11: "11月",
      m12: "12月",
      m1: "1月",
      m2: "2月",
      m3: "3月",
      aaa: "1",
      category: "2",
      stuId: "深圳市"
    },
    {
      m9: "9月",
      m10: "10月",
      m11: "11月",
      m12: "12月",
      m1: "1月",
      m2: "2月",
      m3: "3月",
      aaa: "1",
      category: "2",
      stuId: "其中:非农",
      stuName: "zhangsan002"
    },
    {
      m9: "9月",
      m10: "10月",
      m11: "11月",
      m12: "12月",
      m1: "1月",
      m2: "2月",
      m3: "3月",
      aaa: "1",
      category: "2",
      stuId: "其中:水库供水",
      stuName: "zhangsan002"
    }
  ];

  loading = false;

  get groupNum() {
    //获取列表数组
    return new Set(this.tableData.map(o => o.category));
  }

  classGroup(name: any) {
    //根据category获取数量
    return this.tableData.filter(o => o.category == name).length;
  }
  classNameLen(name: any) {
    const tmp = Array.from(this.groupNum);
    const index = tmp.indexOf(name);
    let len = 0;
    for (let i = 0; i < index; i++) {
      len += this.classGroup(tmp[i]);
    }
    return len;
  }
  spanMethod(data: any) {
    //对于表格数据进行分组合并操作，UI组件回调函数
    const { row, column, rowIndex, columnIndex } = data;
    if (columnIndex < 1) {
      // 第一项合并，其他都不合并
      //   if (columnIndex != 1) {  // 除了1，其他都合并单元格

      //合并展示区
      const len = this.classGroup(row.category);
      const lenName = this.classNameLen(row.category);
      if (rowIndex === lenName) {
        return {
          rowspan: len,
          colspan: 1
        };
      } else
        return {
          rowspan: 0,
          colspan: 0
        };
    } else {
      return {
        rowspan: 1,
        colspan: 1
      };
    }
  }
}
</script>


<style lang="scss"  scope>
.el-main {
  padding: 0;
}
</style>

