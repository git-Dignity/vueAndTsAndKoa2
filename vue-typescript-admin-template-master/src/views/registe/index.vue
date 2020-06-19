<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">{{ $t('registe.title') }}</h3>
        <lang-select class="set-language" />
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon name="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          :placeholder="$t('login.username')"
          name="username"
          type="text"
          maxlength="10"
          show-word-limit
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon name="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            :placeholder="$t('login.password')"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :name="passwordType === 'password' ? 'eye-off' : 'eye-on'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-form-item prop="phone">
        <span class="svg-container">
          <i class="el-icon-phone" />
        </span>
        <el-input
          ref="phone"
          v-model="loginForm.phone"
          :placeholder="$t('registe.phone')"
          name="phone"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-form-item prop="postbox">
        <span class="svg-container">
          <svg-icon name="email" />
        </span>
        <el-input
          ref="postbox"
          v-model="loginForm.postbox"
          :placeholder="$t('registe.postbox')"
          name="postbox"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <!-- <form  id="sendAppealForm">
            <a href="javascript:void(0);" class="upload">选择文件 > <span class="unfile">未选择任何文件</span>
                 <input class="replyFileid"  name="appealFile" id="appealFile" type="file"  multiple="multiple"  />
            </a>
        </form> -->

      <el-form-item prop="photo">
        <span class="svg-container">
          <i class="el-icon-picture-outline" />
        </span>
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
      </el-form-item>

      <el-button
        type="danger"
        style="width:100%; margin-bottom:30px;"
        @click.native.prevent="handleRegiste"
      >{{ $t('registe.registeIn') }}</el-button>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Check } from "javascript-tool-class/src/App";
import { Component, Vue, Watch } from "vue-property-decorator";
import { Route } from "vue-router";
import { Dictionary } from "vue-router/types/router";
import { Form as ElForm, Input } from "element-ui";
import LangSelect from "@/components/LangSelect/index.vue";
import { register } from "@/api/users";
import axios from 'axios';

@Component({
  name: "Registe",
  components: {
    LangSelect
  }
})
export default class extends Vue {
  private validateUsername = (rule: any, value: string, callback: Function) => {
    if (value.length < 3) {
      callback(new Error("The username can not be less than 3 digits"));
    } else {
      callback();
    }
  };

  private validatePassword = (rule: any, value: string, callback: Function) => {
    if (value.length < 6) {
      callback(new Error("The password can not be less than 6 digits"));
    } else {
      callback();
    }
  };

  private validatePhone = (rule: any, value: string, callback: Function) => {
    if (!this.myCheck.isMPRelaxed(value)) {
      callback(new Error("The phone number is not valid"));
    } else {
      callback();
    }
  };

  private validatePostbox = (rule: any, value: string, callback: Function) => {
    if (!this.myCheck.isEmail(value)) {
      callback(new Error("Are you 确定是 yes postbox？？？"));
    } else {
      callback();
    }
  };

  imageUrl = "";
  public myCheck = new Check();

    private uploadFile = (param: any) => {
      console.log(param)
    return new Promise((resolve, reject) => {
      axios
        .post("http://localhost:3333/users/register", param, {
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

  private async uoload(e: any) {
    const param = new FormData();
    param.append("info", JSON.stringify(this.loginForm));
    param.append("file", e.file);

    const data: any = await register(param);
    // console.log(data);

    if (data.result.length !== 0) {
      this.$router.push({
        path: "/login",
        query: {}
      });

      this.$message({
        message: "注册成功",
        type: "success"
      });
    }
  }

  changeSingerImg(file: any) {
    //   console.log(file)
    this.imageUrl = URL.createObjectURL(file.raw);
    this.$message("歌手图片已选中");
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

  private loginForm = {
    username: "",
    password: "",
    phone: "",
    postbox: ""
  };

  private loginRules = {
    username: [{ validator: this.validateUsername, trigger: "blur" }],
    password: [{ validator: this.validatePassword, trigger: "blur" }],
    phone: [{ validator: this.validatePhone, trigger: "blur" }],
    postbox: [{ validator: this.validatePostbox, trigger: "blur" }]
  };

  private passwordType = "password";
  private loading = false;
  private showDialog = false;
  private capsTooltip = false;
  private redirect?: string;
  private otherQuery: Dictionary<string> = {};

  @Watch("$route", { immediate: true })
  private onRouteChange(route: Route) {
    // TODO: remove the "as Dictionary<string>" hack after v4 release for vue-router
    // See https://github.com/vuejs/vue-router/pull/2050 for details
    const query = route.query as Dictionary<string>;
    if (query) {
      this.redirect = query.redirect;
      this.otherQuery = this.getOtherQuery(query);
    }
  }

  mounted() {
    if (this.loginForm.username === "") {
      (this.$refs.username as Input).focus();
    } else if (this.loginForm.password === "") {
      (this.$refs.password as Input).focus();
    }
  }

  private checkCapslock(e: KeyboardEvent) {
    const { key } = e;
    this.capsTooltip =
      key !== null && key.length === 1 && key >= "A" && key <= "Z";
  }

  private showPwd() {
    if (this.passwordType === "") {
      this.passwordType = "";
    } else {
      this.passwordType = "password";
    }
    this.$nextTick(() => {
      (this.$refs.password as Input).focus();
    });
  }

  private handleRegiste() {
    //  var aaa: any = document.getElementById('sendAppealForm')
    //  var formData = new FormData(aaa);
  
    //             var myDate = new Date();  
    //             // formData.append("uploader", JSON.parse(localStorage.getItem("login")).username);    // 上传者
    //             formData.append("uploadTime", myDate.toLocaleDateString());       // 上传日期
              
              
    //             var _this = this;

    //            this.uploadFile(formData).then(res => {
    //               console.log(res);
    //             });

    (this.$refs.loginForm as ElForm).validate(async (valid: boolean) => {
      if (valid && (this.$refs.upload as any).uploadFiles.length !== 0) {
        (this.$refs.upload as any).submit();
      } else {
        this.$message.error("检查是否缺失参数!");
        return false;
      }
    });
  }

  private getOtherQuery(query: Dictionary<string>) {
    return Object.keys(query).reduce((acc, cur) => {
      if (cur !== "redirect") {
        acc[cur] = query[cur];
      }
      return acc;
    }, {} as Dictionary<string>);
  }
}
</script>

<style lang="scss">
// References: https://www.zhangxinxu.com/wordpress/2018/01/css-caret-color-first-line/
@supports (-webkit-mask: none) and (not (cater-color: $loginCursorColor)) {
  .login-container .el-input {
    input {
      color: $loginCursorColor;
    }
    input::first-line {
      color: $lightGray;
    }
  }
}

.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      height: 47px;
      background: transparent;
      border: 0px;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $lightGray;
      caret-color: $loginCursorColor;
      -webkit-appearance: none;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $loginBg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: $loginBg;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $darkGray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $lightGray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $darkGray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
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
  border: 1px solid;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
