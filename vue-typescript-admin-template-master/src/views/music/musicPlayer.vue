 <template>
  <div class="app-container">
    <div
      class="iconfont zzm-bokeyinle"
      v-on:click="audioshow = !audioshow"
      :style="{animation:audioani}"
    ></div>

    <div id="test-audio">
      <div v-for="(item, index) in item" :key="index" v-show="audioshow" class="vueAudio">
        <VueAudio
          :theUrl="item.url"
          :theControlList="item.controlList"
          :theUploader="item.uploader"
          :theUploadTime="item.uploadTime"
          @musicClose="closeMusic"
          @audioState="audioState($event)"
          @onTimeupdate="onTimeupdate"
          @playAll="playAll"
          @playSingle="playSingle"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Form } from "element-ui";
import { cloneDeep } from "lodash";
import { MusicModule } from '@/store/modules/music'
import VueAudio from '@/components/Music/VueAudio.vue' 


@Component({
  name: "music-player",
  components: {
    VueAudio
  }
})
export default class extends Vue {
  private item =  [
        {
          url: "https://zhengzemin.cn/nodeJs/audio/说好不哭-周杰伦.m4a",
          controlList: "onlyOnePlaying",
          uploader: "周杰伦",
          uploadTime: "2019/05/20"
        }
      ]
    private  audioshow = false
    private  audioani =  ""
    private  isAllOrSingle= 2
    private  audioIndex= 1   //当前的歌曲在vuex的audiosPage排在第几位
    private  audioRandomIndex= 1
    private  asd = [
        {
          url:"./../../static/audio/gs.mp3",
          controlList: "onlyOnePlaying",
          uploader: "周杰伦",
          uploadTime: "2019/05/20"
        },
        {
          url:"./../../static/audio/1.mp3",
          controlList: "onlyOnePlaying",
          uploader: "12",
          uploadTime: "2019/05/203"
        }
      ]



  created() {
    console.log(MusicModule)
   
  }
musicPage() {
  console.log(this.$store.state.musicPage)
      return this.$store.state.musicPage; 
    }

  closeMusic(data) {
      if (data === "0") {
        this.audioshow = !this.audioshow;
      }
      // console.log(data);
    }
  private  audioState(data) {
      if (data === "play") {
        this.audioani = "audioani 3s ease infinite";
      } else {
        this.audioani = "";
      }
    }
    random(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
    findThisAudioIndex(){
      return this.$store.state.audiosPage.findIndex(n => n.url === this.$store.state.musicPage.url) 
    }
    audioRandomIsThisAudio(audioRandomIndex,thisAudioIndex){
      if(audioRandomIndex===thisAudioIndex){
          return this.audioRandomIsThisAudio(this.random(0, this.$store.state.audiosPage.length),thisAudioIndex)
        }else{
          return audioRandomIndex;
        }
    }
    onTimeupdate(data){
    
      if(data==100){
        if(this.isAllOrSingle===1){
        
          this.findThisAudioIndex();
          console.log(this.audioIndex)
          this.audioRandomIndex = this.random(0, this.$store.state.audiosPage.length);
          //使用递归，这样才不会当前播放和下一曲的索引会相同
          this.audioRandomIndex = this.audioRandomIsThisAudio(this.audioRandomIndex,this.findThisAudioIndex())
         
          console.log(this.findThisAudioIndex())
          console.log(this.audioRandomIndex)
          this.$store.commit("musicPage",this.$store.state.audiosPage[this.audioRandomIndex])
          console.log(this.$store.state.musicPage)
          
        
        }else if(this.isAllOrSingle===2){
          // console.log(this.item[1])
          //  console.log(this.$store.state.musicPage)
          this.$store.commit("musicPage",this.$store.state.musicPage)
        }
        
      }
    }
    //随机播放
    playAll(data){
      // 1
      this.isAllOrSingle = data;
      // console.log(data)
    }
    //单曲循环
    playSingle(data){
      // 2
      this.isAllOrSingle = data;
      // console.log(data); 
    }

     @Watch('musicPage')
  onMusicPage(n: any, o: any) {
       var testaudio = document.getElementById("test-audio");
      // console.log(testaudio.childNodes)
      for (var i = 0; i < testaudio.childNodes.length; i++) {
        testaudio.removeChild(testaudio.childNodes[i]);
      }
      this.item.push(n);
  }

   

}
</script>

<style  scope>

.zzm-bokeyinle {
  color: #d81e06;
  width:25px;
  height: 25px;
  background: #d81e06;
  font-size: 22px;
  position: fixed;
  right: 2%;
  top: 32%;
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