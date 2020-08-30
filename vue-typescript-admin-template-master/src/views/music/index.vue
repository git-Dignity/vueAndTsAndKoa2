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
import songeListHeader from "./components/Header.vue";
import { randomSort } from "@/utils/tool/index";
import { songeList } from "./modules/songeList";

@Component({
  name: "songList",
  components: {
    songeListHeader
  }
})
export default class extends Vue {
  private songeList = songeList;

  created() {
    this.init();
  }

  private async init() {
    // 初始化歌榜
    this.initSingerList();
    this.initQingList();
    this.initAllSongList();
  }

  /**
   * 初始化歌手榜
   */
  private async initSingerList() {
    let { items }:any = await getSinger({
      current: 1,
      size: 8
    });
    items = JSON.parse(items);

    const arrTmp: Array<any> = [];
    for (var i in items) {
      arrTmp.push({
        songer: items[i].singerName,
        singer: "",
        index: i
      });
    }

    this.songeList[0].list = arrTmp;
  }

  /**
   * 初始化轻音乐榜
   */
  private async initQingList() {
    const qingData: any = await getMusic(
      QS.stringify({
        singerName: this.songeList[1].header.unique,
        singerSongName: "",
        current: 1,
        size: 8
      })
    );

    const arrTmp: Array<any> = [];
    for (var i in qingData[1].records) {
      arrTmp.push({
        songer: qingData[1].records[i].singerSongName,
        singer: qingData[1].records[i].singerName,
        index: i
      });
    }

    this.songeList[1].list = arrTmp;
  }

  /**
   * 初始化音乐馆
   */
  private async initAllSongList() {
    const allSongData: any = await getMusic(
      QS.stringify({
        singerName: "",
        singerSongName: "",
        current: 1,
        size: 1000
      })
    );
    const tmp: any = allSongData[1].records.sort(randomSort).slice(0, 8);

    const arrTmp: any = [];
    for (var i in tmp) {
      arrTmp.push({
        songer: tmp[i].singerSongName,
        singer: tmp[i].singerName,
        index: i
      });
    }

    this.songeList[2].list = arrTmp;
  }

  mounted() {
    // 给歌单上色，因为不能在for那加颜色，所以只能在js处理
    const clearfix: any = document.getElementsByClassName("clearfix");

    clearfix.forEach((element: any, index: number) => {
      element.parentNode.style.backgroundImage = this.songeList[index].bg;
    });
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