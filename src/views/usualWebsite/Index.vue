<template>
  <div class="app-container">
    <Search
      ref="featuresDevSearchUsualWebsite"
      :search-form="searchForm"
      :add-form="undoneForm"
      @search="search"
      @dialogSubmit="dialogSubmit"
    />
    <div class="usualWebsite-body mt12">
      <div
        v-for="(tableData, tableDataIndex) in tableData.data"
        :key="tableDataIndex"
        class="usualWebsite-main"
      >
        <div class="left">
          {{ tableData[0].type }}
        </div>
        <div class="right">
          <div
            v-for="itemData in tableData"
            :key="itemData.id"
            :title="itemData.title"
            class="item"
          >
            <a
              :href="itemData.website_url"
              target="_blank"
            >
              <el-avatar
                key="itemData.photo_url"
                shape="square"
                :size="50"
                fit="fill"
                class="image"
                :src="itemData.photo_url"
              >
                <img src="@/assets/404-images/404.png">
              </el-avatar>
              <div class="item-right">
                <div class="title mb4 ellipsis-oneLine">
                  {{ itemData.title }}
                </div>
                <span class="illustrate ellipsis-twoLine">{{ itemData.content }}</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- <pagination
      v-show="tableData.listQuery.total>0"
      :total="tableData.listQuery.total"
      :page.sync="tableData.listQuery.current"
      :page-sizes.sync="tableData.listQuery.pageSize"
      :limit.sync="tableData.listQuery.size"
      @pagination="pageChange"
    /> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Search from "@c/SearchAndFeatures";
import { Form, initForm, setFormType } from "./modules/formData";
import { searchForm } from "./modules/searchFormData";
import { get, create, update, del } from "@/api/usualWebsite/index";
import { showNotify } from "@/utils/tool/notification";
import { EventBus } from "@/eventBus/index";
import { IFeaturesDevType } from "@/api/me/featuresDevType";
import { columns } from "@/views/usualWebsite/modules/tableData";
import Pagination from "@/components/Pagination/index.vue";
import { MessageSuccess, MesssageBoxQuestion } from "@/utils/tool/message";
import { log } from "util";

@Component({
  name: "UsualWebsite",
  components: {
    Search,
    Pagination
  }
})
export default class extends Vue {
  private undoneForm = Form;
  private searchForm = searchForm;
  private loading = false;
  private list: any = [];
  private tableData = {
    data: this.list,
    column: columns,
    border: true,
    tableWidth: "width: 100%",
    defaultSort: { prop: "isSys", order: "descending" },
    listQuery: {
      current: 1,
      size: 999,
      total: 0,
      pageSize: [3, 6, 9, 12, 1000],
      title: "",
      category: 1, // 类别：编程、设计
      node: "",
      remarks: "",
      uploadTime: "",
      sort: "+id"
    }
  };

  @Prop({ default: 1 }) private category!: number;

  /**
   * 弹框回调
   */
  private async dialogSubmit(title: string, paramet: any) {
    console.log(title, paramet);
    paramet.type = paramet.type.join(",");
    paramet.category = this.category;

    if (title === "添加") {
      const { data } = await create(paramet);
      console.log(data);

      if (data.msg === "添加成功") {
        showNotify(4, "创建" + paramet.title + "成功");
      }
    } else if (title.indexOf("修改") !== -1) {
      // const { data } = await update(paramet);
      // console.log(data);
      // if (data.msg === "修改成功") {
      //   showNotify(4, "修改" + paramet.title + "成功");
      // }
    }

    EventBus.$emit("isShowDialog", true);
    initForm();
    this.getList();
  }

  private async getList() {
    this.loading = true;
    const { data } = await get(this.tableData.listQuery);

    this.tableData.data = this.setData(data.items);
    this.tableData.listQuery.total = data.total;
    // console.log(this.tableData);
    this.loading = false;
  }

  /**
   * @description: 设置数据（按type分类）
   * @param {Array} data
   * @return {Array}
   */
  setData(data: Array<any>) {
    const tmp: Record<string, any> = {};
    data.forEach(d => {
      if (tmp[d.type]) {
        tmp[d.type].push(d);
      } else {
        tmp[d.type] = [];
        tmp[d.type].push(d);
      }
    });
console.log(tmp);

    return tmp;
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
    this.$refs.featuresDevSearchUsualWebsite.add(`修改【${row.title}】`);
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
      .catch(e => {
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

  created() {
    this.getList();
  }

  mounted() {
    setFormType(this.category);
    this.tableData.listQuery.category = this.category;
  }
}
</script>

<style lang="scss"  scope>
.usualWebsite-body {
  .usualWebsite-main {
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #f3f3f3;
    .left {
      width: 200px;
    }
    .right {
      flex: 1;
      display: flex;
      flex-wrap:wrap; // 挤不下去就换行

      .item {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        width: 260px;
        padding: 10px;
        .item-right {
          width: 170px;

          .title {
            font-size: 20px;
            color: $textTitle;
          }
          .illustrate {
            color: $textIllustrate;
          }
        }

        &:hover {
          background: #edf5fa;
          border-radius: 10px;
        }
      }
    }
  }
}
</style>
