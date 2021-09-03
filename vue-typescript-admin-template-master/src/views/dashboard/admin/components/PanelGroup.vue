<template>
  <el-row
    :gutter="40"
    class="panel-group"
  >
    <el-col
      :xs="12"
      :sm="12"
      :lg="6"
      class="card-panel-col"
    >
      <div
        class="card-panel"
        @click="handleSetLineChartData('user')"
      >
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon
            name="peoples"
            class="card-panel-icon"
          />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            User Number
          </div>
          <count-to
            :start-val="0"
            :end-val="user.num"
            :duration="2600"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col
      :xs="12"
      :sm="12"
      :lg="6"
      class="card-panel-col"
    >
      <div
        class="card-panel"
        @click="handleSetLineChartData('agentEvent')"
      >
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon
            name="message"
            class="card-panel-icon"
          />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Agent Event Undone
          </div>
          <count-to
            :start-val="0"
            :end-val="agentEvent.num"
            :duration="3000"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col
      :xs="12"
      :sm="12"
      :lg="6"
      class="card-panel-col"
    >
      <div
        class="card-panel"
        @click="handleSetLineChartData('itKnowledge')"
      >
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon
            name="money"
            class="card-panel-icon"
          />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            IT Knowledge
          </div>
          <count-to
            :start-val="0"
            :end-val="itKnowledge.num"
            :duration="3200"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col
      :xs="12"
      :sm="12"
      :lg="6"
      class="card-panel-col"
    >
      <div
        class="card-panel"
        @click="handleSetLineChartData('music')"
      >
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon
            name="shopping"
            class="card-panel-icon"
          />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Music Number
          </div>
          <count-to
            :start-val="0"
            :end-val="musics.num"
            :duration="3600"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CountTo from "vue-count-to";
import QS from "qs";
import { getSysUser } from "@/api/sys/sysUser";
import { getAll as getAgentAll } from "@/api/me/agentEvent";
import { getAll } from "@/api/itKnowledge/frontEnd";
import { getMusic } from "@/api/music/index";
import { getEfficientAndFail } from "./tool";

// types
import { IPObject } from "@/api/pTypes";

@Component({
  name: "PanelGroup",
  components: {
    CountTo
  }
})
export default class extends Vue {
  private handleSetLineChartData(type: string) {
    console.log(type, this.musics.data);
    let res = {};
    switch (type) {
      case "user":
        res = this.user.data;
        break;
      case "agentEvent":
        res = this.agentEvent.data;
        break;
      case "itKnowledge":
        res = this.itKnowledge.data;
        break;
      case "music":
        res = this.musics.data;
        break;
      default:
        break;
    }

    this.$emit("handleSetLineChartData", res);
  }

  // 总用户人数
  private user: IPObject = {
    num: 0,
    data: []
  };

  // 代办事项（未完成）
  private agentEvent: IPObject = {
    num: 0,
    data: []
  };

  // IT知识
  private itKnowledge: IPObject = {
    num: 0,
    data: []
  };

  // 总音乐数
  private musics: IPObject = {
    num: 0,
    data: []
  };

  /**
   * @description: @description 获取用户信息
   * @param {*}
   * @return {*}
   */
  private async getUser() {
    const { data } = await getSysUser({
      page: 1,
      limit: 1000
    });

    this.user.num = this.getVal(data, "total");
    const formatData: Array<any> = getEfficientAndFail(data.items, "roles", function(d: any) {
      return d.flag === 1;
    });

    this.user.data.efficient = formatData[0];
    this.user.data.fail = formatData[1];
    this.rolesChinese(formatData[3]);
  }

  /**
   * @description: 获取代办事项（未完成）数据
   * @param {*}
   * @return {*}
   */
  private async getAgentEvent(schedule: number) {
    const { data } = await getAgentAll({ current: 1, size: 9999, schedule });
    this.agentEvent.num = Number(this.getVal(data, "total"));

    const formatData: Array<any> = this.getAgentEventEfficientAndFail(
      JSON.parse(data.items),
      "schedule"
    );
    // console.log(formatData);
    this.agentEvent.data.efficient = formatData[0];
    this.agentEvent.data.fail = formatData[1];
    this.scheduleChinese(formatData[3]);
  }

  /**
   * @description 待办事项，因为格式不一致调用java
   * @description 他不是根据某个字段来判断类型，以一个区间判断代办事项（未开始、进行中、已完成）
   * @description: 给我一个数组data，根据特定字段field，返回flag有效的数组、失效的数组
   * @param {Array} data
   * @return {Array}
   */
  private getAgentEventEfficientAndFail(data: Array<any>, field: string) {
    const efficient: any = []; // 有效
    const fail: any = []; // 失效

    // 初始化
    fail[field + "0"] = 0;
    fail[field + "1"] = 0;
    fail[field + "2"] = 0;

    data.forEach((d: Record<string, any>) => {
      const type = d.delFlag === "0" ? efficient : fail;

      if (d[field] === 0) {
        type[field + "0"] ? type[field + "0"]++ : (type[field + "0"] = 1);
      } else if (d[field] === 100) {
        type[field + "2"] ? type[field + "2"]++ : (type[field + "2"] = 1);
      } else {
        type[field + "1"] ? type[field + "1"]++ : (type[field + "1"] = 1);
      }
    });

    return [
      Object.values(efficient),
      Object.values(fail),
      Object.keys(efficient),
      Object.keys(fail)
    ];
  }

  /**
   * @description: 获取IT知识数据
   * @param {*}
   * @return {*}
   */
  private async getItKnowledgeData() {
    const { data } = await getAll();
    this.itKnowledge.num = (this as any).getVal(data, "total");
    const formatData: Array<any> = getEfficientAndFail(data.items, "category", function(d: any) {
      return d.flag === 1;
    });

    this.itKnowledge.data.efficient = formatData[0];
    this.itKnowledge.data.fail = formatData[1];
    this.categoryChinese(formatData[3]);
    this.$emit("handleSetLineChartData", this.itKnowledge.data);
  }

  /**
   * @description: category字段转中文
   * @param {*} data
   * @return {Array}
   */
  private categoryChinese(data: Array<any>) {
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
    this.itKnowledge.data.xAxis = res;
  }

  /**
   * @description: roles字段转中文
   * @param {*} data
   * @return {*}
   */
  private rolesChinese(data: Array<any>) {
    const res: string[] = [];

    data.forEach((d: string) => {
      d = d.replace("roles", "");
      switch (d) {
        case "admin":
          res.push("管理员");
          break;
        case "editor":
          res.push("编辑者");
          break;
        case "test":
          res.push("测试");
          break;
        case "common":
          res.push("一般用户");
          break;
        case "demo":
          res.push("演示用户");
          break;
        default:
          break;
      }
    });
    this.user.data.xAxis = res;
  }

  /**
   * @description: schedule字段转中文
   * @param {*} data
   * @return {*}
   */
  private scheduleChinese(data: Array<any>) {
    const res: string[] = [];

    data.forEach((d: string) => {
      d = d.replace("schedule", "");
      switch (d) {
        case "0":
          res.push("未完成");
          break;
        case "1":
          res.push("进行中");
          break;
        case "2":
          res.push("已完成");
          break;
        default:
          break;
      }
    });
    this.agentEvent.data.xAxis = res;
  }

  /**
   * @description: singerName字段转中文
   * @param {*} data
   * @return {*}
   */
  private singerNameChinese(data: Array<any>) {
    const res: string[] = [];

    data.forEach((d: string) => {
      d = d.replace("singerName", "");
      res.push(d);
      // switch (d) {
      //   case "0":
      //     res.push("未完成");
      //     break;
      //   case "1":
      //     res.push("进行中");
      //     break;
      //   case "2":
      //     res.push("已完成");
      //     break;
      //   default:
      //     break;
      // }
    });
    this.musics.data.xAxis = res;
  }

  /**
   * @description: 获取总音乐数量
   * @param {*}
   * @return {*}
   */
  private async getMusic() {
    const allSongData: any = await getMusic(
      QS.stringify({
        singerName: "",
        singerSongName: "",
        current: 1,
        size: 1000
      })
    );

    this.musics.num = (this as any).getVal(allSongData, "1", "total");
    console.log(allSongData, "mus");

    const formatData: Array<any> = getEfficientAndFail((this as any).getVal(allSongData, "1", "records"), "singerName", function(d: any) {
      return d.delFlag === "0";
    });

    console.log(formatData);

    this.musics.data.efficient = formatData[0];
    this.musics.data.fail = formatData[1];
    this.singerNameChinese(formatData[3]);
  }

  created() {
    this.getUser();
    this.getAgentEvent(0);
    this.getItKnowledgeData();
    this.getMusic();
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3;
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
