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
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-row>

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


@Component({
  name: 'music'
 
})
export default class extends Vue {
  private tableKey = 0
  private currentDate = new Date()
  public userLocal: any = localStorage.getItem("user")
   private currentPage = 1; //当前页码

  private photoEnter(){
   
  }

  created() {
    this.init();
  }

    private async init() {
  
    const { data } = await getMusic({
     
    });

    console.log(data)

    // data.data.forEach((element: any) => {
    //   element.imgUrl = qiniuUrl + element.file_key;
    // });
    // this.total = data.total;
    // this.certificateData = data.data;
  }


    private async uoload(e: any) {
    const param = new FormData();
    param.append("username", JSON.parse(this.userLocal).username);
    param.append("file", e.file);

    await uploadMusic(param);

    // this.$message({
    //   message: "上传成功",
    //   type: "success"
    // });
    // this.init();
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