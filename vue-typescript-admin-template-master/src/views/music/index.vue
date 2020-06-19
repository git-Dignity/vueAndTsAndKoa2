<template>
  <div class="app-container">
    <el-col
      :span="6"
      v-for="(song, index) in songeList"
      :key="index"
      class="mb4"
      :offset="index > 0 ? 2 : 0"
    >
      <el-row>
        <router-link :to="{ path: song.link.path, query: song.link.query}">
          <el-card class="box-card" ref="songHead">
            <div slot="header" class="clearfix text-white">
              <songeListHeader :header="song.header"></songeListHeader>
              <span
                style="padding: 3px 0"
                v-if="song.header.play"
                class="el-icon-video-play f40 fr"
              ></span>
            </div>

            <div
              v-for="(songList, songListIndex) in song.list"
              :key="songList.index"
              class="text item"
            >
              <span class="f20 num3-color" v-if="songListIndex<3">{{songListIndex+1}}</span>
              <span class="f20 num-color" v-else>{{songListIndex+1}}</span>
              <span class="ml4 mr4">-</span>
              <span>{{ songList.songer }}</span>
              <span class="fr" v-if="songList.singer">{{ songList.singer }}</span>
            </div>
          </el-card>
        </router-link>
      </el-row>
    </el-col>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Form } from "element-ui";
import { cloneDeep } from "lodash";
import { qiniuUrl } from "@/api/common";
import { UserModule } from "@/store/modules/user";
import { getSinger, uploadSinger } from "@/api/music/singer/index";
import { getMusic, uploadMusic } from "@/api/music/index";
import { Module } from "module";
import QS from "qs";
import songeListHeader from "./components/Header";
import { randomSort } from "@/utils/tool";

@Component({
  name: "songList",
  components: {
    songeListHeader
  }
})
export default class extends Vue {
  private tableKey = 0;
  private currentDate = new Date();
  private singleList = [];
  private imageUrl = "";

  private singerInfo = {
    singerName: ""
  };

  private songeList = [
    {
      header: {
        unique: "歌",
        rightText: "手榜",
        time: "05月31日更新",
        play: false
      },
      link: {
        path: "/music/music-singer",
        query: {}
      },
      bg: "linear-gradient(141deg,#9948ca 0%,#924fcb 51%,#9948ca 75%)",
      list: [{ songer: "", singer: "" }]
    },
    {
      header: {
        unique: "轻",
        rightText: "音乐榜",
        time: "05月31日更新",
        play: true
      },
      link: {
        path: "/music/singer-song-list",
        query: {
          singerName: "轻"
        }
      },
      bg: "linear-gradient(141deg,#149AB4 0%,#46B8C3 51%,#30B3C3 75%)",
      list: [{ songer: "小朋友，你是否有很多问号？", singer: "周杰伦" }]
    },
    {
      header: {
        unique: "音",
        rightText: "乐馆",
        time: "06月17日更新",
        play: true
      },
      link: {
        path: "/music/singer-song-list",
        query: {
          singerName: ""
        }
      },
      bg: "linear-gradient(141deg,#E64D7A 0%,#DC4673 51%,#CC446C 75%)",
      list: [{ songer: "暂无数据", singer: "阿泽" }]
    }
  ];

  created() {
    this.init();
  }
  mounted() {
    // 给歌单上色，因为不能在for那加颜色，所以只能在js处理
    const clearfix: any = document.getElementsByClassName("clearfix");

    clearfix.forEach((element, index) => {
      element.parentNode.style.backgroundImage = this.songeList[index].bg;
    });
  }

  private async init() {
    // 初始化歌榜
    this.initSingerList();
    this.initQingList();
    this.initAllSongList();
  }

  private async initSingerList() {
    const singerData: any = await getSinger({
      current: 1,
      size: 8
    });

    const arrTmp = [];
    for (var i in singerData[1].items) {
      arrTmp.push({
        songer: singerData[1].items[i].singerName,
        index: i
      });
    }
    this.songeList[0].list = arrTmp;
  }

  private async initQingList() {
    const qingData: any = await getMusic(
      QS.stringify({
        singerName: this.songeList[1].header.unique,
        singerSongName: "",
        current: 1,
        size: 8
      })
    );

    const arrTmp = [];
    for (var i in qingData[1].records) {
      arrTmp.push({
        songer: qingData[1].records[i].singerSongName,
        singer: qingData[1].records[i].singerName,
        index: i
      });
    }

    this.songeList[1].list = arrTmp;
  }

  private async initAllSongList() {
    const allSongData: any = await getMusic(
      QS.stringify({
        singerName: "",
        singerSongName: "",
        current: 1,
        size: 1000
      })
    );
    const tmp = allSongData[1].records.sort(randomSort).slice(0, 8);

    const arrTmp = [];
    for (var i in tmp) {
      arrTmp.push({
        songer: tmp[i].singerSongName,
        singer: tmp[i].singerName,
        index: i
      });
    }

    this.songeList[2].list = arrTmp;
  }
}
</script>





<style lang="scss"  scope>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  //   width: 480px;
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }
}

.el-card__header {
  cursor: pointer;
  //   background-image: linear-gradient(
  //     141deg,
  //     #9948ca 0%,
  //     #924fcb 51%,
  //     #9948ca 75%
  //   );
}
</style>