<template>
  <div class="app-container">
    <el-collapse accordion v-model="activeNames">
      <el-collapse-item name="search">
        <template slot="title">
          搜索歌手清单 &nbsp;
          <i class="el-icon-search"></i>
        </template>

        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
          <el-form-item label="歌曲名">
            <el-input v-model="searchForm.song" placeholder="歌曲名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSongSubmit">查询</el-button>
            <el-button @click="resetForm()">重置</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>

      <el-collapse-item name="upload" v-permission="['admin']">
        <template slot="title">
          上传歌手清单 &nbsp;
          <i class="el-icon-upload2"></i>
        </template>

        <el-row :gutter="15">
          <el-form :inline="true" :model="musicInfo" class="demo-form-inline">
            <el-form-item label="歌手名">
              <!-- readonly="true" -->
              <el-input v-model="musicInfo.singerName" placeholder="歌手名"></el-input>
            </el-form-item>
            <el-form-item label="歌曲名">
              <el-input v-model="musicInfo.songName" placeholder="歌曲名"></el-input>
            </el-form-item>
            <el-form-item label="歌曲类型">
              <el-select v-model="musicInfo.songType" placeholder="歌曲类型">
                <el-option label="民族" value="0"></el-option>
                <el-option label="流行" value="1"></el-option>
                <el-option label="摇滚" value="2"></el-option>
                <el-option label="轻音乐" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitUpload">上传</el-button>
              <el-button @click="resetUpload()">重置</el-button>
            </el-form-item>
          </el-form>

          <el-col :span="7">
            <el-upload
              class="upload-demo"
              drag
              action="/music/upload"
              :http-request="uoload"
              :file-list="fileSongList"
              :on-change="handleSongChange"
              accept=".mp4, .m4a, .mp3, .flac, .wima"
              ref="upload"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                上传歌曲文件
                <p></p>将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">请上传.mp4, .m4a, .mp3, .flac, .wima文件格式</div>
            </el-upload>
          </el-col>

          <el-col :span="7">
            <el-upload
              class="upload-demo"
              drag
              action="/music/upload"
              :http-request="singerImgUpload"
              :file-list="fileSongImgList"
              :on-change="handleSongImgChange"
              accept=".png, .jpg, .gif, .jpeg"
              ref="singerImg_upload"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                上传歌曲图片文件
                <p></p>将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">请上传.png, .jpg, .gif, .jpeg文件格式</div>
            </el-upload>
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
        <el-table-column width="120" label="歌曲图片">
          <template slot-scope="{row}">
            <!-- <router-link :to="'/music/singer-song-lyric/'+row.singer_name"> -->
            <button @click="songLyric(row)">
              <el-avatar shape="square" :size="80" fit="fill" :src="row.img_url"></el-avatar>
            </button>
            <!-- </router-link> -->
          </template>
        </el-table-column>
        <el-table-column prop="singerSongName" label="歌曲名" width="380"></el-table-column>
        <el-table-column prop="singerName" label="歌手名" width="180"></el-table-column>
        <el-table-column prop="singerSongType" label="歌曲类型" width="150"></el-table-column>
        <el-table-column prop="fileSize" label="時長" width="180"></el-table-column>
        <el-table-column label="音頻">
          <template slot-scope="{row}">
            <el-button
              v-if="row.play"
              type="danger"
              icon="el-icon-video-pause"
              @click="musicPauseBtn(row)"
              circle
            ></el-button>
            <el-button
              v-else
              type="primary"
              icon="el-icon-video-play"
              @click="musicPlayBtn(row, row.song_url, row.singerName, row.singerSongName)"
              circle
            ></el-button>
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
      :page-sizes="[6, 12, 18, 100]"
      :page-size="6"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Form } from "element-ui";
import { cloneDeep } from "lodash";
import { getMusic, uploadMusic } from "@/api/music/index";
import { MusicModule } from "@/store/modules/music";
import { UserModule } from "@/store/modules/user";
import QS from 'qs'
import { qiniuUrl } from "@/api/common";
import { checkPermission } from "@/utils/permission"; // Use permission directly

@Component({
  name: "singerSongList"
})
export default class extends Vue {
  private musicData = [];
  private tableKey = 0;
  private currentDate = new Date();
  // public userLocal: any = localStorage.getItem("user");

  private page = {
    currentPage: 1, //当前页码
    total: 0, //查出来这个条件全部多少条
    size: 6 // 每页显示几条
  };
  private musicInfo = {
    songName: "",
    singerName: "",
    songType: "民族"
  };
  private file_list: any = {
    song_file: [],
    songImg_file: []
  };
  activeNames = ["search"];
  searchForm = {
    song: ""
  };
  fileSongList = [];
  fileSongImgList = [];

  handleSongChange(file, list) {
    if (list.length > 0) {
      this.fileSongList = [list[list.length - 1]];
    }
  }

  handleSongImgChange(file, list) {
    if (list.length > 0) {
      this.fileSongImgList = [list[list.length - 1]];
    }
  }

  
  private async init() {
    this.musicInfo.singerName = this.$route.query.singerName + "";

    const { data } = await getMusic(QS.stringify({
      singerName: this.musicInfo.singerName,
      singerSongName: this.searchForm.song,
      current: this.page.currentPage,
      size: this.page.size
    }));
    // console.log(data)
   
    data[1].records.forEach((element: any) => {
      // element.musicUrl = qiniuUrl + element.file_key;
      // element.songImg = qiniuUrl + element.songFileKey;
      // element.songT = this.getSongType(element.song_type);
      element.play = false;
    });
    this.page.total = data[1].total;
    this.musicData = data[1].records;
    await MusicModule.AudiosPage(this.musicData);
    // console.log(this.musicData);
  }

  async onSongSubmit() {
    const { data } = await getMusic(QS.stringify({
      singerSongName: this.searchForm.song,
      current: 1,
      size: this.page.size,
      singerName: this.musicInfo.singerName
    }));

    // console.log(data);

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

  resetUpload(){
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
    if (
      this.musicInfo.songName != "" &&
      this.file_list.song_file.length !== 0 &&
      this.file_list.songImg_file.length !== 0
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
      param.append("singerImg_file", this.file_list.songImg_file.file);
      const result = await uploadMusic(param);
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
    (this.$refs.upload as any).clearFiles(); // 文件列表清空
    (this.$refs.singerImg_upload as any).clearFiles();
    this.file_list.song_file = [];
    this.file_list.songImg_file = [];
    this.musicInfo.songName = "";
  }

  created() {
    this.init();
    // localStorage.setItem(
    //   "user",
    //   JSON.stringify({
    //     username: "zheng"
    //   })
    // );
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
  

  private async uoload(e: any) {
    this.file_list.song_file = e;
  }

  private async singerImgUpload(e: any) {
    this.file_list.songImg_file = e;
    // this.file_list.push(e);

    // console.log(this.file_list);

    // if (this.file_list.length === 2) {
    //   const param = new FormData();

    //   const dataInfo = Object.assign(
    //     { username: UserModule.name },
    //     this.musicInfo
    //   );
    //   const fileTypeArr = [1, 0];
    //   param.append("info", JSON.stringify(dataInfo));
    //   param.append("fileTypeList",fileTypeArr.toString());
    //   param.append("song_file", this.file_list[0].file);
    //   param.append("singerImg_file", this.file_list[1].file);
    //   await uploadMusic(param);
    //   this.$message({
    //     message: "上传成功",
    //     type: "success"
    //   });
    //   this.init();
    // } else {
    //   this.$message({
    //     message: "请检查歌曲和歌曲图片是否有上传",
    //     type: "success"
    //   });
    // }
  }

  private handleSizeChange(val: number) {
    this.page.size = val;
    this.page.currentPage = 1;
    this.init();
  }
  private handleCurrentChange(val: number) {
    console.log(`当前页: ${val}`);
    this.page.currentPage = val;
    this.init();
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
</style>