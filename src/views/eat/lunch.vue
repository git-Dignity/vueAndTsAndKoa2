
<template>
  <div class="app-container">
    <Eat :category="2" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Eat from "./Index.vue";
@Component({
  name: "Lunch",
  components: {
    Eat
  }

})

export default class extends Vue {
}
</script>

<style lang="scss"  scope>
</style>
