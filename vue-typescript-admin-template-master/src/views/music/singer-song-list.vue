<template>
  <div class="app-container">
    <!-- <svg-icon name="singer" />
    <app-button></app-button>-->
    <!-- <div>{{ ssss | thousandBitSeparator }}</div> -->

    <el-collapse
      v-model="activeNames"
      accordion
    >
      <el-collapse-item name="search">
        <template slot="title">
          搜索歌手清单 &nbsp;
          <i class="el-icon-search" />
        </template>

        <el-form
          :inline="true"
          :model="searchForm"
          class="demo-form-inline"
        >
          <el-form-item label="歌曲名">
            <el-input
              v-model="searchForm.song"
              placeholder="歌曲名"
            />
          </el-form-item>
          <el-form-item
            label="歌手名"
          >
            <el-select
              v-model="searchForm.singerName"
              multiple
              collapse-tags
              placeholder="歌手名"
              @change="singTypeChange"
            >
              <el-option
                v-for="(singType, index) in singTypeOption"
                :key="index"
                :label="singType.label"
                :value="singType.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="onSongSubmit"
            >
              查询
            </el-button>
            <el-button @click="resetForm()">
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>

      <el-collapse-item
        v-permission="['admin']"
        name="upload"
      >
        <template slot="title">
          上传歌手清单 &nbsp;
          <i class="el-icon-upload2" />
        </template>

        <el-row :gutter="15">
          <el-form
            :inline="true"
            :model="musicInfo"
            class="demo-form-inline"
          >
            <el-form-item label="歌手名">
              <!-- readonly="true" -->
              <el-input
                v-model="musicInfo.singerName"
                placeholder="歌手名"
              />
            </el-form-item>
            <el-form-item label="歌曲名">
              <el-input
                v-model="musicInfo.songName"
                placeholder="歌曲名"
              />
            </el-form-item>
            <el-form-item label="歌曲类型">
              <el-select
                v-model="musicInfo.songType"
                placeholder="歌曲类型"
              >
                <el-option
                  v-for="(songType, index) in songTypeOption"
                  :key="index"
                  :label="songType.label"
                  :value="songType.value"
                />
                <!-- <el-option label="流行" value="1"></el-option>
                <el-option label="摇滚" value="2"></el-option>
                <el-option label="轻音乐" value="3"></el-option>-->
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="submitUpload"
              >
                上传
              </el-button>
              <el-button @click="resetUpload()">
                重置
              </el-button>
            </el-form-item>
          </el-form>

          <el-col :span="7">
            <UploadFile
              :children-upload-file-data="childrenUploadMusicData"
              @parentUploadFileData="parentUploadMusicData"
            />
          </el-col>

          <el-col :span="7">
            <UploadFile
              :children-upload-file-data="childrenUploadImgData"
              @parentUploadFileData="parentUploadImgData"
            />
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>

    <el-row>
      <el-table
        :data="musicData"
        border
        style="width: 100%; margin-top: 3%"
        :default-sort="{prop: 'isSys', order: 'descending'}"
      >
        <el-table-column
          width="120"
          label="歌曲图片"
        >
          <template slot-scope="{row}">
            <!-- <router-link :to="'/music/singer-song-lyric/'+row.singer_name"> -->
            <button @click="songLyric(row)">
              <el-avatar
                shape="square"
                :size="80"
                fit="fill"
                :src="row.img_url"
              />
            </button>
            <!-- </router-link> -->
          </template>
        </el-table-column>
        <el-table-column
          prop="singerSongName"
          label="歌曲名"
          width="380"
        />
        <el-table-column
          prop="singerName"
          label="歌手名"
          width="180"
        />
        <el-table-column
          prop="singerSongType"
          label="歌曲类型"
          width="150"
        />
        <el-table-column
          prop="fileSize"
          label="時長"
          width="180"
        />
        <el-table-column label="音頻">
          <template slot-scope="{row}">
            <el-button-group>
              <el-button
                v-if="row.play"
                type="danger"
                icon="el-icon-video-pause"
                @click="musicPauseBtn(row)"
              />
              <el-button
                v-else
                type="primary"
                icon="el-icon-video-play"
                @click="musicPlayBtn(row, row.song_url, row.singerName, row.singerSongName)"
              />
              <el-button
                v-permission="['admin']"
                icon="el-icon-edit"
                @click="singerSongEdit(row, row.song_url, row.singerName, row.singerSongName)"
              />
              <el-button
                v-permission="['admin']"
                type="danger"
                icon="el-icon-delete"
                @click="singerSongDel(row)"
              />
            </el-button-group>
          </template>
          <!-- <template slot-scope="scope">
         <el-button
          type="primary"
          :icon="viedoPlay"
          @click="music_btn(scope.row, scope.row.musicUrl, scope.row.username)"
          circle>
          </el-button>
          </template>-->
        </el-table-column>
      </el-table>
    </el-row>
    <el-pagination
      :current-page="page.currentPage"
      :page-sizes="[6, 12, 18, 100, 1000]"
      :page-size="6"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <SingerDialog
      :children-data="childrenDialogData"
      @update:parentDialogSubmit="parentDialogEditSubmit"
      @update:parentDialogCancel="parentDialogCancel"
    >
      <div slot="childTemplate">
        <EditSingerSongDialog
          :info="childrenDialogData.info"
          @singerDialogData="singerDialogData"
        />
      </div>
    </SingerDialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, ProvideReactive, Watch } from "vue-property-decorator";
// import { Form } from "element-ui";
// import { cloneDeep } from "lodash";
import { getMusic, uploadMusic, delMusic, editMusic } from "@/api/music/index";
import { MusicModule } from "@/store/modules/music";
import { UserModule } from "@/store/modules/user";
import QS from "qs";
// import { qiniuUrl } from "@/api/common";
import { checkPermission } from "@/utils/permission"; // Use permission directly
import Point from "./test";
import { symbol } from "@/utils/symBol";
import { EventBus } from "@/eventBus/index";
import SingerDialog from "@/components/Dialog/index.vue";
import UploadFile from "@/components/UploadFile/index.vue";
import EditSingerSongDialog from "./components/EditSingerSongDialog.vue";
import {
  MessageSuccess,
  MessageError,
  MesssageBoxQuestion
} from "@/utils/tool/message";
import {
  getSinger
} from "@/api/music/singer/index";

@Component({
  name: "singerSongList",
  components: {
    UploadFile,
    SingerDialog,
    EditSingerSongDialog
  }
})
export default class extends Vue {
  private musicData = [];
  private point = new Point("1", "41"); //  //使用class

  private page = {
    currentPage: 1, // 当前页码
    total: 0, // 查出来这个条件全部多少条
    size: 6 // 每页显示几条
  };

  private musicInfo = {
    songName: "",
    singerName: "",
    songType: "民族"
  };

  private file_list: any = {
    song_file: [],
    songImgFile: []
  };

  activeNames = ["search"];
  searchForm = {
    song: "",
    singerName: ""
  };

  songTypeOption = [
    {
      label: "民族",
      value: "0"
    },
    {
      label: "流行",
      value: "1"
    },
    {
      label: "摇滚",
      value: "2"
    },
    {
      label: "轻音乐",
      value: "3"
    }
  ];

  private singTypeOption: any = [] // 搜索歌手名类型option

  private childrenUploadImgData = {
    upload__text: "上传歌曲图片文件",
    type: "image",
    accept: ".png, .jpg, .gif, .jpeg"
  };

  private childrenUploadMusicData = {
    upload__text: "上传歌曲文件",
    type: "music",
    accept: ".mp4, .m4a, .mp3, .flac, .wima"
  };

  private childrenDialogData = {
    title: "修改歌手歌曲信息",
    show: false,
    width: "20%",
    center: true,
    info: []
  };

  // 为了避免命名冲突, 可以使用 ES6 的 Symbol 特性作为 key
  @ProvideReactive(symbol)
  private isClear = false;

  // 子组件给父组件传值
  parentUploadImgData(data: any) {
    this.file_list.songImgFile = data;
  }

  parentUploadMusicData(data: any) {
    this.file_list.song_file = data;
  }

  private async init() {
    this.point.x = "5454545";
    console.log(this.point); // 使用class

    if (this.musicInfo.singerName == "轻") this.musicInfo.songType = "轻音乐";

    const data: any = await getMusic(
      QS.stringify({
        singerName: this.musicInfo.singerName,
        singerSongName: this.searchForm.song,
        current: this.page.currentPage,
        size: this.page.size
      })
    );
    // console.log(data);

    data[1].records.forEach((element: any) => {
      element.play = false;
    });
    this.page.total = data[1].total;
    this.musicData = data[1].records;
    await MusicModule.AudiosPage(this.musicData);
    // console.log(this.musicData);
  }

  async onSongSubmit() {
    const data: any = await getMusic(
      QS.stringify({
        singerSongName: this.searchForm.song,
        current: 1,
        size: this.page.size,
        singerName: this.musicInfo.singerName
      })
    );

    data[1].records.forEach((element: any) => {
      // element.musicUrl = qiniuUrl + element.file_key;
      // element.songImg = qiniuUrl + element.songFileKey;
      // element.songT = this.getSongType(element.song_type);
      element.play = false;
    });
    this.page.total = data[1].total;
    this.musicData = data[1].records;
    await MusicModule.AudiosPage(this.musicData);
  }

  resetForm() {
    this.searchForm.song = "";
    this.init();
  }

  resetUpload() {
    this.clearUploadData();
  }

  songLyric(row: any) {
    this.$router.push({
      path: "/music/singer-song-lyric",
      query: {
        singerName: row.singerName,
        songName: row.singerSongName
      }
    });
  }

  async submitUpload() {
    // console.log(this.$children);
    if (
      this.musicInfo.songName !== "" &&
      this.file_list.song_file.length !== 0 &&
      this.file_list.songImgFile.length !== 0
    ) {
      // 一定要先上传歌曲，再来上传歌曲的图片，这样才可以一起进入一个方法insert到同一张表中
      // (this.$refs.upload as any).submit();
      // (this.$refs.singerImg_upload as any).submit();
      // return;

      const param = new FormData();

      const dataInfo = Object.assign(
        { username: UserModule.name },
        this.musicInfo
      );
      param.append("info", JSON.stringify(dataInfo));
      param.append("song_file", this.file_list.song_file.file);
      param.append("singerImg_file", this.file_list.songImgFile.file);

      const result: any = await uploadMusic(param);
      if (result.Success === "true") {
        this.$message({
          message: "上传成功",
          type: "success"
        });
        // 清空上传数据
        this.clearUploadData();

        this.init();
      } else {
        this.$message.error("上传失败!");
      }
    } else {
      this.$message.error("请检查歌曲和歌曲图片是否有上传!");
    }
  }

  // 清空上传组件数据
  clearUploadData() {
    // (this.$refs.upload as any).clearFiles(); // 文件列表清空
    this.file_list.song_file = [];
    this.file_list.songImgFile = [];
    this.musicInfo.songName = "";

    (this as any).isClear = true;

    // 清除子组件uploadFile数据
    // EventBus.$emit("clear", true);
  }

  created() {
    this.musicInfo.singerName = this.$route.query.singerName + "";
    this.init();
  }

  private async singerSongEdit(
    row: any,
    url: string,
    singerName: string,
    songName: string
  ) {
    // console.log(row);
    this.childrenDialogData.info = row;
    this.childrenDialogData.show = true;
  }

  singerSongDel(row: any) {
    MesssageBoxQuestion("是否删除该歌手歌曲,是否继续").then(async () => {
      const data: any = await delMusic(
        QS.stringify({
          info: JSON.stringify(row)
        })
      );

      if (data[1]) {
        MessageSuccess("删除成功!");
        this.init();
      }
    });
  }

  private async parentDialogEditSubmit(data: any) {
    // console.log(data);

    const result: any = await editMusic(
      QS.stringify({
        id: data.id,
        singerSongName: data.singerName
      })
    );
    // console.log(result);
    EventBus.$emit("isShowDialog", true);
    if (result.Success == "true") {
      this.$message({
        message: "修改歌手信息成功",
        type: "success"
      });
      this.init();
    }
  }

  private parentDialogCancel(data: any) {
    // console.log(data);
    // (this as any).isCancel = data;
    EventBus.$emit("isCancel", data);
  }

  singerDialogData(data: any) {
    // console.log(data);
    EventBus.$emit("parentDialogEmit", data);
  }

  async musicPlayBtn(
    row: any,
    url: string,
    singerName: string,
    songName: string
  ) {
    // console.log(url);
    this.musicData.forEach((element: any) => {
      element.play = false;
    });
    row.play = true;
    await MusicModule.MusicPage({
      url: url,
      singerName: singerName,
      songName: songName,
      play: true
    });
  }

  async musicPauseBtn(row: any) {
    row.play = false;
  }

  get musicpa() {
    return MusicModule.playasb;
  }

  @Watch("musicpa")
  private onRoutesChange(data: any) {
    console.log(data);
    console.log("拿不到playasb的store，应该是缓存");
  }

  getSongType(type: string) {
    const songTypeMap = new Map([
      ["0", "民族"],
      ["1", "流行"],
      ["2", "摇滚"],
      ["3", "轻音乐"]
    ]);
    return songTypeMap.get(type) ? songTypeMap.get(type) : "民族";
  }

  private handleSizeChange(val: number) {
    this.page.size = val;
    this.page.currentPage = 1;
    this.init();
  }

  private handleCurrentChange(val: number) {
    // console.log(`当前页: ${val}`);
    this.page.currentPage = val;
    this.init();
  }

  /**
   * 获取歌手列表
   */
  private async getSinger() {
    const { items }: any = await getSinger({});
    return JSON.parse(items);
  }

  /**
   * 初始化搜索栏的歌手名Option
   * 若this.$route.query.singerName有传值，则是从对应的歌手点进来，不需要执行
   * 只有当从全部列表进来才需要
   */
  private initSongTypeList() {
    if (this.$route.query.singerName) {
      this.singTypeOption.push({
        label: this.$route.query.singerName,
        value: this.$route.query.singerName
      });

      return;
    }

    this.getSinger().then(singer => {
      singer.forEach((s: any) => {
          this.singTypeOption.push({
        label: s.singerName,
        value: s.singerName
      });
      });

      // console.log(this.singTypeOption);
    });
  }

  /**
   * 搜索栏的歌手名下拉框Change事件
   */
  private singTypeChange(e: any) {
    // console.log(e);
    this.musicInfo.singerName = e.join(",");
    console.log(this.musicInfo.singerName);
  }

  mounted() {
    this.initSongTypeList();
  }
}
</script>

<style lang="scss"  scope>
// css中的 /deep/ 是干嘛的，其实是修改elementui等第三方组件内部样式，做的渗透。如果不用scss， 可以使用 >>> 符号来修改第三方组件内部样式。
// 有一个样式问题，因为是认为改变file-list，取最后一项，因此，用户选择第二个文件后，从第一个文件到第二个文件，有动态切换的效果，这不是我想要的，
// 我想要的是 用户点击“上传文件”，本地电脑 选择文件，点击“确定”，页面上直接展示所选文件，不要动态切换。
.el-list-enter-active,
.el-list-leave-active {
  transition: none;
}

.el-list-enter,
.el-list-leave-active {
  opacity: 0;
}
.el-upload-list {
  height: 40px;
}
.el-collapse-item__wrap {
  padding: 10px;
}
</style>
