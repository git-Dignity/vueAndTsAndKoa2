<template>
  <div id="app">
    <router-view />
    <service-worker-update-popup />

    <div>
      <MusicPlayer></MusicPlayer>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ServiceWorkerUpdatePopup from '@/pwa/components/ServiceWorkerUpdatePopup.vue'
import MusicPlayer from '@/views/music/musicPlayer.vue'

@Component({
  name: 'App',
  components: {
    ServiceWorkerUpdatePopup,
    MusicPlayer
  }
})
export default class extends Vue {}
</script>
