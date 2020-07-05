<template>
  <div class="app-container">
    <el-button type="success" @click="synchronize">
      同步菜单
      <i class="el-icon-upload el-icon--right"></i>
    </el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { constantRoutes, asyncRoutes } from "@/router/index";
import { createSysMenu } from "@/api/sys/sysMenu";
import qs from "qs";

@Component({
  name: "sysMenu",
  components: {}
})
export default class extends Vue {
  private tableData: any = [];
  private tableHeader: string[] = [];

  private async synchronize() {

    const data = await createSysMenu({ menu: [...constantRoutes, ...asyncRoutes] })
    console.log(data);
  }
}
</script>
