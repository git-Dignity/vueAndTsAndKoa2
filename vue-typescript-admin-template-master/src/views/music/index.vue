<template>
  <div class="app-container">

      <el-row :gutter="15">
      <el-upload
        class="upload-demo"
        drag
        action="/music/upload"
        :http-request="uoload"
        accept=".mp4, .mp3, .flac, .wima"
        :before-upload="beforeAvatarUpload"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">~</div>
      </el-upload>
    </el-row>


      <el-row>
     <el-table
    :data="musicData"
    border
    style="width: 100%"
    :default-sort = "{prop: 'isSys', order: 'descending'}"
    >
    <el-table-column
      prop="file_name"
      label="歌曲标题"
      width="380">
    </el-table-column>
    <el-table-column
      prop="file_size"
      label="時長"
      width="180">
    </el-table-column>
    <el-table-column
      prop="username"
      label="歌手"
      width="180">
    </el-table-column>
    <el-table-column
      label="音頻"
     >
      <template slot-scope="scope">
        <audio :src="scope.row.musicUrl" controls="controls"></audio>
      </template>
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
import { Component, Vue } from 'vue-property-decorator'
import { Form } from 'element-ui'
import { cloneDeep } from 'lodash'
import {
  getMusic,
  uploadMusic
} from "@/api/music/index";
import { qiniuUrl } from "@/api/common";

@Component({
  name: 'music'
 
})
export default class extends Vue {
   private musicData = [];
  private tableKey = 0
  private currentDate = new Date()
  public userLocal: any = localStorage.getItem("user")
   private currentPage = 1; //当前页码
  private total = 0; //查出来这个条件全部多少条

  private photoEnter(){
   
  }

  created() {
    this.init();
  }

aaa(e){
  console.log(e)
}   

    private async init() {
  const { data } = await getMusic({
      username: JSON.parse(this.userLocal).username,
      pageNum: this.currentPage
    });

    data.data.forEach((element: any) => {
      element.musicUrl = qiniuUrl + element.file_key;
    });
    this.total = data.total;
    this.musicData = data.data;
    console.log(this.musicData)
  }


    private async uoload(e: any) {
    const param = new FormData();
    param.append("username", JSON.parse(this.userLocal).username);
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
    this.initPhoto();
  }

  // 文件上传之前做处理
  private beforeAvatarUpload(file: any) {
    // console.log(file)
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