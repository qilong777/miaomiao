<template>
  <div id="app">
    <Header></Header>
    <keep-alive>
      <router-view />
    </keep-alive>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
import Header from "components/Header";
import TabBar from "components/TabBar";
export default {
  name: "App",
  components: {
    Header,
    TabBar
  }
};
</script>

<style lang="scss">
@import url("assets/css/base_px.css");
@import url("assets/iconfont/iconfont.css");
</style>
