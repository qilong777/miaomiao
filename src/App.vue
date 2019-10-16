<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
import TabBar from "components/TabBar";
export default {
  name: "App",
  components: {
    TabBar
  }
};
</script>

<style lang="scss">
@import url("assets/css/base_px.css");
@import url("assets/iconfont/iconfont.css");
// .v-enter,
// .v-leave-to {
//   transform: translateX(100%);
//   opacity: 0;
// }
// .v-leave-to {
//   transform: translateX(-100%);
// }
// .v-enter-active,
// .v-leave-active {
//   transition: all 0.5s;
// }
// .v-leave-active {
//   position: absolute;
//   width: 100%;
//   height: 100%;
// }

// .v-enter-to,
// .v-leave {
//   transform: translateX(0);
//   opacity: 1;
// }
</style>
