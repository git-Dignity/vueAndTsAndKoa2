<template>
  <div class="app-container">
    <Search
      ref="featuresDevSearchUsualWebsite"
      :search-form="searchForm"
      :add-form="undoneForm"
      @search="search"
      @dialogSubmit="dialogSubmit"
    />
    <div>
      <el-col
        v-for="(item, index) in tableData.data"
        :key="index"
        :span="3"
        class="mb4 mt15 mb15"
        :offset="index%5 == 0 ? 1 : 2"
      >
        <el-card class="box-card">
          <div
            slot="header"
            class="clearfix"
          >
            <span>{{ item.title }}</span>
          </div>
          <el-avatar
            shape="square"
            :size="150"
            fit="cover"
            class="image"
            :src="item.photo_url"
          />
          <div class="box-card-foot">
            <span>{{ sysDateFormat(item.upload_time) }}</span>
            <el-divider direction="vertical" />
            <div
              class="mt10 ellipsis-oneLine"
              :title="item.content"
            >
              {{ item.content || '暂无备注' }}
            </div>
          </div>
        </el-card>
      </el-col>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Search from "@c/SearchAndFeatures";
import { Form, initForm, setFormType } from "./modules/formData";
import { searchForm } from "./modules/searchFormData";
import { get, create, update, del } from "@/api/eat/index";
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
  private async dialogSubmit(title: string, paramet: any, file: any) {
    console.log(title, paramet, file);
    // paramet.type = paramet.type.join(",");
    paramet.category = this.category;

    const formData = new FormData();
    formData.append("info", JSON.stringify(paramet));
    formData.append("file", file);

    if (title === "添加") {
      const { data } = await create(formData);
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
    // setFormType(this.category);
    this.tableData.listQuery.category = this.category;
  }
}
</script>

<style lang="scss"  scope>
.box-card {
  font-weight: bold;
  .box-card-header {
    display: inline-block;
    width: 70%;
  }
  .el-avatar > img {
    width: 100%;
    object-fit: contain;
  }
  .box-card-foot {
    margin-top: 10px;
    color: #c2c5cd;
    white-space: nowrap;
    opacity: 0.8;
    font-weight: 400;
  }
}
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
      flex-wrap: wrap; // 挤不下去就换行

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
