 <template>
  <div class="app-container">
    <el-row>
      <!-- <el-button type="primary" @click="refresh">刷新</el-button> -->
    </el-row>
    <el-row class="lyric-content">
      <el-input type="textarea"  v-html="input_lyric" autosize></el-input>

      <!-- <div v-for="lyric in singerData.lyric" :key="lyric.time">
        <p v-if="lyric.class">
          <span style="color:red">{{lyric.text}}</span>
        </p>
        <p v-else>
          <span >{{lyric.text}}</span>
        </p>
      </div>-->
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Form } from "element-ui";
import { cloneDeep } from "lodash";
import {
  getSongLyric,
  getArtistList,
  getArtistTopSong,
  getSongUrl,
  getLyric
} from "@/api/music/singer/lyric";
import { MusicModule } from "@/store/modules/music";
import Lyric from "lrc-file-parser"; 

@Component({
  name: "song-lyric"
})
export default class extends Vue {
  private musicData = [];
  private singerData = {
    singerName: "",
    songName: "",
    lyric: []
  };

  input_lyric = "";

  timer: any = "";
  lrc:any = []

  mounted() {
    //  this.timer =  setInterval(this.move,300);

   
  }

  created() {
    // console.log("created-测试");
    this.singerData = {
      singerName: this.$route.query.singerName + "",
      songName: this.$route.query.songName + "",
      lyric: []
    };
    this.init();
     this.timer = setInterval(() => {
      this.move();
    }, 300);
  }

  move() {
    // console.log("你怎么you");
    const elTextarea = <HTMLElement>document.querySelector(".el-textarea");
    const lyricContent = <HTMLElement>document.querySelector(".lyric-content");

    if (lyricContent.scrollTop >= elTextarea.offsetHeight) {
      lyricContent.scrollTop = 0;
    } else {
      lyricContent.scrollTop = lyricContent.scrollTop + 5;
    }
  }

  async init() {
    getSongLyric({
      type: -1,
      area: 7,
      limit: 100,
      singerName: this.$route.query.singerName,
      songName: this.$route.query.songName
    }).then((res: any) => {
      var _this = this;
      console.log(res.lrc);
      // this.singerData.lyric = res.lrc.lyric;

      this.lrc = new Lyric({
        onPlay: function(line: number, text: string) {
          // 歌词播放时的回调
          // console.log(line, text); // line 是当前播放行, text 是当前播放的歌词

          if(_this.singerData.lyric.length<line+2){
            clearInterval(_this.timer)
          }
         

          _this.input_lyric = _this.input_lyric.replace("active-lyric", "");

          _this.input_lyric += `
          <p class="active-lyric">${text}</p>
          `;

          // console.log(_this.singerData.lyric);
        },
        onSetLyric: function(lines: any) {
          // 监听歌词设置事件。当设置歌词时，歌词解析完毕会触发此回调。
          // console.log(lines); // lines 是一个数组[{time,text}]，里面包含播放时间及对应的歌词文本。
          _this.singerData.lyric = lines;
          // console.log(_this.singerData.lyric);
        },
        offset: 150 // 歌词偏移时间单位毫秒, 默认 150 ms
      });

      this.lrc.setLyric(res.lrc.lyric); // 设置歌词，此处传入lrc文件的文本内容
      // 注意：设置歌词将自动暂停歌词播放
      this.lrc.play(0); // 播放歌词，传入开始播放时间，30000是播放时间，单位：ms
      // lrc.pause(); // 暂停播放歌词
    });
  }

  beforeDestroy() {
    //清除定时器
    clearInterval(this.timer);
    this.lrc.pause();
    // console.log("beforeDestroy");
  }

  refresh() {
   
  }
}
</script>

<style  scope>
.lyric-content {
  width: 100%;
  /* height: 200px; */
  height: 80vh;
  overflow: scroll;
  background-image: radial-gradient(circle at 20% 20%, #99cccc, #7171b7);
  text-align: center;
}
.active-lyric {
  color: white;
  font-size: 24px;
}
</style>





// 前端LRC歌词解析播放插件:https://segmentfault.com/a/1190000018789057