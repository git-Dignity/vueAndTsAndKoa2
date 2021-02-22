<template>
  <div>
    <el-upload
      class="upload-demo"
      drag
      action="/music/upload"
      :http-request="filUpload"
      :file-list="fileList"
      :before-upload="beforeAvatarUpload"
      :on-change="handleFileChange"
      :on-success="handleFileSuccess"
      :accept="childrenUploadFileData.accept"
    >
      <div v-if="childrenUploadFileData.type==='image_avatar'">
        <img
          v-if="childrenUploadFileData.imageUrl"
          :src="childrenUploadFileData.imageUrl"
          class="avatar"
        >
        <i
          v-else
          class="el-icon-plus f28 avatar-uploader-icon"
        />
      </div>
      <div v-else>
        <i class="el-icon-upload" />
        <div class="el-upload__text">
          {{ childrenUploadFileData.upload__text }}
          <p />将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div
          slot="tip"
          class="el-upload__tip"
        >
          请上传{{ childrenUploadFileData.accept }}文件格式
        </div>
      </div>
    </el-upload>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  InjectReactive,
  Watch,
  Vue
} from "vue-property-decorator";
import { symbol } from "@/utils/symBol";
import { EventBus } from "@/eventBus/index";

@Component({
  name: "UploadFile"
})
export default class extends Vue {
  @Prop({
    type: Object,
    required: true,
    validator: t => {
      if (t.upload__text && t.type && t.accept) return true;
      console.error("请确定参数约束是否有误，可查看组件下面的说明");
      return false;
    }
    // default: () => {
    //   return {
    //     upload__text: "上传歌曲图片文件",
    //     type: "image",
    //     accept: ".png, .jpg, .gif, .jpeg"
    //   }
    // }
  })
  childrenUploadFileData!: object;

  @InjectReactive(symbol)
  private isClear!: boolean;

  private parentFileData: any = []; // 传递给父组件的文件数据
  private fileList: Array<any> = []; // 显示在组件的文件列表
  // private imageUrl = "";

  private async filUpload(e: any) {
    this.parentFileData = e;
  }

  // 显示在上传组件那的文件列表信息
  private handleFileChange(file: any, list: Array<any>) {
    if ((this.childrenUploadFileData as any).type == "image_avatar") {
      // this.imageUrl = URL.createObjectURL(file.raw);
      (this.childrenUploadFileData as any).imageUrl = URL.createObjectURL(file.raw);
    } else {
      this.fileList = list.length > 0 ? [list[list.length - 1]] : [];
    }
  }

  // 向父组件传值
  private handleFileSuccess(res: any) {
    this.$emit("parentUploadFileData", this.parentFileData);
  }

  private beforeAvatarUpload(file: any) {
    // 图片不允许超过20M，音乐不能超过100M
    //   console.log(file.size / 1024 / 1024)
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

  @Watch("isClear", { immediate: true, deep: true })
  onIsClear(newVal: string, oldVal: string) {
    // console.log((this as any).isClear);
    if ((this as any).isClear == true) {
      this.parentFileData = [];
      this.fileList = [];
      // this.imageUrl = "";
      (this.childrenUploadFileData as any).imageUrl = "";
    }
  }

  mounted() {
    // console.log((this as any).isClear);
    // if ((this as any).isClear == "true") {
    //   this.parentFileData = [];
    //   this.fileList = [];
    //   this.imageUrl = "";
    // }

    // EventBus.$on("clear", msg => {
    //   console.log(msg);
    //   if (msg) {
    //     this.parentFileData = [];
    //     this.fileList = [];
    //     this.imageUrl = "";
    //     // 用完之后便销毁
    //     EventBus.$off("clear", {});
    //   }
    // });
  }
}
</script>

<style lang="scss" scoped>
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
.el-collapse-item__wrap {
  padding: 10px;
}
 .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>

<!--

# UploadFile组件说明
这是一个二次封装饿了么的上传组件

## 示例代码

父组件
import UploadFile from "@/components/UploadFile/index";
@Component({
  name: "",
  components: {
    UploadFile
  }
})

<UploadFile
    :childrenUploadFileData="childrenUploadImgData"
    @parentUploadFileData="parentUploadImgData"
></UploadFile>

## 参数说明

// 父组件要给子组件传递的信息
private childrenUploadImgData = {
    upload__text: "上传歌曲图片文件",   // 这是组件的提示信息（必填）
    type: "image",                      // 上传文件类型（可传）
    accept: ".png, .jpg, .gif, .jpeg"   // 显示文件的类型（必填）
};

## 参数说明
childrenUploadImgData = {
    upload__text: "",
    type: 图片(image), 音乐(music), 视频(video)  ...
    accept = {
        image: ".png, .jpg, .gif, .jpeg",
        image_avatar: ".png, .jpg, .gif, .jpeg",    头像图片(单独做下处理)
        music: ".mp4, .m4a, .mp3, .flac, .wima",
        video: ".avi, .wmv, .mpg, .mpeg, .mov, .rm, .ram, .swf, .flv, .mp4"
    }
}

// 子组件给父组件传的选中的文件信息
parentUploadImgData(data: any) {
    this.file_list.songImgFile = data;
}

// 关于清除子组件数据
父组件
@ProvideReactive(s)
  private isClear = false
子组件
@InjectReactive(s)
  private isClear!: boolean;

父组件通过改变isClear的值，子组件通过@watch监听isClear值的变化而做清除数据操作

-->
