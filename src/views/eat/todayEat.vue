<template>
  <div class="app-container">
    <zzm-turntable
      :prize-list-prop="prizeList"
      :count-prop="countProp"
      @draw="draw"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { prizeList } from "./src/index/config";

@Component({
  name: "Turntable",
  components: {

  }
})
export default class extends Vue {
 private prizeList = prizeList;
    private countProp = 8

    private draw(e: Array<Record<string, any>>) {
      console.log(e);
    }

    created() {

    }

    mounted() {}
}
</script>

<style lang="scss"  scope>

</style>
