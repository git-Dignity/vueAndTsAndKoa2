<template>
  <div style="padding:30px;">
    <transition
        name="fade-transform"
        mode="out-in"
      >
        <router-view />
      </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'personalView'
})
export default class extends Vue {}
</script>
