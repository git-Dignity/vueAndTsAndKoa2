<template>
  <div class="app-container">
    <ItKnowledge :category="2" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ItKnowledge from "./Index.vue";
@Component({
  name: "RearEnd",
  components: {
    ItKnowledge
  }

})

export default class extends Vue {
}
</script>

<style lang="scss"  scope>
</style>
