<template>
  <div class="root-home">
      <div class="btn-container">
            <!-- large相当于是个属性，那么在组件那也用定义个属性接受prop -->
            <UIButton @click="onClick" 
                :xsmall = "xsmall"
                :small = "small"
                :large = "large"
                :xlarge = "xlarge"
                :title = "title"
                :rounded = "rounded"
                :circle = "circle"
                :disabled = "disabled"
                color = "green"
            >哦</UIButton>
      </div>
      <div class="btn-group">
          <UIButton class="btn" @click="reSize('xsmall')">超小</UIButton>
          <UIButton class="btn" @click="reSize('small')">小</UIButton>
          <UIButton class="btn" @click="reSize('normal')">正常</UIButton>
          <UIButton class="btn" @click="reSize('large')">大</UIButton>
          <UIButton class="btn" @click="reSize('xlarge')">最大</UIButton>
      </div>

      <div class="btn-group">
          <UIButton class="btn" @click="changeRadius('title')">矩形</UIButton>
          <UIButton class="btn" @click="changeRadius('normal')">正常</UIButton>
          <UIButton class="btn" @click="changeRadius('rounded')">半圆</UIButton>
          <UIButton class="btn" @click="changeRadius('circle')">圆</UIButton>
      </div>

      <div class="btn-group">
          <UIButton class="btn" @click="changeDisable()">禁止</UIButton>
      </div>
     
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UIButton from '@/components/Button/index.vue'
import request from '@/utils/request.ts'

@Component({
  name: 'Firsttest',
  components:{
      UIButton
  }
})
export default class extends Vue {

  

private xsmall : boolean = false;
private small : boolean = false;
private large : boolean = false;
private xlarge : boolean = false;

private title : boolean = false;
private rounded : boolean = false;
private circle : boolean = false;

private disabled : boolean = false;

   

    private reSize(name: string){

      

        // this.service.post('https://zhengzemin.cn/login',{
        //       username:"admin",
        //       password:"123",
        //       loginTime:"2020",
        //       userAgent:"5"
           
        //   }).then(res =>{
        //       console.log(res)
        //   }).catch(err =>{
        //       console.log(err)
        //   })


        switch(name){
            case 'xsmall':
                this.xsmall = true;
                this.small = false
                this.large = false
                this.xlarge = false
                break;
            case 'small':
                this.xsmall = false;
                this.small = true
                this.large = false
                this.xlarge = false
                break;
            case 'normal':
                this.xsmall = false;
                this.small = false
                this.large = false
                this.xlarge = false
                break;
            case 'large':
                this.xsmall = false;
                this.small = false
                this.large = true
                this.xlarge = false
                break;
            case 'xlarge':
                this.xsmall = false;
                this.small = false
                this.large = false
                this.xlarge = true
                break;
        }
    }

    private changeRadius(name: string){
        switch(name){
            case 'title':
                this.title = true;
                this.rounded = false
                this.circle = false
                break;
            case 'rounded':
                this.title = false;
                this.rounded = true
                this.circle = false
                break;
            case 'normal':
                this.title = false;
                this.rounded = false
                this.circle = false
                break;
            case 'circle':
                this.title = false;
                this.rounded = false
                this.circle = true
                break;
        }
    }

    private changeDisable(){
        this.disabled = !this.disabled
    }
  
  private onClick(event: MouseEvent){
      if(!this.disabled){
          console.log(event)
      }
  }
}
</script>

<style scoped>
.btn-container{
    width:280px;
    height:160px;
    display: flex;
    justify-content: center;
    align-items: center; 
}
.btn{
    margin:8px;
}
</style>
