<template>
  <div class="cover-container">
    <img src="./img/bg.jpeg">
    <div class="popup">
      <div class="container">
        <div
          class="toggle"
          @click="touristClick"
        >
          <input type="checkbox">
          <span class="button" />
          <span class="label">游客</span>
        </div>
        <div
          class="toggle"
          @click="userClick"
        >
          <input
            type="checkbox"
            checked
          >
          <span class="button" />
          <span class="label">用户</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { UserModule } from "@/store/modules/user";

@Component({
  name: "Cover",
  components: {}
})
export default class extends Vue {
  /**
   * 现在登录还有问题
   * 游客登录
   */
  async touristClick() {
    await UserModule.Login({
      username: "test",
      password: "test123"
    });

        this.$router.push({
      path: "/"

    });
  }

/**
 * 用户登录
 */
  userClick() {
      this.$router.push({
      path: "/login"
    });
  }
}
</script>

<style lang="scss" scoped>
.cover-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    filter: blur(4px); /* Chrome, Opera */
  }
  .container {
    text-align: center;
    position: absolute;
    margin-top: -80px;
    width: 100%;
    top: 50%;
  }
  .toggle {
    margin: 4px;
    display: inline-block;
  }
  .toggle {
    box-shadow: inset 0 0 35px 5px rgba(0, 0, 0, 0.25),
      inset 0 2px 1px 1px rgba(255, 255, 255, 0.9),
      inset 0 -2px 1px 0 rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    background: #ccd0d4;
    position: relative;
    height: 140px;
    width: 140px;
  }
  .toggle:before {
    box-shadow: 0 0 17.5px 8.75px white;
    border-radius: 118.3px;
    background: white;
    position: absolute;
    margin-left: -50.4px;
    margin-top: -50.4px;
    opacity: 0.2;
    content: "";
    height: 100.8px;
    width: 100.8px;
    left: 50%;
    top: 50%;
  }
  .toggle .button {
    -webkit-filter: blur(1px);
    -moz-filter: blur(1px);
    filter: blur(1px);
    transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
    box-shadow: 0 15px 25px -4px rgba(0, 0, 0, 0.5),
      inset 0 -3px 4px -1px rgba(0, 0, 0, 0.2),
      0 -10px 15px -1px rgba(255, 255, 255, 0.6),
      inset 0 3px 4px -1px rgba(255, 255, 255, 0.2),
      inset 0 0 5px 1px rgba(255, 255, 255, 0.8),
      inset 0 20px 30px 0 rgba(255, 255, 255, 0.2);
    border-radius: 96.32px;
    position: absolute;
    background: #ccd0d4;
    margin-left: -48.16px;
    margin-top: -48.16px;
    display: block;
    height: 96.32px;
    width: 96.32px;
    left: 50%;
    top: 50%;
  }
  .toggle .label {
    transition: color 300ms ease-out;
    text-shadow: 1px 1px 3px #ccd0d4, 0 0 0 rgba(0, 0, 0, 0.8),
      1px 1px 4px white;
    line-height: 139px;
    text-align: center;
    position: absolute;
    font-weight: 700;
    font-size: 42px;
    display: block;
    opacity: 0.9;
    height: 100%;
    width: 100%;
    color: rgba(0, 0, 0, 0.4);
  }
  .toggle input {
    opacity: 0;
    position: absolute;
    cursor: pointer;
    z-index: 1;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
  }
  .toggle input:active ~ .button {
    box-shadow: 0 15px 25px -4px rgba(0, 0, 0, 0.4),
      inset 0 -8px 30px 1px rgba(255, 255, 255, 0.9),
      0 -10px 15px -1px rgba(255, 255, 255, 0.6),
      inset 0 8px 25px 0 rgba(0, 0, 0, 0.4),
      inset 0 0 10px 1px rgba(255, 255, 255, 0.6);
  }
  .toggle input:active ~ .label {
    font-size: 40px;
    color: rgba(0, 0, 0, 0.45);
  }
  .toggle input:checked ~ .button {
    box-shadow: 0 15px 25px -4px rgba(0, 0, 0, 0.4),
      inset 0 -8px 25px -1px rgba(255, 255, 255, 0.9),
      0 -10px 15px -1px rgba(255, 255, 255, 0.6),
      inset 0 8px 20px 0 rgba(0, 0, 0, 0.2),
      inset 0 0 5px 1px rgba(255, 255, 255, 0.6);
  }
  .toggle input:checked ~ .label {
    font-size: 40px;
    color: rgba(0, 0, 0, 0.4);
  }
}
</style>
