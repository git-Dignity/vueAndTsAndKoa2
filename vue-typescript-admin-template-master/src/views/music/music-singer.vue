<template>
  <div class="app-container">
    <el-collapse accordion v-permission="['admin']">
      <el-collapse-item>
        <template slot="title">
          歌手上传 &nbsp;
          <i class="el-icon-upload2"></i>
        </template>

        <el-row :gutter="20" type="flex" class="row-bg" justify="start">
          <el-col :span="6">
            <ElemenetForm :childrenFormData="singerInfo" @parentForm="parentForm"></ElemenetForm>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="onSubmit">上传</el-button>
          </el-col>
        </el-row>

        <el-row :gutter="20" type="flex" class="row-bg" justify="start">
          <el-col :span="6">
            <UploadFile
              :childrenUploadFileData="childrenUploadImgData"
              @parentUploadFileData="parentUploadImgData" 
            ></UploadFile>
          </el-col>
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
              </el-button-group>
            </div>
            <el-avatar shape="square" :size="150" fit="fill" class="image" :src="single.fileUrl"></el-avatar>
          </el-card>
        </div>
      </el-col>
    </el-row>

    <SingerDialog
      :childrenData="childrenDialogData"
      @update:parentDialogSubmit="parentDialogEditSubmit"
      @update:parentDialogCancel="parentDialogCancel"
    >
      <div slot="childTemplate">
        <EditSingerDialog :info="childrenDialogData.info" @singerDialogData="singerDialogData"></EditSingerDialog>
      </div>
    </SingerDialog>
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
import UploadFile from "@/components/UploadFile/index.vue";
import SingerDialog from "@/components/Dialog/index.vue";
import qs from "qs";
import EditSingerDialog from "./components/EditSingerDialog.vue";
import {
  MessageSuccess,
  MessageError,
  MesssageBoxQuestion
} from "@/utils/tool/message";
import ElemenetForm from "@/components/ElForm/index.vue";
import { singerInfo } from "./modules/music-singer/formData";
import { getFormValue, validateForm } from "@/utils/tool/form";

@Component({
  name: "musicSinger",
  components: {
    ElemenetForm,
    UploadFile,
    SingerDialog,
    EditSingerDialog
  }
})
export default class extends Vue {
  private refsForm = [];
  private singleList = [];
  private fileList: Array<any> = [];
  private singerInfo = singerInfo;
  private childrenDialogData = {
    title: "修改歌手照片信息",
    show: false,
    width: "20%",
    center: true,
    info: []
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

  private async init() {
    const { items } = await getSinger({});
    this.singleList = JSON.parse(items);
  }

  // 子组件给父组件传值
  private parentUploadImgData(data: any) {
    this.fileList = data;
  }

  private parentDialogCancel(data: any) {
    EventBus.$emit("isCancel", data);
  }

  private singerDialogData(data: any) {
    EventBus.$emit("parentDialogEmit", data);
  }

  private async parentDialogEditSubmit(data: any) {
    const param = new FormData();
    param.append("info", JSON.stringify(data));
    param.append("fileType", "0");
    param.append("file", data.filess[0]);

    const { Success } = await editSinger(param);

    EventBus.$emit("isShowDialog", true);
    if (Success == "true") {
      MessageSuccess("修改歌手信息成功!");
      this.init();
    }
  }

  private parentForm(data) {
    this.refsForm.push(data);
  }

  /**
   * 进入歌手清单
   * @param singerName: 歌手名
   */
  private photoEnter(singerName: string) {
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
  private async singerEdit(single: any) {
    // console.log(single)
    this.childrenDialogData.info = single;
    this.childrenDialogData.show = true;
  }

  /**
   * 删除歌手图片
   */
  private async singerDel({ id, 文件夹名字, fileUrl }) {
    MesssageBoxQuestion("是否删除该歌手照片,是否继续")
      .then(async () => {
        if (id && 文件夹名字 && fileUrl) {
          const { data } = await delSinger(
            qs.stringify({
              id: id,
              bucketName: 文件夹名字,
              fileUrl: fileUrl
            })
          );

          if (data === "true") {
            MessageSuccess("删除成功!");
            this.init();
          }
        } else {
          MessageError("该歌手照片有误!");
        }
      })
      .catch(() => {});
  }

  private async onSubmit() {
    if (
      !validateForm(this.refsForm).includes("false") &&
      getFormValue(this.singerInfo.info).singerName != "" &&
      this.fileList.length != 0
    ) {
      this.uploadImg(this.fileList);
      return;
    }
    MessageError("请检查上传参数是否齐全!");
  }

  private async uploadImg(e: any) {
    // console.log(e);
    const param = new FormData();
    const dataInfo = Object.assign(
      { username: UserModule.name },
      getFormValue(this.singerInfo.info)
    );
    param.append("info", JSON.stringify(dataInfo));
    param.append("fileType", "0");
    param.append("file", e.file);

    const { Success } = await uploadSinger(param);
    if (Success === "true") {
      MessageSuccess("上传成功!");
      this.clearUploadData();
      this.init();
    }
  }

  changeActive($event: any, index: number) {
    // console.log($event)
    // $event.target.children[2].style.right = 0;
    // $event.currentTarget.className = "pr";
    // document.getElementById('btnEdit_' + index).style.display = 'inline-block';
    // document.getElementById('btnDel_' + index).style.display = 'inline-block';
  }
  removeActive($event: any, index: number) {
    // $event.currentTarget.className = "";
    // document.getElementById('btnEdit_' + index).style.display = 'none';
    // document.getElementById('btnDel_' + index).style.display = 'none';
  }

  // 清空上传组件数据
  clearUploadData() {
    (this as any).isClear = true;
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