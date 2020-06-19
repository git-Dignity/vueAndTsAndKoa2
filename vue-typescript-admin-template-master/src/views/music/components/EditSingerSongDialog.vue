
<script>
import { EventBus } from "@/eventBus/index";

export default {
  name: "editSingerSongDialog",

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
      text: this.info.singerSongName,
    };
  },

  create() {
    console.log(this.info);
    EventBus.$on("isCancel", msg => {
      console.log(msg);
      if (msg == "edit") {
        this.singerId = "";
        this.text = "";

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
      this.text = val.singerSongName
     
    }
  },
  methods: {
    input(e) {
      this.text = e.target.value;
      this.$emit("singerDialogData", {
        id: this.singerId,
        singerName: this.text
      });
    },
  },
  render: function(h) {
    return (
      <div class="singer-conetent">
        <div class="w100">
          <span>歌曲名： </span>
          <input
            type="text"
            class="input"
            value={this.text}
            onInput={this.input}
          />
        </div>
      </div>
    );
  }
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