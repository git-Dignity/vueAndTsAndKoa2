<template>
  <div>
    <el-row>
      <el-row>
        <el-table
          :data="childrenTableData.data"
          :border="childrenTableData.border"
          :style="childrenTableData.tableWidth"
          :default-sort="childrenTableData.defaultSort"
        >
          <template v-for="(column, index) in childrenTableData.column">
            <el-table-column
              v-if="column.prop === 'serialNum'"
              :key="index"
              :prop="column.prop"
              :label="column.label"
              :min-width="column.width"
            >
              <template slot-scope="scope">
                {{
                  (page.current - 1) * page.size + scope.$index + 1
                }}
              </template>
            </el-table-column>
            <el-table-column
              v-else-if="column.prop === 'handSolt'"
              :key="index"
              :prop="column.prop"
              :label="column.label"
              :min-width="column.width"
            >
              <template slot-scope="{row}">
                <slot :row="row" />
              </template>
            </el-table-column>
            <el-table-column
              v-else-if="column.sortable"
              :key="index"
              :prop="column.prop"
              :label="column.label"
              :min-width="column.width"
              :sortable="true"
            >
              <template slot-scope="scope">
                <span
                  v-if="column.render"
                  v-html="column.render(scope.row, column)"
                />
                <span v-else>{{ scope.row[column.prop] }}</span>
              </template>
            </el-table-column>
            <el-table-column
              v-else-if="column.isPhoto"
              :key="index"
              :min-width="column.width"
              :prop="column.prop"
              :label="column.label"
            >
              <template slot-scope="{row}">
                <el-avatar
                  shape="square"
                  :size="80"
                  fit="fill"
                  :src="row.photo"
                />
              </template>
            </el-table-column>
            <el-table-column
              v-else-if="column.isDate"
              :key="index"
              :min-width="column.width"
              :prop="column.prop"
              :label="column.label"
            >
              <template slot-scope="{row}">
                {{ dateFormat(row[column.prop]) || '--' }}
              </template>
            </el-table-column>
            <el-table-column
              v-else-if="column.isTag"
              :key="index"
              :prop="column.prop"
              :label="column.label"
              :min-width="column.width"
              :filter-method="column.filterTag"
              :filters="column.filters"
              filter-placement="bottom-end"
            >
              <template slot-scope="scope">
                <el-tag
                  :type="column.type(scope.row, column)"
                  disable-transitions
                >
                  <span
                    v-if="column.render"
                    v-html="column.render(scope.row, column)"
                  />
                  <span v-else>{{ scope.row[column.prop] || '--' }}</span>
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              v-else
              :key="index"
              :prop="column.prop"
              :label="column.label"
              :min-width="column.width"
              :sortable="column.sortable"
            >
              <template slot-scope="scope">
                <span
                  v-if="column.render"
                  v-html="column.render(scope.row, column)"
                />
                <span v-else>{{ scope.row[column.prop] || '--' }}</span>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </el-row>
      <el-row>
        <pagination
          v-show="childrenTableData.listQuery.total>0"
          :total="childrenTableData.listQuery.total"
          :page.sync="childrenTableData.listQuery.current"
          :page-sizes.sync="childrenTableData.listQuery.pageSize"
          :limit.sync="childrenTableData.listQuery.size"
          @pagination="getList"
        />
      </el-row>
    </el-row>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  InjectReactive,
  Watch,
  Vue
} from "vue-property-decorator";
import { symbol } from "@/utils/symBol";
import { EventBus } from "@/eventBus/index";
import Pagination from "@/components/Pagination/index.vue";
import { dateFormat } from "@/utils/tool/date";

@Component({
  name: "ElemenetTable",
  components: {
    Pagination
  }
})
export default class extends Vue {
  @Prop({
    type: Object,
    required: true
    // validator: t => {
    //   if (t.upload__text && t.type && t.accept) return true;
    //   console.error("请确定参数约束是否有误，可查看组件下面的说明");
    //   return false;
    // }
  })
  childrenTableData!: object;

  private page: any = {
    current: (this.childrenTableData as any).listQuery.current,
    size: (this.childrenTableData as any).listQuery.size
  }

  getList(val: Record<string, any>) {
    // console.log(val)

    this.page = val;
    this.$emit("parentPagination", val);
  }

  dateFormat(str: string) {
    return dateFormat(str);
  }

  mounted() {}
}
</script>

<style lang="scss" scoped>
</style>

<!--

问题：
关于 <el-table-column>为什么要加上v-if,v-else，直接一个:sortable="column.sortable"不就搞定了吗？
回答：如果不加上v-if，else的话，:sortable="column.sortable" 无法排序
如果内容需用 <template> 来盛放，那 el-table-column 内的 prop就起不到作用，但他会影响 sortable 排序，所以还是写上为妙

-->
