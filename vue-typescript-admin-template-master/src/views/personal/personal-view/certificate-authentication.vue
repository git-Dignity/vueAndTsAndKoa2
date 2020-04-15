<template>
  <div class="app-container">
    <el-row :gutter="15">
      <el-upload
        class="upload-demo"
        drag
        action="/certificateAuthentication/upload"
        :http-request="uoload"
        accept=".png,.jpg,.gif"
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
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="6"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PanThumb from "@/components/PanThumb/index.vue";
import { UserModule } from "@/store/modules/user";
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
   private currentPage =  1;    //当前页码
   private total = 0;    //全部多少条


  created() {
    this.initPhoto();
  }

  private async initPhoto() {
    const { data } = await getCertificate({
      username: UserModule.name,
      pageNum: this.currentPage
    });
    
    data.data.forEach((element: any) => {
      element.imgUrl = qiniuUrl + element.file_key;
    });
    this.total = data.total
    this.certificateData = data.data;
  }


  private async uoload(e: any) {
    const param = new FormData();
    param.append("username", UserModule.name);
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
        if (file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png' && file.type !== 'image/gif') {
          this.$message.error('只能上传图片格式文件!');
          return false;
        }
        // 图片大小
        if (!isLt20M) {
          this.$message.error('上传头像图片大小不能超过 20MB!');
          return false;
        }
      }

     private handleSizeChange(val: number) {
        console.log(`每页 ${val} 条`);
      }
    private  handleCurrentChange(val: number) {
        console.log(`当前页: ${val}`);
        this.currentPage = val
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
