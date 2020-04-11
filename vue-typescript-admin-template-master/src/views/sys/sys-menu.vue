<template>
  <div class="app-container">
   菜单
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'sysMenu',
  components: {
    
  }
})
export default class extends Vue {
  private tableData: any = []
  private tableHeader: string[] = []


}
</script>
