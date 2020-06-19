
<script>
import { EventBus } from "@/eventBus/index";

export default {
  name: "editSingerDialog",

  props: {
    info: {
      type: Object,
      default: {}
    }
  },

  data() {
    return {
      show: false,
      list: [1, 2, 3, 4],
      singerId: this.info.id,
      text: this.info.singerName,
      unfile: "未选择任何文件",
      img: this.info.fileUrl,
      filess: []
    };
  },

  create() {
    console.log(this.info);
    EventBus.$on("isCancel", msg => {
      console.log(msg);
      if (msg == "edit") {
        console.log(45);
        this.singerId = "";
        this.text = "";
        this.img = "";
        this.filess = [];

        // 用完之后便销毁
        EventBus.$off("isCancel", {});
      }
    });
  },
  mounted() {},
  computed: {
    cancelData() {
      return this.info;
    }
  },
  watch: {
    cancelData(val) {
    //   console.log(val);
      this.singerId = val.id;
      this.text = val.singerName
      this.img = val.fileUrl;
    }
  },
  methods: {
    input(e) {
      this.text = e.target.value;
      this.$emit("singerDialogData", {
        id: this.singerId,
        singerName: this.text,
        filess: []
      });
    },
    aaa() {
      console.log(598562);
      this.$emit("singerDialogData", {
        singerName: this.singerName,
        filess: this.filess
      });
    },
    ImageToBase64(file, callback, errorCallback) {
      // let files = document.getElementById('upImageFile').files[0];

      var reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = function(e) {
        if (callback) {
          let base64str = e.target.result;
          callback(base64str);
        }
      };
      // reader.onload = () => {
      //     // console.log('file 转 base64结果：' + reader.result)
      //     tmp = reader.result
      //      return tmp;
      // }
      reader.onerror = function(error) {
        if (errorCallback) {
          errorCallback(error);
        }
        console.log("Error: ", error);
      };
    },
    getfilename(e) {
      this.filess = e.target.files;

      var _el = e.target.files;

      this.unfile = _el[0].name;

      this.ImageToBase64(
        this.filess[0],
        base64str => (this.img = base64str),
        error => console.log(error)
      );
      // this.img = document.getElementById('appealFile').value

      this.$emit("singerDialogData", {
        id: this.singerId,
        singerName: this.text,
        filess: this.filess
      });
    }
  },
  render: function(h) {
    return (
      <div class="singer-conetent">
        <div class="w100">
          <span>歌手名： </span>
          <input
            type="text"
            class="input"
            value={this.text}
            onInput={this.input}
          />
        </div>
        <div class="df df-ac-jc">
          <span>歌手头像：</span>
          <img src={this.img} />
        </div>
        <div class="w100">
          <form id="sendAppealForm">
            <a href="javascript:void(0);" class="upload">
              选择文件 ><span class="unfile">{this.unfile}</span>
              <input
                class="replyFileid"
                onChange={e => this.getfilename(e)}
                name="appealFile"
                id="appealFile"
                type="file"
                accept="*"
                multiple="multiple"
              />
            </a>
          </form>
        </div>
      </div>
    );
  }
  // <button onClick = {this.aaa}>aaa</button>

  //    render:function(createElement){
  //        return createElement('el-button',
  //                                     {
  //                                         style:{
  //                                             'font-size':' 12px'
  //                                         },
  //                                         attrs:{
  //                                             'type':'success'
  //                                         },
  //                                         on:{
  //                                             click:function(){
  //                                                 vue.menuAdd(node,data,store);
  //                                             }
  //                                         },
  //                                         domProps: {
  //                                             innerHTML: '增加'
  //                                         }
  //                                     }
  //                             )
  //    }

  //    render(){
  //       //  console.log(this.$slots.default)
  //        const hText=`
  //       ${this.id}

  //                    `

  //      return <div domPropsInnerHTML={hText}>{hText}</div>
  //    }
};
</script>

<style lang="scss" scoped>
.singer-conetent {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
  > div {
    margin: 5% 0;
  }

  .input:focus {
    border-color: #66afe9;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
      0 0 8px rgba(102, 175, 233, 0.6);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
      0 0 8px rgba(102, 175, 233, 0.6);
  }
}
img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.upload {
  padding: 4px 0;
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
</style>





// jsx写饿了么组件：https://blog.csdn.net/weixin_30687587/article/details/97988234