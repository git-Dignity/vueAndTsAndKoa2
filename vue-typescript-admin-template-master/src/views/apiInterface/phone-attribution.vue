<template>
  <div class="app-container">
  手机号码查询https://www.juhe.cn/docs/api/id/11
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Form } from "element-ui";
import { cloneDeep } from "lodash";

@Component({
  name: "phoneAttribution",
  components: {
  }
})
export default class extends Vue {
  private songeList = [];

  created() {
    this.init();
  }

  private async init() {
  
  }

 

  mounted() {
   
  }
}
</script>


<style lang="scss"  scope>
</style>