<template>
  <div class="dashboard-editor-container">
    <github-corner class="github-corner" />

    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>

    <el-row :gutter="32">
      <el-col
        :xs="24"
        :sm="24"
        :lg="8"
      >
        <div class="chart-wrapper">
          <radar-chart />
        </div>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :lg="8"
      >
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :lg="8"
      >
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="8">
      <el-col
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 24}"
        :lg="{span: 12}"
        :xl="{span: 12}"
        style="padding-right:8px;margin-bottom:30px;"
      >
        <transaction-table />
      </el-col>
      <el-col
        :xs="{span: 24}"
        :sm="{span: 12}"
        :md="{span: 12}"
        :lg="{span: 6}"
        :xl="{span: 6}"
        style="margin-bottom:30px;"
      >
        <todo-list />
      </el-col>
      <el-col
        :xs="{span: 24}"
        :sm="{span: 12}"
        :md="{span: 12}"
        :lg="{span: 6}"
        :xl="{span: 6}"
        style="margin-bottom:30px;"
      >
        <box-card />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import "echarts/theme/macarons.js"; // Theme used in BarChart, LineChart, PieChart and RadarChart
import { Component, Vue } from "vue-property-decorator";
import GithubCorner from "@/components/GithubCorner/index.vue";
import BarChart from "./components/BarChart.vue";
import BoxCard from "./components/BoxCard.vue";
import LineChart, { ILineChartData } from "./components/LineChart.vue";
import PanelGroup from "./components/PanelGroup.vue";
import PieChart from "./components/PieChart.vue";
import RadarChart from "./components/RadarChart.vue";
import TodoList from "./components/TodoList/index.vue";
import TransactionTable from "./components/TransactionTable.vue";
import { getAll } from "@/api/itKnowledge/frontEnd";
// import { arrCalculateStr } from "@/utils/tool/arr";

const lineChartData: { [type: string]: ILineChartData } = {
  user: {
    xAxis: [],
    efficient: [], // 有效
    fail: [] // 失效
  },
   agentEvent: {
    xAxis: [],
    efficient: [], // 有效
    fail: [] // 失效
  },
  itKnowledge: {
    xAxis: [],
    efficient: [], // 有效
    fail: [] // 失效
  },
  music: {
    xAxis: [],
    efficient: [], // 有效
    fail: [] // 失效
  }
};

@Component({
  name: "DashboardAdmin",
  components: {
    GithubCorner,
    BarChart,
    BoxCard,
    LineChart,
    PanelGroup,
    PieChart,
    RadarChart,
    TodoList,
    TransactionTable
  }
})
export default class extends Vue {
  private lineChartData: ILineChartData = {
    xAxis: [],
    efficient: [],
    fail: []
  }

  /**
   * @description: 设置图数据
   * @param {*} data
   * @return {*}
   */
  private handleSetLineChartData(data: ILineChartData) {
    this.lineChartData = data;
  }

  /**
   * @description: 设置自定义数据格式
   * @param {Array} data
   * @return {Array}
   */
  private setFormatData(data: Array<any>) {
    const efficient: any = []; // 有效
    const fail: any = []; // 失效
    data.forEach((d: Record<string, any>) => {
      if (d.flag === 1) {
        efficient["category" + d.category]
          ? efficient["category" + d.category]++
          : (efficient["category" + d.category] = 1);

        // 初始化失效数组
        if (!fail["category" + d.category]) {
          fail["category" + d.category] = 0;
        }
      } else {
        fail["category" + d.category]
          ? fail["category" + d.category]++
          : (fail["category" + d.category] = 1);
      }
    });

    this.categoryChinese(Object.keys(fail));

    return [Object.values(efficient), Object.values(fail)];
  }

  /**
   * @description: category字段转中文
   * @param {*} data
   * @return {Array}
   */
  private async categoryChinese(data: Array<any>) {
    const res: string[] = [];

    data.forEach((d: string) => {
      d = d.replace("category", "");
      switch (d) {
        case "1":
          res.push("前端");
          break;
        case "2":
          res.push("后端");
          break;
        case "3":
          res.push("算法");
          break;
        case "4":
          res.push("前后端");
          break;
        case "5":
          res.push("工具");
          break;
          default:
            break;
      }
    });
    this.lineChartData.xAxis = res;
  }

  /**
   * @description: 获取IT知识数据
   * @param {*}
   * @return {*}
   */
  private async getItKnowledgeData() {
    const { data } = await getAll();
    const formatData: Array<any> = this.setFormatData(data.items);

    this.lineChartData.efficient = formatData[0];
    this.lineChartData.fail = formatData[1];

    // console.log(arrCalculateStr(data.items, "category"));
  }

  created() {
    // this.getItKnowledgeData();
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
