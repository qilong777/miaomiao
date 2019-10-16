<template>
  <main>
    <Header title="我的喵喵"></Header>
    <router-view></router-view>
  </main>
</template>

<script>
import Header from "components/Header";
export default {
  name: "Profile",
  beforeRouteEnter(to, from, next) {
    document.title = "我的喵喵";
    next();
  },
  components: { Header }
};
</script>

<style lang="scss">
</style>