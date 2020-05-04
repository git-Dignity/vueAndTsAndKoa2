<!--https://github.com/wangduanduan/element-audio-->
<template>
  <!--    v-loading="audio.waiting"-->
  <div class="di main-wrap">
    <!-- 这里设置了ref属性后，在vue组件中，就可以用this.$refs.audio来访问该dom元素 -->
    <audio
      ref="audio"
      class="dn"
      :src="url"
      :preload="audio.preload"
      @play="onPlay"
      @error="onError"
      @pause="onPause"
      @timeupdate="onTimeupdate"
      @loadedmetadata="onLoadedmetadata"
    ></audio>
    <!--      @waiting="onWaiting"-->

    <!-- 音频播放控件 -->
    <div>
      <i class="el-icon-circle-close" v-on:click.prevent="close()"></i>
      <fieldset class="layui-elem-field layui-field-title">
        <legend>
          <div style="font-family:Hiragino Sans GB;font-weight:bold;display:flex;">
            <div style="font-size:22px;">{{songName}}</div>&nbsp; - &nbsp;
            <div style="font-size:18px;">{{singerName}}</div>
            <!-- <div style="font-size:14px;">{{uploadTime}}</div> -->
          </div>
        </legend>
        
      </fieldset>

      <blockquote class="layui-elem-quote layui-quote-nm">
        <el-button type="text" @click="startPlayOrPause">{{audio.playing | transPlayPause}}</el-button>

        <el-tag type="info">{{ audio.currentTime | formatSecond}}</el-tag>

        <!--     进度条ui-->
        <el-slider
          v-show="!controlList.noProcess"
          v-model="sliderTime"
          :format-tooltip="formatProcessToolTip"
          @change="changeCurrentTime"
          class="slider"
        ></el-slider>

        <el-tag type="info">{{ audio.maxTime | formatSecond }}</el-tag>

        <el-button
          v-show="!controlList.noSpeed"
          type="text"
          @click="changeSpeed"
        >{{audio.speed | transSpeed}}</el-button>

        <el-button
          v-show="!controlList.noMuted"
          type="text"
          @click="startMutedOrNot"
        >{{audio.muted | transMutedOrNot}}</el-button>

        <el-slider
          v-show="!controlList.noVolume"
          v-model="volume"
          :format-tooltip="formatVolumeToolTip"
          @change="changeVolume"
          class="slider"
        ></el-slider>

        <el-button
          v-if="disPlayIsAllBtn"
          style="margin:0 20px"
          type="text"
          @click="AllPlayOrSingle"
        >{{playIsAll | allOrSingle}}</el-button>

        <a
          :href="url"
          v-show="!controlList.noDownload"
          target="_blank"
          title="下载"
          download
        >
          <i class="el-icon-download"></i>
        </a>
      </blockquote>
    </div>
  </div>
</template>



<script>
// 整数格式化成时:分:秒
function realFormatSecond(second) {
  var secondType = typeof second;

  if (secondType === "number" || secondType === "string") {
    second = parseInt(second);

    var hours = Math.floor(second / 3600);
    second = second - hours * 3600;
    var mimute = Math.floor(second / 60);
    second = second - mimute * 60;

    return (
      hours + ":" + ("0" + mimute).slice(-2) + ":" + ("0" + second).slice(-2)
    );
  } else {
    return "0:00:00";
  }
}

export default {
  props: {
    theUrl: {
      type: String,
      required: true
    },
    theSpeeds: {
      type: Array,
      default() {
        return [1, 1.5, 2];
      }
    },
    theControlList: {
      type: String,
      default: "onlyOnePlaying"
    },
    theUploader: {
      type: String,
      default: ""
    },
    theSingerName: {
      type: String,
      default: ""
    },
    theSongName: {
      type: String,
      default: ""
    }
  },
  name: "VueAudio",
  data() {
    return {
      songName: this.theSongName || "",
      uploadTime: this.theUploadTime || "admin",
      singerName: this.theSingerName,
      url: this.theUrl || "http://devtest.qiniudn.com/secret base~.mp3",
      audio: {
        currentTime: 0, // 音频当前播放时长
        maxTime: 0, // 音频最大播放时长
        playing: false, // 该字段是音频是否处于播放状态的属性
        muted: false, // 音频静音控制
        speed: 1,
        waiting: true,
        preload: "auto" // 自动优化下载整个流文件
      },

      sliderTime: 0,
      volume: 100, // 音频音量控制
      speeds: this.theSpeeds,

      playIsAll: false, //随机或者单曲
      disPlayIsAllBtn: true, //是否显示随机按钮

      controlList: {
        // 不显示下载
        noDownload: false,
        // 不显示静音
        noMuted: false,
        // 不显示音量条
        noVolume: false,
        // 不显示进度条
        noProcess: false,
        // 只能播放一个
        onlyOnePlaying: false,
        // 不要快进按钮
        noSpeed: false
      }
    };
  },
  created() {
    // console.log(this.$store.state)
    // console.log(this.audioName)

    //显示歌曲名字
    // if (this.url != null || this.url != "") {
    //   this.audioName = this.url.substring(this.url.lastIndexOf("/") + 1);

    //   this.audioName = this.audioName.substring(
    //     0,
    //     this.audioName.lastIndexOf(".")
    //   );
    // }

    this.setControlList();
    if (this.url == "https://zhengzemin.cn/nodeJs/audio/说好不哭-周杰伦.m4a") {
      this.disPlayIsAllBtn = false;
    }
  },
  // computed: {
  //   getUrl() {
  //     return this.$store.state.music.url;
  //   }
  // },
  // watch: {
  //   getUrl: function(nl, ol) {
  //     this.url = nl;
  //     console.log(this.url,'-----')
  //     // this.startPlayOrPause()

  //     // this.setControlList();
  //     // this.startPlay();
  //     // this.$refs.audio.play();

  //     this.$refs.audio.play();

  //   }
  // },
  methods: {
    setControlList() {
      let controlList = this.theControlList.split(" ");
      controlList.forEach(item => {
        if (this.controlList[item] !== undefined) {
          this.controlList[item] = true;
        }
      });
    },
    // 快进
    changeSpeed() {
      let index = this.speeds.indexOf(this.audio.speed) + 1;
      this.audio.speed = this.speeds[index % this.speeds.length];
      /*
            console.log(index,this.audio.speed);
             1 1.5
             2 2
             3 1
             1 1.5
             2 2
             3 1
         */
      this.$refs.audio.playbackRate = this.audio.speed; // playbackRate 音频播放速度控制
    },
    startMutedOrNot() {
      this.$refs.audio.muted = !this.$refs.audio.muted;
      this.audio.muted = this.$refs.audio.muted;
    },
    // 音量条toolTip
    // 进度条格式化toolTip
    formatVolumeToolTip(index) {
      return "音量条: " + index;
    },
    // 进度条toolTip
    formatProcessToolTip(index = 0) {
      index = parseInt((this.audio.maxTime / 100) * index);
      return "进度条: " + realFormatSecond(index);
    },
    // 音量改变
    changeVolume(index = 0) {
      this.$refs.audio.volume = index / 100;
      this.volume = index;
    },
    // 播放跳转
    // 拖动进度条，改变当前时间，index是进度条改变时的回调函数的参数0-100之间，需要换算成实际时间
    changeCurrentTime(index) {
      this.$refs.audio.currentTime = parseInt(
        (index / 100) * this.audio.maxTime
      );
    },
    startPlayOrPause() {
      return this.audio.playing ? this.pausePlay() : this.startPlay();
    },
    AllPlayOrSingle() {
      return this.playIsAll ? this.playAll() : this.playSingle();
    },
    // 开始播放

    startPlay() {
      this.$refs.audio.play();
      this.$emit("audioState", "play");
      console.log("开始播放");
    },
    // 暂停
    pausePlay() {
      this.$refs.audio.pause();
      this.$emit("audioState", "pause");
      console.log("暂停");
    },
    // 当音频暂停
    onPause() {
      this.audio.playing = false;
      this.$emit("audioState", "pause");
    },
    // 当发生错误, 就出现loading状态
    onError() {
      this.audio.waiting = false; //false
      console.log("当发生错误, 就出现loading状态");
      this.$emit("audioState", "pause");
    },
    // 当音频开始等待
    onWaiting(res) {
      console.log(res);
      this.$emit("audioState", "pause");
    },
    // 当音频开始播放
    onPlay(res) {
      // console.log(res)
      this.audio.playing = true;
      this.audio.loading = false;

      if (!this.controlList.onlyOnePlaying) {
        return;
      }

      let target = res.target;

      let audios = document.getElementsByTagName("audio");
      // 如果设置了排他性，当前音频播放是，其他音频都要暂停       [...audios]可以把一个类数组转化成数组   就是我全部的音频的数组
      [...audios].forEach(item => {
        if (item !== target) {
          //暂停别的歌
          item.pause();
        }
      });
    },
    // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
    // 当音频当前时间改变后，进度条也要改变
    onTimeupdate(res) {
      // 获取音频的当前播放时间
      // console.log('timeupdate')
      // console.log(res)
      this.audio.currentTime = res.target.currentTime;
      this.sliderTime = parseInt(
        (this.audio.currentTime / this.audio.maxTime) * 100
      );
      // playIsAll单曲循环、播放中、this.sliderTime是100
      if (
        this.playIsAll &&
        this.$refs.audio.paused &&
        this.sliderTime === 100
      ) {
        this.$refs.audio.play();
      }
      this.$emit("onTimeupdate", this.sliderTime);
    },
    // 当加载语音流元数据完成后，会触发该事件的回调函数
    // 语音元数据主要是语音的长度之类的数据
    onLoadedmetadata(res) {
      // 获取音频总时长
      // console.log('loadedmetadata')
      //  console.log(res)    //可以打开看看
      this.audio.waiting = true; // false
      this.audio.maxTime = parseInt(res.target.duration);
    },
    close() {
      this.$emit("musicClose", "0");
    },
    //播放全部
    playAll() {
      this.playIsAll = false;
      // console.log('all')
      this.$emit("playAll", 1);
    },
    //单曲
    playSingle() {
      this.playIsAll = true;
      // console.log('single');
      this.$emit("playSingle", 2);
    }
  },
  filters: {
    // 将整数转化成时分秒
    formatSecond(second = 0) {
      return realFormatSecond(second);
    },
    // 使用组件过滤器来动态改变按钮的显示
    transPlayPause(value) {
      return value ? "暂停" : "播放";
    },
    transMutedOrNot(value) {
      return value ? "放音" : "静音";
    },
    transSpeed(value) {
      return "快进: x" + value;
    },
    allOrSingle(value) {
      return value ? "随机" : "单曲";
    }
  },
  mounted() {
    // console.log(this.url)
    // console.log('dy')

    this.$refs.audio.play();

    let target = this.$refs.audio;

    let audios = document.getElementsByTagName("audio");
    // 如果设置了排他性，当前音频播放是，其他音频都要暂停       [...audios]可以把一个类数组转化成数组   就是我全部的音频的数组
    [...audios].forEach(item => {
      if (item !== target) {
        //暂停别的歌
        item.pause();
      }
    });

    // 判断音乐是否在播放
    if (this.$refs.audio.paused) {
      this.$emit("audioState", "pause");
    } else {
      this.$emit("audioState", "play");
    }

    // console.log('音乐燥起来');
  }
};
</script>


<style scoped>
.main-wrap {
  padding: 10px 15px;
}
.slider {
  display: inline-block;
  width: 85px;
  position: relative;
  top: 14px;
  margin-left: 15px;
}

.di {
  display: inline-block;
}


.dn {
  display: none;
}
.el-icon-circle-close {
  display: flex;
  color: red;
  justify-content: flex-end;
  margin:5px 8px 8px 0;
  font-size: 22px;
}
</style>
