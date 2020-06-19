<template>
  <div class="app-container">
    <el-row :gutter="15">
      <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
        <form id="sendAppealForm">
          <a href="javascript:void(0);" class="upload">
            选择文件111 >
            <span class="unfile">{{unfile}}</span>
            <input
              class="replyFileid"
              @change="getfilename($event)"
              name="appealFile"
              id="appealFile"
              type="file"
              accept="*"
              multiple="multiple"
            />
          </a>
        </form>
      </el-col>
      <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
        <div class="component-item">
          <el-button v-waves type="primary" v-on:click.prevent="uoload()">上传</el-button>
        </div>
      </el-col>
    </el-row>

    <!-- <pan-thumb :image="image" /> -->

    <el-row>
      <el-col :span="8" v-for="data in certificateData" :key="data.id" >
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PanThumb from "@/components/PanThumb/index.vue";
import { UserModule } from "@/store/modules/user";
import {
  getCertificate
} from "@/api/personal/personal-view/certificateAuthentication";
import { qiniuUrl } from "@/api/common";
import axios from 'axios';

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

  private filess: any;
  private unfile = "未选择任何文件";

  created() {
    this.initPhoto();
  }

  private async initPhoto() {
    // console.log(UserModule.name);
    let { data } = await getCertificate(UserModule.name);
    data.forEach((element: any) => {
      element.imgUrl = qiniuUrl + element.file_key;
    });
    // console.log(data);
    this.certificateData = data;
  }

  private getfilename(e: any) {
    this.filess = e.target.files;

    var _el = e.target.files;
    var _name = "";
    for (var i = 0; i < _el.length; i++) {
      if (i == _el.length - 1) {
        _name += _el[i].name;
      } else {
        _name += _el[i].name + "、";
      }
      this.unfile = _name;
    }
  }

  private async uoload() {
    if (!this.filess) {
      this.$message({
        message: "亲，请上传文件",
        type: "warning"
      });
    } else {
      let param = new FormData();
      param.append("username", UserModule.name);

      this.filess.forEach((element: any, index: number) => {
        param.append("file" + index, element);
      });

      this.uploadFile(param).then(res => {
        this.$message({
          message: "上传成功",
          type: "success"
        });
        this.initPhoto();
      });
    }
  }

  private uploadFile = (param: any) => {
    return new Promise((resolve, reject) => {
      axios
        .post("http://localhost:3333/certificateAuthentication/upload", param, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err.data);
        });
    });
  };
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
