<template>
  <div>
    <div
      class="el-icon-service"
      icon="el-icon-search"
      :style="{animation: audioani}"
      @click="audioshow = !audioshow"
    />

    <div
      v-show="audioshow"
      id="containe_audio"
      class="vueAudio"
    >
      <!-- <div v-for="(item, index) in item" :key="index" v-show="audioshow" class="vueAudio"> -->
      <VueAudio
        :the-url="item.url"
        :the-control-list="item.controlList"
        :the-singer-name="item.singerName"
        :the-upload-time="item.uploadTime"
        :the-song-name="item.songName"
        @musicClose="closeMusic"
        @audioState="audioState($event)"
        @onTimeupdate="onTimeupdate"
        @playAll="playAll"
        @playSingle="playSingle"
      />
      <!-- </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Form } from "element-ui";
import { cloneDeep } from "lodash";
import { getMusic } from "@/api/music/index";
import QS from "qs";
import vm from "Vue";

import { MusicModule } from "@/store/modules/music";
import VueAudio from "@/components/Music/VueAudio.vue";

@Component({
  name: "music-player",
  components: {
    VueAudio
  }
})
export default class extends Vue {
  public item =
    {
      url: "https://zhengzemin.cn/nodeJs/audio/%E7%96%AF%E4%BA%BA%E9%99%A2.mp3",
      controlList: "onlyOnePlaying",
      singerName: "华晨宇",
      songName: "疯人院",
      uploadTime: "2019/05/20"
    };

  // private item = [
  //   {
  //     url: "https://zhengzemin.cn/nodeJs/audio/%E7%96%AF%E4%BA%BA%E9%99%A2.mp3",
  //     controlList: "onlyOnePlaying",
  //     uploader: "周杰伦",
  //     uploadTime: "2019/05/20"
  //   }
  // ];
  private audioshow = false;
  private audioani = "";
  private isAllOrSingle = 1; // 随机播放
  private audioIndex = 1; // 当前的歌曲在vuex的audiosPage排在第几位
  private audioRandomIndex = 1;
  private asd = [
    {
      url: "./../../static/audio/gs.mp3",
      controlList: "onlyOnePlaying",
      uploader: "周杰伦",
      uploadTime: "2019/05/20"
    },
    {
      url: "./../../static/audio/1.mp3",
      controlList: "onlyOnePlaying",
      uploader: "12",
      uploadTime: "2019/05/203"
    }
  ];

  created() {
    // console.log(MusicModule);
  }

  get musicp() {
    return MusicModule.musicPage;
  }

  get musicItem() {
    return this.item;
  }

  @Watch("musicItem")
  private musicItemChange(data: any) {
    console.log("159" + data);
  }

  @Watch("musicp")
  private onRoutesChange(data: any) {
    console.log(data);
    // console.log(this.item)
    // console.log('----')
    // let containeAudio: any = document.getElementById("containe_audio");

    // for (var i = 0; i < containeAudio.childNodes.length; i++) {
    //   containeAudio.removeChild(containeAudio.childNodes[i]);
    // }

    this.item = {
        url: data.url,
      controlList: "onlyOnePlaying",
      singerName: data.singerName,
      songName: data.songName,
      uploadTime: "2019/05/20"
    };

// 动态组件  v-show也可以实现  相当于重新渲染组件
    // this.audioshow = !this.audioshow

    // this.item.push({
    //   url: data.url,
    //   controlList: "onlyOnePlaying",
    //   singerName: data.singerName,
    //   songName: data.songName,
    //   uploadTime: "2019/05/20"
    // });

    //  this.$set(this.item,'url',data.url);

      // this.item.url= data.url;
    //  this.item = Object.assign({}, this.item)

    // vm.set(this.item,'url', data.url);
    // this.url = data.url;
    // console.log(this.url)
    // this.$store.commit("SET_MUSIC_URL", data.url);

    // this.item = {
    //   url: data.url,
    //   controlList: "onlyOnePlaying",
    //   uploader: data.uploader,
    //   uploadTime: "2019/05/20"
    // };
    console.log(this.item);
  }

  // musicPage() {
  //   console.log(this.$store.state.musicPage);
  //   return this.$store.state.musicPage;
  // }

  /**
   * 因为有时候播放播着就 this.$store.state.music.musicPage为空
   * 因为用户刷新页面，所以store为空
   * 所以歌曲播完，发现store的musicPage为空，就重新获取set进去state
   */
  async initAudiosPage() {
    const data: any = await getMusic(
      QS.stringify({
        singerName: this.$route.query.singerName + "",
        current: 1,
        size: 6
      })
    );

    data[1].records.forEach((element: any) => {
      element.play = false;
    });

    await MusicModule.AudiosPage(data[1].records);
  }

  closeMusic(data: string) {
    // console.log(data)
    if (data === "0") {
      this.audioshow = !this.audioshow;
    }
    // console.log(data);
  }

  async audioState(data: string) {
    //  console.log(data)
    // console.log(this.$store.state.music.musicPage)
    if (data === "play") {
      this.audioani = "audioani 3s ease infinite";
    } else {
      this.$store.commit("SET_MUSIC_STATE", false);
      // await MusicModule.MusicPage({
      //   url: this.item[this.item.length-1].url,
      //   uploader: this.item[this.item.length-1].uploader,
      //   play:false
      // });

      this.audioani = "";
    }
  }

  random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  findThisAudioIndex() {
    return this.$store.state.music.audiosPage.findIndex(
      (n: any) => n.musicUrl === this.$store.state.music.musicPage.song_url
    );
  }

  private audioRandomIsThisAudio(
    audioRandomIndex: number,
    thisAudioIndex: number
  ) {
    return audioRandomIndex === thisAudioIndex
      ? (this.audioRandomIsThisAudio as any)(
          this.random(0, this.$store.state.music.audiosPage.length),
          thisAudioIndex
        )
      : audioRandomIndex;

    // if (audioRandomIndex === thisAudioIndex) {
    //   return this.audioRandomIsThisAudio(
    //     this.random(0, this.$store.state.music.audiosPage.length),
    //     thisAudioIndex
    //   );
    // } else {
    //   return audioRandomIndex;
    // }
  }

  async onTimeupdate(data: any) {
    // 发现有些歌曲播放完，并不会自动下一曲，然后就不播放了
    // 一开始以为等于100就是这首歌曲播完了，结果有些歌曲是不会刚好等于100，如：99、101直接跳过100
    // 那就写大于等于100就好了
    if (data >= 100) {
      // console.log(this.isAllOrSingle);
      // 如果发现audiosPage为空，则初始化重新赋值（因为刷新，所以state为空）
      if (this.$store.state.music.audiosPage.length === 0) {
        console.log("audiosPage为空");
        this.initAudiosPage();
      }

      if (this.isAllOrSingle === 1) {
        this.findThisAudioIndex();
        // console.log(this.audioIndex);
        this.audioRandomIndex = this.random(
          0,
          this.$store.state.music.audiosPage.length
        );
        // 使用递归，这样才不会当前播放和下一曲的索引会相同
        this.audioRandomIndex = this.audioRandomIsThisAudio(
          this.audioRandomIndex,
          this.findThisAudioIndex()
        );

        // console.log(this.findThisAudioIndex());
        // console.log(this.$store.state.music.audiosPage);
        console.log(this.$store.state.music.audiosPage[this.audioRandomIndex]);
        const currentAudio = this.$store.state.music.audiosPage[this.audioRandomIndex];
        if (!currentAudio) return;
        await MusicModule.MusicPage({
          url: currentAudio.song_url,
          singerName: currentAudio.singerName,
          songName: currentAudio.singerSongName,
          play: true
        });
        // // this.$store.commit(
        // //   "musicPage",
        // //   this.$store.state.audiosPage[this.audioRandomIndex]
        // // );
        // console.log(this.$store.state.music.musicPage);
      } else if (this.isAllOrSingle === 2) {
        // console.log(this.item[1])
        //  console.log(this.$store.state.musicPage)
        // console.log(MusicModule.musicPage);

        // 为什么要使用定时器，因为在data为100的时候，就是一首歌唱完了，然后他100，会出打印两次，
        // 进度条不是说，每加1就打印一次，可能会打印两次，就会报下面这个错
        // 未捕获（按承诺）DOMException：play（）请求被对pause（）的调用中断了
        // 我有音乐视频播放器。但是，当我改变质量时，它给出了这个错误
        // 意思就是开始播放，然后之后又来一次，被中段了，就会歌在放，下面的操作就操作不了
        setTimeout(async () => {
          await MusicModule.MusicPage({
            url: MusicModule.musicPage.url,
            singerName: MusicModule.musicPage.singerName,
            songName: MusicModule.musicPage.songName,
            play: true
          });
        }, 1000);

        // this.$store.commit("musicPage", this.$store.state.musicPage);
      }
    }
  }

  // 随机播放
  async playAll(data: any) {
    // 1
    this.isAllOrSingle = data;
    await MusicModule.MusicPlayerState({
      isPlay: false,
      muted: false,
      speed: 1,
      volume: 100,
      playIsAll: false
    });
    // console.log(data)
  }

  // 单曲循环
  async playSingle(data: any) {
    // 2
    this.isAllOrSingle = data;
    await MusicModule.MusicPlayerState({
      isPlay: false,
      muted: false,
      speed: 1,
      volume: 100,
      playIsAll: true
    });
    // console.log(data);
  }
}
</script>

<style  scope>
.el-icon-service {
  color: #d81e06;
  font-size: 28px;
  position: fixed;
  right: 1%;
  top: 48%;
  z-index: 101;
  filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5));
  border-radius: 100%;
  /* -webkit-animation: audioani 2s linear infinite; */
}
@keyframes audioani {
  0% {
    filter: drop-shadow(0 0 0px #ff8329);
    /* box-shadow: 0 0 0px #ff8329 */
  }
  25% {
    filter: drop-shadow(10px 10px 5px #ff8329);
    /* box-shadow: 0 0 5px #ff8329 */
  }
  50% {
    filter: drop-shadow(10px 10px 10px #ff8329);
    /* box-shadow: 0 0 10px #ff8329 */
  }
  75% {
    filter: drop-shadow(10px 10px 5px #ff8329);
    /* box-shadow: 0 0 5px #ff8329 */
  }
  100% {
    filter: drop-shadow(0 0 0px #ff8329);
    /* box-shadow: 0 0 0px #ff8329 */
  }
}

.vueAudio {
  position: fixed;
  z-index: 102;
  bottom: 0%;
  left: 30%;
  overflow: auto;
  box-shadow: 0 -2px 12px 1px rgba(0, 0, 0, 0.1);
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  background: #fcfcfc;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
