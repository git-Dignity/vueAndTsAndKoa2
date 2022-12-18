<template>
  <div class="head-radio">
    <div
      v-for="(v, k) in list"
      :key="k"
      :class="v === myValue ? 'active' : ''"
      @click="myValue = v"
    >
      {{ v }}
    </div>
  </div>
</template>
<script>
export default {
  name: "HeadRadio",
  props: {
    list: {
      type: Array,
      default: () => []
    },
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      myValue: this.value
    };
  },
  watch: {
    value(newValue) {
      this.myValue = newValue;
    },
    myValue(newValue) {
      this.$emit("input", newValue);
    }
  }
};
</script>
<style  scope lang="scss">
.head-radio {
  display: flex;
  height: 100%;
  & > div {
    cursor: pointer;
    margin-right: 15px;
    &.active {
      border-bottom: 2px solid blue;
    }
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
