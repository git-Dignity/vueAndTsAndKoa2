<template>
  <div class="app-container">
    <el-collapse accordion v-permission="['admin']">
      <el-collapse-item>
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
          <UploadFile
            :childrenUploadFileData="childrenUploadImgData"
            @parentUploadFileData="parentUploadImgData"
          ></UploadFile>
          <!-- <el-upload
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
            <i v-else class="el-icon-plus f28 avatar-uploader-icon"></i>
          </el-upload>-->
        </el-row>
      </el-collapse-item>
    </el-collapse>

    <el-row>
      <el-col
        :span="5"
        v-for="(single, index) in singleList"
        :key="index"
        class="mb4 mt15 mb15"
        :offset="index%3 == 0 ? 1 : 2"
      >
        <div @mouseover="changeActive($event, index)" @mouseout="removeActive($event, index)">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{single.singerName}}</span>

              <!-- <div class="df " style="float: right; padding: 0"> -->
              <el-button-group class="fr">
                <el-button
                  type="primary"
                  icon="el-icon-thumb"
                  @click="photoEnter(single.singerName)"
                  size="mini"
                ></el-button>
                <el-button
                  type
                  icon="el-icon-edit"
                  v-permission="['admin']"
                  @click="singerEdit(single)"
                  size="mini"
                ></el-button>
                <el-button
                  type="danger"
                  @click="singerDel(single)"
                  icon="el-icon-delete"
                  v-permission="['admin']"
                  size="mini"
                ></el-button>

                <!-- <div class="">
                  <el-button
                    type="primary"
                    icon="el-icon-thumb"
                    circle
                    @click="photoEnter(single.singerName)"
                  ></el-button>
                </div>
                <div
                  class="btn-singer-edit "
                  :id="gernerateId(index, 'btnEdit')"
                  v-permission="['admin']"
                >
                  <el-button type="info" @click="singerEdit(single)" icon="el-icon-edit" circle></el-button>
                </div>
                <div
                  class="btn-singer-del "
                  :id="gernerateId(index, 'btnDel')"
                  v-permission="['admin']"
                >
                <el-button type="danger" @click="singerDel(single)" icon="el-icon-delete" circle></el-button>-->
                <!-- </div> -->
              </el-button-group>
              <!-- </div> -->
              <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
            </div>
            <el-avatar shape="square" :size="150" fit="fill" class="image" :src="single.fileUrl"></el-avatar>
          </el-card>
          <!-- <el-card :body-style="{ padding: '0px' }">
            <el-avatar shape="square" :size="150" fit="fill" class="image" :src="single.fileUrl"></el-avatar>
            <div style="padding: 14px;">
              <span>{{single.singerName}}</span>
              <div class="bottom mt12 fix">
                <time class="text-weak f14">{{ single.createDate }}</time>
                
              </div>
            </div>
            <div class="button-group df df-ac-jc">
            <div class="df2 ">
              <el-button type="primary" icon="el-icon-thumb" circle @click="photoEnter(single.singerName)"></el-button>
            </div>
            <div class="btn-singer-edit  df2" :id="gernerateId(index, 'btnEdit')" v-permission="['admin']">
              <el-button type="info" @click="singerEdit(single)" icon="el-icon-edit" circle></el-button>
            </div>
            <div class="btn-singer-del  df1" :id="gernerateId(index, 'btnDel')" v-permission="['admin']">
              <el-button type="danger" @click="singerDel(single)" icon="el-icon-delete" circle></el-button>
            </div>
            </div>
          </el-card>-->
        </div>
      </el-col>
    </el-row>

    <SingerDialog
      :childrenData="childrenDialogData"
      @update:parentDialogSubmit="parentDialogData"
      @update:parentDialogEditSubmit="parentDialogEditSubmit"
      @update:parentDialogEditCancel="parentDialogEditCancel"
    >
      <div slot="childTemplate">
        <EditSingerDialog :info="childrenDialogData.info" @singerDialogData="singerDialogData"></EditSingerDialog>
        <!-- <div v-html="childrenDialogData.template"></div> -->
      </div>
    </SingerDialog>

    <!-- <EditSingerDialog :id="tableKey"></EditSingerDialog>
    <button @click="next">下一个</button>-->
  </div>
</template>

<script lang="ts">
import { Component, ProvideReactive, Vue } from "vue-property-decorator";
import { Form } from "element-ui";
import { cloneDeep } from "lodash";
import { qiniuUrl } from "@/api/common";
import { UserModule } from "@/store/modules/user";
import {
  getSinger,
  uploadSinger,
  delSinger,
  editSinger
} from "@/api/music/singer/index";
import { Module } from "module";
import { EventBus } from "@/eventBus/index";
import { symbol } from "@/utils/symBol";
import UploadFile from "@/components/UploadFile/index";
import SingerDialog from "@/components/Dialog/index";
import qs from "qs";
import EditSingerDialog from "./components/EditSingerDialog";

function sss() {
  // console.log(12325624343234358);
}

@Component({
  name: "musicSinger",
  components: {
    UploadFile,
    SingerDialog,
    EditSingerDialog
  }
})
export default class extends Vue {
  private tableKey = 1;
  private currentDate = new Date();
  private singleList = [];
  private fileList: Array<any> = [];
  private imageUrl = "";

  private singerInfo = {
    singerName: ""
  };

  next() {
    ++this.tableKey;
  }

  gernerateId(index, name) {
    return name + "_" + index;
  }

  singerDialogData(data) {
    // console.log(data);
    // console.log(11134234321521);
    EventBus.$emit("singerDialogFile", data);
  }

  private editSingerDialogData = "";

  private centerDialogVisible = false;
  private childrenDialogData = {
    title: "是否删除该歌手照片",
    show: false,
    width: "20%",
    center: true,
    template: ``,
    info: [],
    type: "edit"
  };

  private childrenUploadImgData = {
    upload__text: "上传歌曲图片文件",
    type: "image_avatar",
    accept: ".png, .jpg, .gif, .jpeg"
  };

  // 为了避免命名冲突, 可以使用 ES6 的 Symbol 特性作为 key
  @ProvideReactive(symbol)
  private isClear = false;

  created() {
    this.init();
  }

  mounted() {}

  // 子组件给父组件传值
  parentUploadImgData(data: any) {
    this.fileList = data;
  }

  private async parentDialogEditSubmit(data: any) {
    console.log(data);

    const param = new FormData();
    param.append("info", JSON.stringify(data));
    param.append("fileType", "0");
    param.append("file", data.filess[0]);

    const result = await editSinger(param);
    console.log(result);
    EventBus.$emit("isShowDialog", true);
    if (result.Success == "true") {
      this.$message({
        message: "修改歌手信息成功",
        type: "success"
      });
      this.init();
    }
  }

  private parentDialogEditCancel(data: any) {
    // console.log(data);
    // (this as any).isCancel = data;
    EventBus.$emit("isCancel", data);
  }

  /**
   * 删除歌手图片
   */
  private async parentDialogData(isDialogSubmit: boolean) {
    if (isDialogSubmit) {
      if (
        (this.childrenDialogData.info as any).id &&
        (this.childrenDialogData.info as any).文件夹名字 &&
        (this.childrenDialogData.info as any).fileUrl
      ) {
        const data = await delSinger(
          qs.stringify({
            id: (this.childrenDialogData.info as any).id,
            bucketName: (this.childrenDialogData.info as any).文件夹名字,
            fileUrl: (this.childrenDialogData.info as any).fileUrl
          })
        );

        EventBus.$emit("isCloseDialog", true); // 关闭子组件对话框

        if (data[1]) {
          this.$message({
            message: "删除成功",
            type: "success"
          });

          this.init();
        }
      } else {
        this.$message.error("该歌手照片有误!");
      }
    }
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

  /**
   * 歌手图片编辑
   */
  private async singerEdit(single) {
    // console.log(single)
    this.childrenDialogData.info = single;
    this.childrenDialogData.title = "修改歌手照片信息";
    this.childrenDialogData.show = true;
    this.childrenDialogData.type = "edit";
    this.childrenDialogData.template = `
   <input type="button"  value="开启" onclick="aaa('abc');" />
     `;
    this.editSingerDialogData = `
   <button onClick = {this.aaa}>a8a5777a</button>
    `;
  }

  private async singerDel(single) {
    this.childrenDialogData.info = single;
    this.childrenDialogData.title = "是否删除该歌手照片";
    this.childrenDialogData.show = true;
    this.childrenDialogData.type = "del";
    this.childrenDialogData.template = `
      <p class="tc">${single.singerName}</p>
    `;
    this.editSingerDialogData = `
    <p class="tc">${single.singerName}</p>
    `;
  }

  private beforeAvatarUpload(file: any) {
    // console.log(111);
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
    // if (
    //   this.singerInfo.singerName != "" &&
    //   (this.$refs.upload as any).uploadFiles.length != 0
    // ) {
    //   (this.$refs.upload as any).submit();
    //   return;
    // }

    if (this.singerInfo.singerName != "" && this.fileList.length != 0) {
      this.uploadImg(this.fileList);
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
    const data: any = await getSinger({});
    console.log(data);
    // data.items.forEach((element: any) => {
    //   element.musicUrl = qiniuUrl + element.file_key;
    // });
    this.singleList = data[1].items;
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

  private async uploadImg(e: any) {
    // console.log(e);
    const param = new FormData();
    const dataInfo = Object.assign(
      { username: UserModule.name },
      this.singerInfo
    );
    param.append("info", JSON.stringify(dataInfo));
    param.append("fileType", "0");
    param.append("file", e.file);

    // await uploadSinger(param);
    uploadSinger(param)
      .then(res => {
        // console.log(res);
        this.$message({
          message: "上传成功",
          type: "success"
        });

        this.clearUploadData();

        this.init();
      })
      .catch(e => {
        console.log(e);
      });
  }

  changeActive($event, index) {
    // console.log($event)
    // $event.target.children[2].style.right = 0;
    // $event.currentTarget.className = "pr";
    // document.getElementById('btnEdit_' + index).style.display = 'inline-block';
    // document.getElementById('btnDel_' + index).style.display = 'inline-block';
  }
  removeActive($event, index) {
    // $event.currentTarget.className = "";
    // document.getElementById('btnEdit_' + index).style.display = 'none';
    // document.getElementById('btnDel_' + index).style.display = 'none';
  }

  // 清空上传组件数据
  clearUploadData() {
    (this as any).isClear = true;

    // 清除子组件uploadFile数据
    // EventBus.$emit("clear", true);
  }
}
</script>

<style  scope>
.bottom {
  line-height: 12px;
}
.image {
  width: 100%;
  height: 200px;
  display: block;
}

.button {
  padding: 0;
  float: right;
}
.btn-singer-del {
  /* display: inline-block;
  position: relative; */
  /* display:none; */
  /* left:  100px;
  bottom: 250px; */
}
.btn-singer-edit {
  /* display: inline-block;
  position: relative; */
  /* display:none; */
  /* left: -33px;
  bottom: 250px; */
}
.el-row::before,
.el-row::after {
  display: none;
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