<template>
  <main>
    <Header title="我的喵喵"></Header>
    <Login />
  </main>
</template>

<script>
import Header from "components/Header";
import Login from "components/Login";
export default {
  name: "Profile",
  beforeRouteEnter(to, from, next) {
    document.title = "我的喵喵";
    next();
    // next(vm => {
    //   vm.$store.commit("changeTitle", "我的喵喵");
    // });
  },
  components: { Header, Login }
};
</script>

<style lang="scss">
</style>