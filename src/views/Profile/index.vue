<template>
  <main>
    <Login />
  </main>
</template>

<script>
import Login from "components/Login";
export default {
  name: "Profile",
  beforeRouteEnter(to, from, next) {
    document.title = "我的喵喵";
    next(vm => {
      vm.$store.commit("changeTitle", "我的喵喵");
    });
  },
  components: { Login }
};
</script>

<style lang="scss">
</style>