<template>
  <div class="app-container">
 1
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Diary",
  components: {
  
  }
})
export default class extends Vue {
 
    private  countProp = 8


  private  draw(e:Array<Object>){
      console.log(e)
    }

  created() {
   
  }


  mounted() {}
}
</script>


<style lang="scss"  scope>

</style>

