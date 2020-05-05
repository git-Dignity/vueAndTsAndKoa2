<template>
  <div class="app-container">
    <el-collapse accordion>
      <el-collapse-item v-permission="['admin','editor']">
        <template slot="title">
          歌手上传 &nbsp;
          <i class="el-icon-upload2"></i>
        </template>

        <el-form :inline="true" :model="singerInfo" class="demo-form-inline">
          <el-form-item label="歌手名">
            <el-input v-model="singerInfo.singerName" placeholder="歌手名"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">上传</el-button>
          </el-form-item>
        </el-form>

        <el-row :gutter="15">
          <el-upload
            class="avatar-uploader"
            action="/certificateAuthentication/upload"
            :http-request="uoload"
            accept=".png, .jpg, .gif, .jpeg"
            :show-file-list="false"
            ref="upload"
            :auto-upload="false"
            :on-change="changeSingerImg"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-row>

      </el-collapse-item>
    </el-collapse>

    <el-row>
      <el-col
        :span="6"
        v-for="(single, index) in singleList"
        :key="index"
        :offset="index > 0 ? 2 : 0"
      >
        <el-card :body-style="{ padding: '0px' }">
          <el-avatar shape="square" :size="150" fit="fill" :src="single.musicUrl"></el-avatar>
          <div style="padding: 14px;">
            <span>{{single.singer_name}}</span>
            <div class="bottom clearfix">
              <time class="time">{{ single.upload_time }}</time>
              <el-button type="text" class="button" @click="photoEnter(single.singer_name)">进入歌单</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Form } from "element-ui";
import { cloneDeep } from "lodash";
import { qiniuUrl } from "@/api/common";
import { getSinger, uploadSinger } from "@/api/music/singer/index";

@Component({
  name: "musicSinger"
})
export default class extends Vue {
  private tableKey = 0;
  private currentDate = new Date();
  private singleList = [];
  private imageUrl = "";

  private singerInfo = {
    singerName: ""
  };

  created() {
    this.init();
  }

  private photoEnter(singerName: string) {
    // console.log(singerName);
    this.$router.push({
      path: "/music/singer-song-list",
      query: {
        singerName: singerName
      }
    });
  }

  private beforeAvatarUpload(file: any) {
    console.log(111);
    // console.log(file)
    const isLt20M = file.size / 1024 / 1024 < 20;
    // 图片格式
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/jpg" &&
      file.type !== "image/png" &&
      file.type !== "image/gif"
    ) {
      this.$message.error("只能上传图片格式文件!");
      return false;
    }
    // 图片大小
    if (!isLt20M) {
      this.$message.error("上传头像图片大小不能超过 20MB!");
      return false;
    }
  }

  private async onSubmit() {
    if (
      this.singerInfo.singerName != "" &&
      (this.$refs.upload as any).uploadFiles.length != 0
    ) {
      (this.$refs.upload as any).submit();
      return;
    }

    this.$message.error("请检查上传参数是否齐全!");

    // console.log(this.formInline);
    // const { data } = await getCertificate({
    //   username: JSON.parse(this.userLocal).username,
    //   pageNum: this.currentPage,
    //   form: this.formInline
    // });
    // this.$message({
    //   message: "查询成功",
    //   type: "success"
    // });
    // data.data.forEach((element: any) => {
    //   element.imgUrl = qiniuUrl + element.file_key;
    // });
    // this.total = data.total;
    // this.certificateData = data.data;
  }

  private async init() {
    const { data } = await getSinger({});
    // console.log(data)

    data.items.forEach((element: any) => {
      element.musicUrl = qiniuUrl + element.file_key;
    });
    this.singleList = data.items;
    // console.log(this.singleList);
  }

  handleAvatarSuccess(res: any, file: any) {
    // console.log(file);
    this.imageUrl = URL.createObjectURL(file.raw);
  }

  changeSingerImg(file: any, fileList: any) {
    //   console.log(file)
    this.imageUrl = URL.createObjectURL(file.raw);
    this.$message("歌手图片已选中");
  }

  private async uoload(e: any) {
    const param = new FormData();
    param.append("singerInfo", JSON.stringify(this.singerInfo));
    param.append("file", e.file);

    await uploadSinger(param);

    this.$message({
      message: "上传成功",
      type: "success"
    });
    this.init();
  }
}
</script>

<style scope>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

/* upload */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>