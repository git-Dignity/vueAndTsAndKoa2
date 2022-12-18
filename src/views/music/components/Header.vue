<template>
  <div>
    <div class="header-content">
      <div>
        <div class="text-unique f40">
          {{ header.unique }}
        </div>
      </div>
      <div>
        <span class="f24">{{ header.rightText }}</span>
        <div class="text-time f12">
          {{ header.time }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "songeListHeader"
})
export default class extends Vue {
  @Prop({
    type: Object,
    required: true
  })
  header!: object;
}
</script>

<style scope lang="scss">
@import "../../../assets/fzzj-hfxcjw/font.css";

.header-content {
  font-family: "HFXCJW";
  > div {
    float: left;
  }
}
</style>
