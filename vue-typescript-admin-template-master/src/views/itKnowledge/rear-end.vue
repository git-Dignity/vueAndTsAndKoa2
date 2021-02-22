<template>
  <div class="app-container">
    1111
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import { Form } from "element-ui";
// import { cloneDeep } from "lodash";

@Component({
  name: "songList",
  components: {

  }
})
export default class extends Vue {
//   private songeList = songeList;

  created() {
    // this.init();
  }

//   private async init() {

//   }

//   mounted() {}
}
</script>

<style lang="scss"  scope>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  //   width: 480px;
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }
}

.el-card__header {
  cursor: pointer;
  //   background-image: linear-gradient(
  //     141deg,
  //     #9948ca 0%,
  //     #924fcb 51%,
  //     #9948ca 75%
  //   );
}
</style>
