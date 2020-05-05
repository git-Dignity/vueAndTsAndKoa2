<template>
  <div class="app-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="圖片名">
        <el-input v-model="formInline.fileName" placeholder="圖片名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="formInline.date"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="15">
      <el-upload
        class="upload-demo"
        drag
        action="/certificateAuthentication/upload"
        :http-request="uoload"
        accept=".png, .jpg, .gif"
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

    <!-- <pan-thumb :image="image" /> -->

    <el-row>
      <el-col :span="8" v-for="data in certificateData" :key="data.id" :offset="2">
        <el-card :body-style="{ padding: '0px' }">
          <!-- <img :src="data.imgUrl" class="image"> -->
          <el-avatar shape="square" :size="200" fit="fill" :src="data.imgUrl"></el-avatar>
          <div style="padding: 14px;">
            <span>{{data.file_name}}</span>
            <div class="bottom clearfix">
              <time class="time">{{data.upload_time}}</time>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-pagination
      
      :current-page="currentPage"
      :page-sizes="[6, 12, 18, 100]"
      :page-size="6"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PanThumb from "@/components/PanThumb/index.vue";
import {
  getCertificate,
  uploadFile
} from "@/api/personal/personal-view/certificateAuthentication";
import { qiniuUrl } from "@/api/common";

@Component({
  name: "certificateAuthentication",
  components: {
    PanThumb
  }
})
export default class extends Vue {
  private certificateData = [];
  private image =
    "https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191";
    public userLocal: any = localStorage.getItem("user")
  private currentPage = 1; //当前页码
  private total = 0; //查出来这个条件全部多少条
  formInline = {
    fileName: "",
    date: ""
  };
  pickerOptions = {
    shortcuts: [
      {
        text: "最近一周",
        onClick(picker: any) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          picker.$emit("pick", [start, end]);
        }
      },
      {
        text: "最近一个月",
        onClick(picker: any) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
          picker.$emit("pick", [start, end]);
        }
      },
      {
        text: "最近三个月",
        onClick(picker: any) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
          picker.$emit("pick", [start, end]);
        }
      }
    ]
  };

  created() {
    this.initPhoto();
  }

  private async onSubmit() {
    // console.log(this.formInline);
    
    const { data } = await getCertificate({
      username: JSON.parse(this.userLocal).username,
      pageNum: this.currentPage,
      form: this.formInline
    });
    
    this.$message({
      message: "查询成功",
      type: "success"
    });
    data.data.forEach((element: any) => {
      element.imgUrl = qiniuUrl + element.file_key;
    });

    this.total = data.total;
    this.certificateData = data.data;
  }

  private async initPhoto() {
    const { data } = await getCertificate({
      username: JSON.parse(this.userLocal).username,
      pageNum: this.currentPage
    });

    data.data.forEach((element: any) => {
      element.imgUrl = qiniuUrl + element.file_key;
    });
    this.total = data.total;
    this.certificateData = data.data;
  }

  private async uoload(e: any) {
    const param = new FormData();
    param.append("username", JSON.parse(this.userLocal).username);
    param.append("file", e.file);

    await uploadFile(param);

    this.$message({
      message: "上传成功",
      type: "success"
    });
    this.initPhoto();
  }

  // 文件上传之前做处理
  private beforeAvatarUpload(file: any) {
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

  private handleSizeChange(val: number) {
    console.log(`每页 ${val} 条`);
  }
  private handleCurrentChange(val: number) {
    console.log(`当前页: ${val}`);
    this.currentPage = val;
    this.initPhoto();
  }
}
</script>

<style lang="scss" scoped >
.upload {
  padding: 4px 10px;
  height: 20px;
  line-height: 20px;
  position: relative;
  text-decoration: none;
  color: #4d90d3;
  cursor: pointer;
}
.replyFileid {
  width: 100%;
  position: absolute;
  overflow: hidden;
  right: 0;
  top: 0;
  filter: alpha(opacity=0);
  -moz-opacity: 0;
  -khtml-opacity: 0;
  opacity: 0;
  cursor: pointer;
}
.upload span {
  color: #999;
  cursor: pointer;
}

.app-container {
  padding: 0;
  text-align: center;
  line-height: 37px;
}
#sendAppealForm {
  max-height: 150px;
  overflow-y: scroll;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
</style>
