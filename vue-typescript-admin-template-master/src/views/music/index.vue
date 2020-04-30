<template>
  <div class="app-container">
    <el-row :gutter="15">
      <el-form :inline="true" :model="musicInfo" class="demo-form-inline">
        <el-form-item label="歌曲名">
          <el-input v-model="musicInfo.songName" placeholder="歌曲名"></el-input>
        </el-form-item>
        <el-form-item label="歌手名">
          <el-input v-model="musicInfo.singerName" placeholder="歌手名"></el-input>
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
        </el-form-item>
      </el-form>

      <el-upload
        class="upload-demo"
        drag
        action="/music/upload"
        :http-request="uoload"
        :before-upload="beforeAvatarUpload"
        accept=".mp4, .m4a, .mp3, .flac, .wima"
        multiple
        ref="upload"
        :auto-upload="false"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">请上传.mp4, .m4a, .mp3, .flac, .wima文件格式</div>
      </el-upload>

      <!--       
   <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <br />-->

      <!-- 
      <el-upload
  class="upload-demo"
  ref="upload"
  action="/music/upload"
        :http-request="uoload"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :auto-upload="false">
  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>-->
    </el-row>

    <el-row>
      <el-table
        :data="musicData"
        border
        style="width: 100%; margin-top: 3%"
        :default-sort="{prop: 'isSys', order: 'descending'}"
      >
        <el-table-column prop="song_name" label="歌曲名" width="380"></el-table-column>
        <el-table-column prop="singer_name" label="歌手名" width="180"></el-table-column>
        <el-table-column prop="songT" label="歌曲类型" width="150"></el-table-column>
        <el-table-column prop="file_size" label="時長" width="180"></el-table-column>
        <el-table-column label="音頻">
          <template slot-scope="{row}">
            <el-button
              v-if="row.play"
              type="danger"
              icon="el-icon-video-pause"
              @click="musicPause_btn(row)"
              circle
            ></el-button>
            <el-button
              v-else
              type="primary"
              icon="el-icon-video-play"
              @click="musicPlay_btn(row, row.musicUrl, row.username)"
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
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[6, 12, 18, 100]"
      :page-size="6"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Form } from "element-ui";
import { cloneDeep } from "lodash";
import { getMusic, uploadMusic } from "@/api/music/index";
import { MusicModule } from "@/store/modules/music";
import { qiniuUrl } from "@/api/common";

@Component({
  name: "music"
})
export default class extends Vue {
  private musicData = [];
  private tableKey = 0;
  private currentDate = new Date();
  public userLocal: any = localStorage.getItem("user");
  private currentPage = 1; //当前页码
  private total = 0; //查出来这个条件全部多少条
  musicInfo = {
    songName: "",
    singerName: "",
    songType: "民族"
  };

  submitUpload() {
    if (
      this.musicInfo.songName != "" &&
      this.musicInfo.singerName != "" &&
      this.$refs.upload.uploadFiles.length != 0
    ) {
      this.$refs.upload.submit();
      return;
    }

    this.$message.error("请检查上传参数是否齐全!");
  }
  handleRemove(file, fileList) {
    console.log(file, fileList);
  }
  handlePreview(file) {
    console.log(file);
  }

  private photoEnter() {}

  created() {
    this.init();
  }

  async musicPlay_btn(row: any, url, uploader) {
    // console.log(row);
    this.musicData.forEach((element: any) => {
      element.play = false;
    });

    row.play = true;

    await MusicModule.MusicPage({
      url: url,
      uploader: uploader,
      play: true
    });
  }

  async musicPause_btn(row) {
    row.play = false;
  }

  get musicpa() {
    return MusicModule.playasb;
  }

  @Watch("musicpa")
  private onRoutesChange(data) {
    console.log(data);
    console.log("拿不到playasb的store，应该是缓存");
  }

  aaa(e) {
    console.log(e);
  }

  getSongType(type) {
    let songTypeMap = new Map([
      ["0", "民族"],
      ["1", "流行"],
      ["2", "摇滚"],
      ["3", "轻音乐"]
    ]);
    return songTypeMap.get(type) ? songTypeMap.get(type) : "民族";
  }

  private async init() {
    const { data } = await getMusic({
      // username: JSON.parse(this.userLocal).username,
      singerName: "周杰伦",
      pageNum: this.currentPage
    });

    data.data.forEach((element: any) => {
      element.musicUrl = qiniuUrl + element.file_key;
      element.songT = this.getSongType(element.song_type);
      element.play = false;
    });
    this.total = data.total;
    this.musicData = data.data;
    // console.log(this.musicData);
  }

  private async uoload(e: any) {
    const param = new FormData();
    param.append("musicInfo", JSON.stringify(this.musicInfo));
    param.append("file", e.file);

    await uploadMusic(param);

    this.$message({
      message: "上传成功",
      type: "success"
    });
    this.init();
  }

  private handleSizeChange(val: number) {
    console.log(`每页 ${val} 条`);
  }
  private handleCurrentChange(val: number) {
    console.log(`当前页: ${val}`);
    this.currentPage = val;
    this.init();
  }

  // 文件上传之前做处理
  private beforeAvatarUpload(file: any) {
    // console.log(file); 
    // const isLt20M = file.size / 1024 / 1024 < 20;
    // // 图片格式
    // if (
    //   file.type !== "image/jpeg" &&
    //   file.type !== "image/jpg" &&
    //   file.type !== "image/png" &&
    //   file.type !== "image/gif"
    // ) {
    //   this.$message.error("只能上传图片格式文件!");
    //   return false;
    // }
    // // 图片大小
    // if (!isLt20M) {
    //   this.$message.error("上传头像图片大小不能超过 20MB!");
    //   return false;
    // }
  }
}
</script>

<style  scope>
</style>