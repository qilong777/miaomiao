<template>
  <main>
    <div class="cinema_menu">
      <div class="city_switch">
        全城
        <i class="iconfont icon-lower-triangle"></i>
      </div>
      <div class="brand_swtich">
        品牌
        <i class="iconfont icon-lower-triangle"></i>
      </div>
      <div class="feature_switch">
        特色
        <i class="iconfont icon-lower-triangle"></i>
      </div>
    </div>
    <cinema-list></cinema-list>
  </main>
</template>

<script>
import CinemaList from "components/CinemaList";
export default {
  name: "Cinema",
  beforeRouteEnter(to, from, next) {
    document.title = "喵喵影院";
    next(vm => {
      vm.$store.commit("changeTitle", "喵喵影院");
    });
  },
  components: { CinemaList }
};
</script>

<style lang="scss">
.cinema_menu {
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: white;
}
</style>