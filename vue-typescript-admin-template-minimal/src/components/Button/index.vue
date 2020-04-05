// 该Button组件支持
// 大小：xsmall、small、large、xlarge
// 形状：title、rounded、circle
// 禁止：disabled
// 颜色


<template>
  <button class="ui-btn" @click = "onClickBtn"
    :class="{
        'ui-btn-xsmall':xsmall,
        'ui-btn-small':small,
        'ui-btn-large':large,
        'ui-btn-xlarge':xlarge,
        'ui-btn-title':title,
        'ui-btn-rounded':rounded,
        'ui-btn-circle':circle,
        'ui-btn-disabled':disabled
        }"
        :style="`
            --color-tint:${TintColor}
        `"
  >
      <slot>Button</slot>
  </button>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from 'vue-property-decorator'

@Component({
  name: 'Firsttest'
})
export default class UIButton  extends Vue {

//定义属性prop()
    @Prop(Boolean) private xsmall : boolean | undefined; //如果外界没有传large就是false，有就是true
    @Prop(Boolean) private small : boolean | undefined;
    @Prop(Boolean) private large : boolean | undefined;
    @Prop(Boolean) private xlarge : boolean | undefined;

//圆角
    @Prop(Boolean) private title : boolean | undefined;
    @Prop(Boolean) private rounded : boolean | undefined;
    @Prop(Boolean) private circle : boolean | undefined;

     @Prop(Boolean) private disabled : boolean | undefined;

     @Prop(String) private color : string | undefined;
    


//MouseEvent鼠标事件
  @Emit('click') private emitClickEvent(event: MouseEvent){}

//挂载完成
  private mounted(){
      console.log(this.large)
  }


private get TintColor(){
    if(this.color){
        return this.color;
    }else{
        return '#2DBCF8'
    }
}

    //向外界抛出这个事件onClickBtn
  private onClickBtn(event: MouseEvent){
      this.emitClickEvent(event);
  }
}
</script>

<style lang="scss" scoped>
@mixin resize($minWidth,$heightLine,$paddingLeft,$fontSize){
    min-width: $minWidth;
    height: $heightLine;
    padding:0 $paddingLeft;
    font-weight: $fontSize;
    &.ui-btn-rounded,&.ui-btn-circle{
        border-radius: ($heightLine / 2);
    }
    &.ui-btn-circle{
        width:$heightLine;  //圆就要宽度高度一致
        min-width:0;    //因为是圆形的话，不能保证他的min-width等于高度，所以设为0
        padding:0   //设为0，文字才能居中，因为上面设置padding了
    }
}



.ui-btn{
    @include resize(64px,36px,16px,0.875rem);
    border:0 solid black;
    border-radius: 4px;
    color:#17233D;
    background-color: var(--color-tint);    //颜色是动态的 var放动态属性
    font-weight: 500;
    letter-spacing: 0.09em;
    outline: none;
    user-select: none;
    cursor: pointer;
    // &下面这些，因为这几个类只作用于按钮身上，所以写在里面了
    // 比如&.ui-btn-xsmall这个，要满足.ui-btn和.ui-btn-xsmall才会让&.ui-btn-xsmall样式显示
    &.ui-btn-xsmall{
     @include resize(36px,20px,9px,0.675rem);
    }
    &.ui-btn-small{
        @include resize(58px,28px,12px,0.75rem);
    }
    &.ui-btn-large{
        @include resize(78px,44px,19px,0.875rem);
    }
    &.ui-btn-xlarge{
        @include resize(92px,52px,23px,1rem);
    }

    &.ui-btn-title{
        border-radius: 0;
    }

    &.ui-btn-disabled{
        background-color:#F5F5F5;
        color:#C5CBCE;
        cursor:not-allowed
    }
    // 鼠标移过去高亮
    &:hover{
        filter:brightness(120%);    //因为颜色的动态的，不好写死，使用css的filter
    }
    // 鼠标按下
    &:active{
        filter:brightness(80%);    //因为颜色的动态的，不好写死，使用css的filter
    }
    
    
}




</style>
